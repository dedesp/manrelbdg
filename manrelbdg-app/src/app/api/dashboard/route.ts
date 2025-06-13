import { NextRequest } from 'next/server'
import { db } from '@/lib/database'
import { authenticateRequest, canViewData } from '@/lib/auth'
import { successResponse, errorResponse, serverErrorResponse, unauthorizedResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    // Authenticate
    const auth = await authenticateRequest(request)
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error)
    }
    
    if (!canViewData(auth.user!.role)) {
      return errorResponse('Insufficient permissions', 403)
    }
    
    // Get summary statistics
    const [
      totalRelawan,
      totalKoordinator,
      totalDapil,
      relawanByStatus,
      koordinatorByStatus,
      relawanByDapil,
      recentRelawan,
      recentKoordinator
    ] = await Promise.all([
      // Total counts
      db.relawan.count(),
      db.koordinator.count(),
      db.dapil.count(),
      
      // Status breakdown
      db.relawan.groupBy({
        by: ['status'],
        _count: { _all: true }
      }),
      db.koordinator.groupBy({
        by: ['status'],
        _count: { _all: true }
      }),
      
      // Relawan by Dapil
      db.relawan.groupBy({
        by: ['dapilId'],
        _count: { _all: true },
        orderBy: { _count: { _all: 'desc' } },
        take: 10
      }),
      
      // Recent additions
      db.relawan.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nama: true,
          kode: true,
          status: true,
          createdAt: true,
          dapil: {
            select: { nama: true }
          }
        }
      }),
      db.koordinator.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nama: true,
          kode: true,
          status: true,
          createdAt: true,
          dapil: {
            select: { nama: true }
          }
        }
      })
    ])
    
    // Get Dapil details for chart data
    const dapilData = await db.dapil.findMany({
      select: {
        id: true,
        nama: true,
        kode: true,
        target: true,
        _count: {
          select: {
            relawan: true,
            koordinator: true
          }
        }
      },
      orderBy: { nama: 'asc' }
    })
    
    // Calculate achievement percentages
    const dapilWithAchievement = dapilData.map(dapil => ({
      ...dapil,
      achievement: dapil.target > 0 ? Math.round((dapil._count.relawan / dapil.target) * 100) : 0,
      relawanCount: dapil._count.relawan,
      koordinatorCount: dapil._count.koordinator
    }))
    
    // Calculate overall target achievement
    const totalTarget = dapilData.reduce((sum, dapil) => sum + dapil.target, 0)
    const overallAchievement = totalTarget > 0 ? Math.round((totalRelawan / totalTarget) * 100) : 0
    
    // Format status data
    const relawanStatusData = relawanByStatus.map(item => ({
      status: item.status,
      count: item._count._all
    }))
    
    const koordinatorStatusData = koordinatorByStatus.map(item => ({
      status: item.status,
      count: item._count._all
    }))
    
    // Growth data (mock for now, can be implemented with time-series data)
    const currentMonth = new Date().getMonth()
    const growthData = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      return {
        month: monthNames[monthIndex],
        relawan: Math.floor(totalRelawan * (0.6 + (i * 0.08))), // Simulated growth
        koordinator: Math.floor(totalKoordinator * (0.6 + (i * 0.08))),
        target: Math.floor(totalTarget * (0.8 + (i * 0.04)))
      }
    })
    
    const dashboardData = {
      summary: {
        totalRelawan,
        totalKoordinator,
        totalDapil,
        targetAchievement: overallAchievement
      },
      statusBreakdown: {
        relawan: relawanStatusData,
        koordinator: koordinatorStatusData
      },
      dapilData: dapilWithAchievement,
      growthData,
      recentActivity: {
        relawan: recentRelawan,
        koordinator: recentKoordinator
      }
    }
    
    return successResponse(dashboardData)
    
  } catch (error) {
    console.error('Dashboard API error:', error)
    return serverErrorResponse('Failed to fetch dashboard data')
  }
}
