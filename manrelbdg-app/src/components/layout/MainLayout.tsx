'use client';

import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';

const { Content, Footer } = Layout;

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
        <Content className="p-4 md:p-6 bg-gray-50">
          <Breadcrumb />
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 min-h-[calc(100vh-200px)]">
            {children}
          </div>
        </Content>
        <Footer className="text-center bg-white border-t">
          <div className="text-gray-600">
            MANRELBDG © 2024 - Sistem Manajemen Relawan Bandung
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}
