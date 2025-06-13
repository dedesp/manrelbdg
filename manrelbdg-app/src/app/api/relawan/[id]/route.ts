import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/database'
import { authenticateRequest, canViewData, canEditData } from '@/lib/auth'
import { 
  successResponse, 
  errorResponse, 
  serverErrorResponse, 
  unauthorizedResponse,
  notFoundResponse 
} from '@/lib/api-response'

// Update schema (make fields optional for PATCH)
const updateRelawanSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter').optional(),
  nik: z.string().length(16, 'NIK harus 16 digit').optional(),
  noHp: z.string().min(10, 'Nomor HP minimal 10 digit').optional(),
  email: z.string().email().optional().or(z.literal('')),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter').optional(),
  rt: z.string().optional(),
  rw: z.string().optional(),
  kelurahan: z.string().min(2, 'Kelurahan harus diisi').optional(),
  kecamatan: z.string().min(2, 'Kecamatan harus diisi').optional(),
  kabupaten: z.string().min(2, 'Kabupaten harus diisi').optional(),
  provinsi: z.string().min(2, 'Provinsi harus diisi').optional(),
  koordinat: z.string().optional(),
  foto: z.string().optional(),
  jenisKelamin: z.enum(['LAKI_LAKI', 'PEREMPUAN']).optional(),
  tanggalLahir: z.string().optional(),
  pekerjaan: z.string().optional(),
  status: z.enum(['AKTIF', 'TIDAK_AKTIF', 'PENDING']).optional(),
  catatan: z.string().optional(),
  dapilId: z.string().uuid('Dapil ID tidak valid').optional(),
  koordinatorId: z.string().uuid().optional()
})

// GET /api/relawan/[id] - Get single relawan
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canViewData(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    const relawan = await db.relawan.findUnique({
      where: { id: params.id },
      include: {
        dapil: {
          select: {
            id: true,
            nama: true,
            kode: true,
            provinsi: true,
            kabupaten: true
          }
        },
        koordinator: {
          select: {
            id: true,
            nama: true,
            kode: true,
            noHp: true
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
    
    if (!relawan) {
      return notFoundResponse('Relawan tidak ditemukan')
    }
    
    return successResponse(relawan)
    
  } catch (error) {
    console.error('Get relawan error:', error)
    return serverErrorResponse('Failed to fetch relawan')
  }
}

// PUT /api/relawan/[id] - Update relawan
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const validation = updateRelawanSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse(validation.error.errors[0].message, 400)
    }
    
    const data = validation.data
    
    // Check if relawan exists
    const existingRelawan = await db.relawan.findUnique({
      where: { id: params.id }
    })
    
    if (!existingRelawan) {
      return notFoundResponse('Relawan tidak ditemukan')
    }
    
    // Check if NIK already exists (if updating NIK)
    if (data.nik && data.nik !== existingRelawan.nik) {
      const nikExists = await db.relawan.findUnique({
        where: { nik: data.nik }
      })
      
      if (nikExists) {
        return errorResponse('NIK sudah terdaftar', 409)
      }
    }
    
    // Verify dapil exists if updating
    if (data.dapilId) {
      const dapil = await db.dapil.findUnique({
        where: { id: data.dapilId }
      })
      
      if (!dapil) {
        return errorResponse('Dapil tidak ditemukan', 404)
      }
    }
    
    // Verify koordinator exists if updating
    if (data.koordinatorId) {
      const koordinator = await db.koordinator.findUnique({
        where: { id: data.koordinatorId }
      })
      
      if (!koordinator) {
        return errorResponse('Koordinator tidak ditemukan', 404)
      }
    }
    
    // Update relawan
    const updatedData: Record<string, unknown> = { ...data }
    if (data.email === '') {
      updatedData.email = null
    }
    if (data.tanggalLahir) {
      updatedData.tanggalLahir = new Date(data.tanggalLahir)
    }
    
    const relawan = await db.relawan.update({
      where: { id: params.id },
      data: updatedData,
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
    
    return successResponse(relawan, 'Relawan berhasil diperbarui')
    
  } catch (error) {
    console.error('Update relawan error:', error)
    return serverErrorResponse('Failed to update relawan')
  }
}

// DELETE /api/relawan/[id] - Delete relawan
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canEditData(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    // Check if relawan exists
    const existingRelawan = await db.relawan.findUnique({
      where: { id: params.id }
    })
    
    if (!existingRelawan) {
      return notFoundResponse('Relawan tidak ditemukan')
    }
    
    // Delete relawan
    await db.relawan.delete({
      where: { id: params.id }
    })
    
    return successResponse(null, 'Relawan berhasil dihapus')
    
  } catch (error) {
    console.error('Delete relawan error:', error)
    return serverErrorResponse('Failed to delete relawan')
  }
}
