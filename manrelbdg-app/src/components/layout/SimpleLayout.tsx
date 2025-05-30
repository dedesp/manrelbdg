'use client';

import { Layout } from 'antd';

const { Content } = Layout;

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <Layout className="min-h-screen">
      <Content className="p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </Content>
    </Layout>
  );
}
