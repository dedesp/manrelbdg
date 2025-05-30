import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

export function formatPhone(phone: string): string {
  // Format nomor telepon Indonesia
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('62')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`
  }
  if (cleaned.startsWith('08')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`
  }
  return phone
}

export function parseCoordinat(koordinat: string): { lat: number; lng: number } | null {
  if (!koordinat) return null
  
  const parts = koordinat.split(',')
  if (parts.length !== 2) return null
  
  const lat = parseFloat(parts[0].trim())
  const lng = parseFloat(parts[1].trim())
  
  if (isNaN(lat) || isNaN(lng)) return null
  
  return { lat, lng }
}

export function validateNIK(nik: string): boolean {
  // NIK Indonesia harus 16 digit
  return /^\d{16}$/.test(nik)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Validasi nomor telepon Indonesia
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

export function generateExportFilename(type: 'relawan' | 'koordinator' | 'statistik', format: 'csv' | 'xlsx'): string {
  const timestamp = new Date().toISOString().split('T')[0]
  return `${type}_export_${timestamp}.${format}`
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function calculatePotensiSuara(relawanCount: number, multiplier: number = 5): number {
  return relawanCount * multiplier
}

export function calculatePersentasePencapaian(current: number, target: number): number {
  if (target === 0) return 0
  return Math.round((current / target) * 100)
}

export function getStatusColor(status: 'active' | 'inactive'): string {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'default'
    default:
      return 'default'
  }
}

export function getRoleColor(role: string): string {
  switch (role.toLowerCase()) {
    case 'super_admin':
      return 'red'
    case 'admin':
      return 'blue'
    case 'manager':
      return 'green'
    case 'user':
      return 'orange'
    case 'viewer':
      return 'default'
    default:
      return 'default'
  }
}
