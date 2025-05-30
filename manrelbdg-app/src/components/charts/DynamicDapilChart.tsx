'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with recharts
const DapilChart = dynamic(() => import('./DapilChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
});

export default DapilChart;
