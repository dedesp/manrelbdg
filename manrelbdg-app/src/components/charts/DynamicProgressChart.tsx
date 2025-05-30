'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with recharts
const ProgressChart = dynamic(() => import('./ProgressChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
});

export default ProgressChart;
