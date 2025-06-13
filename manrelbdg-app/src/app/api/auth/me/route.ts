import { NextRequest } from 'next/server'
import { authenticateRequest } from '@/lib/auth'
import { successResponse, unauthorizedResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request)
  
  if (!auth.authenticated) {
    return unauthorizedResponse(auth.error)
  }
  
  return successResponse(auth.user, 'User authenticated')
}
