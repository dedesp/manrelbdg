// Types untuk aplikasi
export interface User {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Relawan {
  id: string
  nama: string
  nik: string
  alamat: string
  kelurahan?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  kontak?: string
  email?: string
  tps?: string
  dapil?: string
  koordinat?: string // "lat,lng" format
  status: 'active' | 'inactive'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Koordinator {
  id: string
  nama: string
  nik: string
  alamat: string
  kelurahan?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  kontak?: string
  email?: string
  wilayah?: string
  tingkat?: 'kecamatan' | 'kelurahan' | 'rw' | 'rt'
  koordinat?: string
  status: 'active' | 'inactive'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Dapil {
  id: string
  nama: string
  kode: string
  tingkat: 'pusat' | 'provinsi' | 'kabupaten'
  dpt?: number
  kursi?: number
  targetRelawan?: number
  geojson?: any
  createdAt: Date
  updatedAt: Date
}

export interface DashboardSummary {
  totalRelawan: number
  totalKoordinator: number
  totalPotensiSuara: number
  persentasePencapaian: number
  targetRelawan: number
  growthRate: {
    relawan: number
    koordinator: number
  }
}

export interface GrowthData {
  date: string
  relawanCount: number
  koordinatorCount?: number
  potensiSuara?: number
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface RelawanFormData {
  nama: string
  nik: string
  alamat: string
  kelurahan?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  kontak?: string
  email?: string
  tps?: string
  dapil?: string
  koordinat?: string
  notes?: string
}

export interface KoordinatorFormData {
  nama: string
  nik: string
  alamat: string
  kelurahan?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  kontak?: string
  email?: string
  wilayah?: string
  tingkat?: string
  koordinat?: string
  notes?: string
}

// Import/Export types
export interface ImportResult {
  success: boolean
  importId: string
  summary: {
    total: number
    success: number
    failed: number
    duplicates: number
  }
  errors?: Array<{
    row: number
    field: string
    message: string
  }>
}

// Map types
export interface MapPoint {
  lat: number
  lng: number
  data: Relawan | Koordinator
}

export interface MapLayer {
  id: string
  name: string
  type: 'relawan' | 'koordinator' | 'dapil'
  visible: boolean
  data: any[]
}
