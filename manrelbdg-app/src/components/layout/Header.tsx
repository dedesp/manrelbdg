'use client';

import { Layout, Avatar, Dropdown, Space, Typography, Badge } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useBranding, useContent } from '@/hooks/useClientConfig';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed?: boolean;
}

export default function Header({}: HeaderProps) {
  const branding = useBranding();
  const content = useContent();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: content.navigation.settings,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        // Navigate to profile
        break;
      case 'settings':
        // Navigate to settings
        break;
      case 'logout':
        // Handle logout
        break;
    }
  };

  return (
    <AntHeader className="bg-white shadow-sm px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Text className="text-lg font-medium text-gray-800">
          {branding.appName}
        </Text>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Badge count={5} size="small">
          <BellOutlined 
            className="text-lg text-gray-600 hover:text-blue-500 cursor-pointer" 
          />
        </Badge>

        {/* User Menu */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Space className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <Avatar 
              size="small" 
              icon={<UserOutlined />} 
              className="bg-blue-500"
            />
            <div className="flex flex-col">
              <Text className="text-sm font-medium">Administrator</Text>
              <Text className="text-xs text-gray-500">admin@manrelbdg.com</Text>
            </div>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
}
