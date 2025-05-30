'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

interface AntdProviderProps {
  children: React.ReactNode;
}

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          fontFamily: 'var(--font-inter)',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
