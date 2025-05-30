'use client';

import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Responsive sidebar for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Content className="p-6 bg-gray-50">
          <Breadcrumb />
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
