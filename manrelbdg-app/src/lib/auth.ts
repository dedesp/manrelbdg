import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { db } from './database'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT Token management
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Get user from token
export async function getUserFromToken(token: string) {
  const payload = verifyToken(token)
  if (!payload) return null

  try {
    const user = await db.user.findUnique({
      where: { id: payload.userId },
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
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

// Extract token from request
export function extractTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Check cookies
  const tokenFromCookie = request.cookies.get('auth-token')?.value
  if (tokenFromCookie) {
    return tokenFromCookie
  }

  return null
}

// Middleware helper for protected routes
export async function authenticateRequest(request: NextRequest) {
  const token = extractTokenFromRequest(request)
  
  if (!token) {
    return { authenticated: false, error: 'No token provided' }
  }

  const user = await getUserFromToken(token)
  
  if (!user) {
    return { authenticated: false, error: 'Invalid token' }
  }

  if (!user.isActive) {
    return { authenticated: false, error: 'User account is inactive' }
  }

  return { authenticated: true, user }
}

// Role-based access control
export function hasPermission(userRole: string, requiredRole: string[]): boolean {
  return requiredRole.includes(userRole)
}

export function isAdmin(userRole: string): boolean {
  return userRole === 'ADMIN'
}

export function canManageUsers(userRole: string): boolean {
  return userRole === 'ADMIN'
}

export function canViewData(userRole: string): boolean {
  return ['ADMIN', 'USER', 'VIEWER'].includes(userRole)
}

export function canEditData(userRole: string): boolean {
  return ['ADMIN', 'USER'].includes(userRole)
}
