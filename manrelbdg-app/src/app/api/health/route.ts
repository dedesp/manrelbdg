import { NextResponse } from 'next/server'
import { getDatabaseHealth } from '@/lib/database'

export async function GET() {
  try {
    const dbHealth = await getDatabaseHealth()
    const memUsage = process.memoryUsage()
    
    const health = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth,
        memory: {
          used: Math.round(memUsage.heapUsed / 1024 / 1024),
          total: Math.round(memUsage.heapTotal / 1024 / 1024),
          percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
        },
        uptime: Math.round(process.uptime())
      }
    }
    
    const status = health.status === 'healthy' ? 200 : 503
    
    return NextResponse.json(health, { status })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}
