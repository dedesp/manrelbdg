'use client';

import { useState } from 'react';
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

const menuItems: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <DashboardOutlined />),
  getItem('Data Management', 'data', <TeamOutlined />, [
    getItem('Relawan', '/data/relawan', <UserOutlined />),
    getItem('Koordinator', '/data/koordinator', <TeamOutlined />),
    getItem('Dapil', '/data/dapil', <EnvironmentOutlined />),
  ]),
  getItem('Import/Export', 'import-export', <ImportOutlined />, [
    getItem('Import Data', '/import', <ImportOutlined />),
    getItem('Export Data', '/export', <ExportOutlined />),
  ]),
  getItem('Reports', '/reports', <BarChartOutlined />),
  getItem('Settings', '/settings', <SettingOutlined />),
];

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      router.push(key);
    }
  };

  // Get selected keys based on current pathname
  const getSelectedKeys = () => {
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
      className="shadow-sm"
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="text-white font-bold text-lg">
            MANRELBDG
          </div>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          className="text-white hover:text-blue-300"
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
      />
    </Sider>
  );
}
