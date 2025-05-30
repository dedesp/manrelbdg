'use client';

import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { useBranding, useContent } from '@/hooks/useClientConfig';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const branding = useBranding();
  const content = useContent();

  const menuItems: MenuItem[] = [
    getItem(content.navigation.dashboard, '/dashboard', <DashboardOutlined />),
    getItem(content.navigation.dataManagement, 'data', <TeamOutlined />, [
      getItem(content.navigation.relawan, '/data/relawan', <UserOutlined />),
      getItem(content.navigation.koordinator, '/data/koordinator', <TeamOutlined />),
      getItem(content.navigation.dapil, '/data/dapil', <EnvironmentOutlined />),
    ]),
    getItem(content.navigation.reports, '/reports', <BarChartOutlined />),
    getItem('Import/Export', 'import-export', <ImportOutlined />, [
      getItem(content.navigation.import, '/import', <ImportOutlined />),
      getItem(content.navigation.export, '/export', <ExportOutlined />),
    ]),
    getItem(content.navigation.settings, '/settings', <SettingOutlined />),
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      router.push(key);
    }
  };

  // Get selected keys based on current pathname
  const getSelectedKeys = () => {
    if (pathname === '/dashboard') return ['/dashboard'];
    if (pathname.startsWith('/data/relawan')) return ['/data/relawan'];
    if (pathname.startsWith('/data/koordinator')) return ['/data/koordinator'];
    if (pathname.startsWith('/data/dapil')) return ['/data/dapil'];
    if (pathname.startsWith('/reports')) return ['/reports'];
    if (pathname.startsWith('/settings')) return ['/settings'];
    if (pathname.startsWith('/import')) return ['/import'];
    if (pathname.startsWith('/export')) return ['/export'];
    return ['/dashboard'];
  };

  // Get opened keys based on current pathname
  const getOpenKeys = () => {
    if (pathname.startsWith('/data/')) return ['data'];
    if (pathname.includes('/import') || pathname.includes('/export')) return ['import-export'];
    return [];
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={80}
      className="shadow-sm transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #001529 0%, #002140 100%)',
      }}
    >
      {/* Logo and Collapse Button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: branding.colors.primary }}>
              <span className="text-white font-bold text-sm">{branding.appInitial}</span>
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">{branding.appName}</div>
              <div className="text-xs text-gray-400">{branding.appTagline}</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
               style={{ backgroundColor: branding.colors.primary }}>
            <span className="text-white font-bold text-sm">{branding.appInitial}</span>
          </div>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          className="text-white hover:text-blue-300"
          size="small"
        />
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-r-0"
        style={{
          background: 'transparent',
        }}
      />
    </Sider>
  );
}
