import { NextResponse } from 'next/server'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Success responses
export function successResponse<T>(
  data: T, 
  message?: string, 
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  }, { status })
}

export function paginatedResponse<T>(
  data: T[], 
  pagination: PaginationParams & { total: number },
  message?: string
): NextResponse<ApiResponse<T[]>> {
  const totalPages = Math.ceil(pagination.total / pagination.limit)
  
  return NextResponse.json({
    success: true,
    data,
    message,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages
    }
  })
}

// Error responses
export function errorResponse(
  error: string, 
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error
  }, { status })
}

export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status: 401 })
}

export function forbiddenResponse(
  message: string = 'Forbidden'
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status: 403 })
}

export function notFoundResponse(
  message: string = 'Not found'
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status: 404 })
}

export function serverErrorResponse(
  message: string = 'Internal server error'
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status: 500 })
}

// Validation helper
export function validatePaginationParams(
  page?: string | null,
  limit?: string | null,
  search?: string | null,
  sortBy?: string | null,
  sortOrder?: string | null
): PaginationParams {
  const parsedPage = page ? parseInt(page) : 1
  const parsedLimit = limit ? parseInt(limit) : 10
  
  return {
    page: isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage,
    limit: isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100 ? 10 : parsedLimit,
    search: search || undefined,
    sortBy: sortBy || undefined,
    sortOrder: sortOrder === 'desc' ? 'desc' : 'asc'
  }
}

// Handle async route errors
export async function handleRouteError(error: unknown): Promise<NextResponse> {
  console.error('API Route Error:', error)
  
  if (error instanceof Error) {
    return serverErrorResponse(error.message)
  }
  
  return serverErrorResponse('An unexpected error occurred')
}
