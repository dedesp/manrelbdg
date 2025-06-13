import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Database connection test
export async function testDatabaseConnection() {
  try {
    await db.$queryRaw`SELECT 1`
    console.log('✅ Database connected successfully')
    return { success: true, message: 'Database connected' }
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return { success: false, message: 'Database connection failed', error }
  }
}

// Database health check
export async function getDatabaseHealth() {
  try {
    const start = Date.now()
    await db.$queryRaw`SELECT 1`
    const responseTime = Date.now() - start
    
    return {
      status: 'healthy',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}
