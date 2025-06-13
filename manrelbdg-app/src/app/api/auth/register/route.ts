import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/database'
import { hashPassword, generateToken, canManageUsers } from '@/lib/auth'
import { successResponse, errorResponse, serverErrorResponse, unauthorizedResponse } from '@/lib/api-response'
import { authenticateRequest } from '@/lib/auth'

// Register schema
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['ADMIN', 'USER', 'VIEWER']).optional().default('USER')
})

export async function POST(request: NextRequest) {
  try {
    // Authenticate request (only admins can create users)
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canManageUsers(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse(validation.error.errors[0].message, 400)
    }
    
    const { email, password, name, role } = validation.data
    
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return errorResponse('User with this email already exists', 409)
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    return successResponse(user, 'User created successfully', 201)
    
  } catch (error) {
    console.error('Registration error:', error)
    return serverErrorResponse('Registration failed')
  }
}
