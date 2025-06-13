import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/database'
import { authenticateRequest, canViewData, canEditData } from '@/lib/auth'
import { 
  successResponse, 
  errorResponse, 
  serverErrorResponse, 
  unauthorizedResponse,
  paginatedResponse,
  validatePaginationParams 
} from '@/lib/api-response'

// Relawan schema
const relawanSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  noHp: z.string().min(10, 'Nomor HP minimal 10 digit'),
  email: z.string().email().optional().or(z.literal('')),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
  rt: z.string().optional(),
  rw: z.string().optional(),
  kelurahan: z.string().min(2, 'Kelurahan harus diisi'),
  kecamatan: z.string().min(2, 'Kecamatan harus diisi'),
  kabupaten: z.string().min(2, 'Kabupaten harus diisi'),
  provinsi: z.string().min(2, 'Provinsi harus diisi'),
  koordinat: z.string().optional(),
  foto: z.string().optional(),
  jenisKelamin: z.enum(['LAKI_LAKI', 'PEREMPUAN']).optional(),
  tanggalLahir: z.string().optional(),
  pekerjaan: z.string().optional(),
  status: z.enum(['AKTIF', 'TIDAK_AKTIF', 'PENDING']).default('AKTIF'),
  catatan: z.string().optional(),
  dapilId: z.string().uuid('Dapil ID tidak valid'),
  koordinatorId: z.string().uuid().optional()
})

// GET /api/relawan - Get all relawan with pagination
export async function GET(request: NextRequest) {
  try {
    // Authenticate
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canViewData(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const pagination = validatePaginationParams(
      searchParams.get('page'),
      searchParams.get('limit'),
      searchParams.get('search'),
      searchParams.get('sortBy'),
      searchParams.get('sortOrder')
    )
    
    const skip = (pagination.page - 1) * pagination.limit
    
    // Build where clause for search
    const where: Record<string, unknown> = {}
    if (pagination.search) {
      where.OR = [
        { nama: { contains: pagination.search, mode: 'insensitive' } },
        { nik: { contains: pagination.search } },
        { noHp: { contains: pagination.search } },
        { alamat: { contains: pagination.search, mode: 'insensitive' } }
      ]
    }
    
    // Filter by dapil if provided
    const dapilId = searchParams.get('dapilId')
    if (dapilId) {
      where.dapilId = dapilId
    }
    
    // Filter by status if provided
    const status = searchParams.get('status')
    if (status && ['AKTIF', 'TIDAK_AKTIF', 'PENDING'].includes(status)) {
      where.status = status
    }
    
    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (pagination.sortBy) {
      orderBy[pagination.sortBy] = pagination.sortOrder || 'asc'
    } else {
      orderBy.createdAt = 'desc'
    }
    
    // Get data with total count
    const [relawan, total] = await Promise.all([
      db.relawan.findMany({
        where,
        skip,
        take: pagination.limit,
        orderBy,
        include: {
          dapil: {
            select: {
              id: true,
              nama: true,
              kode: true
            }
          },
          koordinator: {
            select: {
              id: true,
              nama: true,
              kode: true
            }
          },
          createdBy: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }),
      db.relawan.count({ where })
    ])
    
    return paginatedResponse(relawan, { ...pagination, total })
    
  } catch (error) {
    console.error('Get relawan error:', error)
    return serverErrorResponse('Failed to fetch relawan data')
  }
}

// POST /api/relawan - Create new relawan
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canEditData(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    const body = await request.json()
    
    // Validate input
    const validation = relawanSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse(validation.error.errors[0].message, 400)
    }
    
    const data = validation.data
    
    // Check if NIK already exists
    const existingRelawan = await db.relawan.findUnique({
      where: { nik: data.nik }
    })
    
    if (existingRelawan) {
      return errorResponse('NIK sudah terdaftar', 409)
    }
    
    // Verify dapil exists
    const dapil = await db.dapil.findUnique({
      where: { id: data.dapilId }
    })
    
    if (!dapil) {
      return errorResponse('Dapil tidak ditemukan', 404)
    }
    
    // Verify koordinator exists if provided
    if (data.koordinatorId) {
      const koordinator = await db.koordinator.findUnique({
        where: { id: data.koordinatorId }
      })
      
      if (!koordinator) {
        return errorResponse('Koordinator tidak ditemukan', 404)
      }
    }
    
    // Generate unique code
    const count = await db.relawan.count()
    const kode = `REL${String(count + 1).padStart(4, '0')}`
    
    // Create relawan
    const relawan = await db.relawan.create({
      data: {
        ...data,
        kode,
        email: data.email || null,
        tanggalLahir: data.tanggalLahir ? new Date(data.tanggalLahir) : null,
        createdById: auth.user!.id
      },
      include: {
        dapil: {
          select: {
            id: true,
            nama: true,
            kode: true
          }
        },
        koordinator: {
          select: {
            id: true,
            nama: true,
            kode: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    
    return successResponse(relawan, 'Relawan berhasil ditambahkan', 201)
    
  } catch (error) {
    console.error('Create relawan error:', error)
    return serverErrorResponse('Failed to create relawan')
  }
}
