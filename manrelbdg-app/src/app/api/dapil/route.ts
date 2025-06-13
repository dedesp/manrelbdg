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

// Dapil schema
const dapilSchema = z.object({
  kode: z.string().min(2, 'Kode minimal 2 karakter'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  provinsi: z.string().min(2, 'Provinsi harus diisi'),
  kabupaten: z.string().min(2, 'Kabupaten harus diisi'),
  kecamatan: z.array(z.string()).min(1, 'Minimal 1 kecamatan'),
  kelurahan: z.array(z.string()).min(1, 'Minimal 1 kelurahan'),
  target: z.number().min(0, 'Target tidak boleh negatif').default(0),
  description: z.string().optional()
})

// GET /api/dapil - Get all dapil with pagination
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
        { kode: { contains: pagination.search, mode: 'insensitive' } },
        { provinsi: { contains: pagination.search, mode: 'insensitive' } },
        { kabupaten: { contains: pagination.search, mode: 'insensitive' } }
      ]
    }
    
    // Filter by province if provided
    const provinsi = searchParams.get('provinsi')
    if (provinsi) {
      where.provinsi = { contains: provinsi, mode: 'insensitive' }
    }
    
    // Filter by active status
    where.isActive = true
    
    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (pagination.sortBy) {
      orderBy[pagination.sortBy] = pagination.sortOrder || 'asc'
    } else {
      orderBy.nama = 'asc'
    }
    
    // Get data with total count
    const [dapil, total] = await Promise.all([
      db.dapil.findMany({
        where,
        skip,
        take: pagination.limit,
        orderBy,
        include: {
          _count: {
            select: {
              relawan: true,
              koordinator: true
            }
          }
        }
      }),
      db.dapil.count({ where })
    ])
    
    // Add achievement calculation
    const dapilWithAchievement = dapil.map(item => ({
      ...item,
      relawanCount: item._count.relawan,
      koordinatorCount: item._count.koordinator,
      achievement: item.target > 0 ? Math.round((item._count.relawan / item.target) * 100) : 0
    }))
    
    return paginatedResponse(dapilWithAchievement, { ...pagination, total })
    
  } catch (error) {
    console.error('Get dapil error:', error)
    return serverErrorResponse('Failed to fetch dapil data')
  }
}

// POST /api/dapil - Create new dapil
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
    const validation = dapilSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse(validation.error.errors[0].message, 400)
    }
    
    const data = validation.data
    
    // Check if kode already exists
    const existingDapil = await db.dapil.findUnique({
      where: { kode: data.kode }
    })
    
    if (existingDapil) {
      return errorResponse('Kode dapil sudah ada', 409)
    }
    
    // Create dapil
    const dapil = await db.dapil.create({
      data,
      include: {
        _count: {
          select: {
            relawan: true,
            koordinator: true
          }
        }
      }
    })
    
    const result = {
      ...dapil,
      relawanCount: dapil._count.relawan,
      koordinatorCount: dapil._count.koordinator,
      achievement: dapil.target > 0 ? Math.round((dapil._count.relawan / dapil.target) * 100) : 0
    }
    
    return successResponse(result, 'Dapil berhasil ditambahkan', 201)
    
  } catch (error) {
    console.error('Create dapil error:', error)
    return serverErrorResponse('Failed to create dapil')
  }
}
