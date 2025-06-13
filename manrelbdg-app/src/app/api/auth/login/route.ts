import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/database'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse(validation.error.errors[0].message, 400)
    }
    
    const { email, password } = validation.data
    
    // Find user
    const user = await db.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return errorResponse('Invalid email or password', 401)
    }
    
    if (!user.isActive) {
      return errorResponse('Account is inactive', 401)
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401)
    }
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })
    
    // Return user data without password
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    
    // Create response with cookie
    const response = successResponse(
      { user: userData, token },
      'Login successful'
    )
    
    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return serverErrorResponse('Login failed')
  }
}
