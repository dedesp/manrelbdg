import { z } from 'zod'

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
})

// Relawan validation schemas
export const relawanSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  nik: z.string().regex(/^\d{16}$/, 'NIK harus 16 digit angka'),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
  kelurahan: z.string().optional(),
  kecamatan: z.string().optional(),
  kabupaten: z.string().optional(),
  provinsi: z.string().optional(),
  kontak: z.string().optional().refine((val) => {
    if (!val) return true
    return /^(\+62|62|0)[0-9]{9,13}$/.test(val.replace(/[\s-]/g, ''))
  }, 'Format nomor telepon tidak valid'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  tps: z.string().optional(),
  dapil: z.string().optional(),
  koordinat: z.string().optional().refine((val) => {
    if (!val) return true
    const parts = val.split(',')
    if (parts.length !== 2) return false
    const lat = parseFloat(parts[0].trim())
    const lng = parseFloat(parts[1].trim())
    return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }, 'Format koordinat tidak valid (lat,lng)'),
  notes: z.string().optional(),
})

// Koordinator validation schemas
export const koordinatorSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  nik: z.string().regex(/^\d{16}$/, 'NIK harus 16 digit angka'),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
  kelurahan: z.string().optional(),
  kecamatan: z.string().optional(),
  kabupaten: z.string().optional(),
  provinsi: z.string().optional(),
  kontak: z.string().optional().refine((val) => {
    if (!val) return true
    return /^(\+62|62|0)[0-9]{9,13}$/.test(val.replace(/[\s-]/g, ''))
  }, 'Format nomor telepon tidak valid'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  wilayah: z.string().optional(),
  tingkat: z.enum(['kecamatan', 'kelurahan', 'rw', 'rt']).optional(),
  koordinat: z.string().optional().refine((val) => {
    if (!val) return true
    const parts = val.split(',')
    if (parts.length !== 2) return false
    const lat = parseFloat(parts[0].trim())
    const lng = parseFloat(parts[1].trim())
    return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }, 'Format koordinat tidak valid (lat,lng)'),
  notes: z.string().optional(),
})

// Dapil validation schemas
export const dapilSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  kode: z.string().min(1, 'Kode wajib diisi'),
  tingkat: z.enum(['pusat', 'provinsi', 'kabupaten']),
  dpt: z.number().int().positive().optional(),
  kursi: z.number().int().positive().optional(),
  targetRelawan: z.number().int().positive().optional(),
})

// Search and filter schemas
export const searchSchema = z.object({
  search: z.string().optional(),
  dapil: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  wilayah: z.string().optional(),
  tingkat: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Import validation schemas
export const importOptionsSchema = z.object({
  skipDuplicates: z.boolean().default(true),
  validateAll: z.boolean().default(true),
  updateExisting: z.boolean().default(false),
})

// Export validation schemas
export const exportOptionsSchema = z.object({
  format: z.enum(['csv', 'xlsx']),
  fields: z.array(z.string()).optional(),
  filters: z.object({
    search: z.string().optional(),
    dapil: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  }).optional(),
})

// Types for form data
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type RelawanFormData = z.infer<typeof relawanSchema>
export type KoordinatorFormData = z.infer<typeof koordinatorSchema>
export type DapilFormData = z.infer<typeof dapilSchema>
export type SearchParams = z.infer<typeof searchSchema>
export type ImportOptions = z.infer<typeof importOptionsSchema>
export type ExportOptions = z.infer<typeof exportOptionsSchema>
