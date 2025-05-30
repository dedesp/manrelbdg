'use client';

import MainLayout from '@/components/layout/MainLayout';
import DapilChart from '@/components/charts/DynamicDapilChart';
import ProgressChart from '@/components/charts/DynamicProgressChart';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Progress,
  Typography 
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useContent, useBranding, useTerminology } from '@/hooks/useClientConfig';

const { Title } = Typography;

// Mock data - nanti akan diganti dengan data real dari API
const dashboardData = {
  totalRelawan: 1234,
  totalKoordinator: 56,
  totalDapil: 12,
  targetAchievement: 75,
  recentActivities: [
    { id: 1, message: 'Relawan baru bergabung di Dapil 1', time: '2 jam lalu' },
    { id: 2, message: 'Data koordinator diperbarui', time: '4 jam lalu' },
    { id: 3, message: 'Export data relawan selesai', time: '1 hari lalu' },
  ]
};

export default function DashboardPage() {
  const content = useContent();
  const branding = useBranding();
  const terminology = useTerminology();

  return (
    <MainLayout>
      <div className="space-y-6">{/* remove p-6 since SimpleLayout handles padding */}
        {/* Page Header */}
        <div>
          <Title level={2} className="mb-2">{content.pages.dashboard.title}</Title>
          <p className="text-gray-600">
            {content.pages.dashboard.welcomeMessage}
          </p>
        </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={`Total ${terminology.relawanPlural}`}
              value={dashboardData.totalRelawan}
              prefix={<UserOutlined style={{ color: branding.colors.primary }} />}
              valueStyle={{ color: branding.colors.primary }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={`Total ${terminology.koordinatorPlural}`}
              value={dashboardData.totalKoordinator}
              prefix={<TeamOutlined style={{ color: branding.colors.secondary }} />}
              valueStyle={{ color: branding.colors.secondary }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={`Total ${terminology.dapilPlural}`}
              value={dashboardData.totalDapil}
              prefix={<EnvironmentOutlined style={{ color: branding.colors.accent }} />}
              valueStyle={{ color: branding.colors.accent }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Target Achievement</p>
                <p className="text-2xl font-bold text-purple-500">
                  {dashboardData.targetAchievement}%
                </p>
              </div>
              <TrophyOutlined className="text-2xl text-purple-500" />
            </div>
            <Progress 
              percent={dashboardData.targetAchievement} 
              strokeColor="#722ed1"
              className="mt-2"
            />
          </Card>
        </Col>
      </Row>

      {/* Content Row */}
      <Row gutter={[16, 16]}>
        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card title="Aktivitas Terbaru" size="small">
            <div className="space-y-3">
              {dashboardData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" size="small">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <UserOutlined style={{ color: branding.colors.primary }} className="text-lg mb-2" />
                <p className="text-sm font-medium">{content.buttons.add} {terminology.relawan}</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <TeamOutlined style={{ color: branding.colors.secondary }} className="text-lg mb-2" />
                <p className="text-sm font-medium">{content.buttons.add} {terminology.koordinator}</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <EnvironmentOutlined style={{ color: branding.colors.accent }} className="text-lg mb-2" />
                <p className="text-sm font-medium">Kelola {terminology.dapilPlural}</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <TrophyOutlined style={{ color: branding.colors.primary }} className="text-lg mb-2" />
                <p className="text-sm font-medium">Lihat Laporan</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title={`Distribusi ${terminology.relawanPlural} per ${terminology.dapil}`} size="small">
            <DapilChart />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Progress Bulanan" size="small">
            <ProgressChart />
          </Card>
        </Col>
      </Row>
    </div>
    </MainLayout>
  );
}
