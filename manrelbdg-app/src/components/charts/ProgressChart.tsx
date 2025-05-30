'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useBranding } from '@/hooks/useClientConfig';

interface ProgressChartProps {
  data?: Array<{
    month: string;
    target: number;
    actual: number;
  }>;
}

// Mock data untuk development
const defaultData = [
  { month: 'Jan', target: 100, actual: 85 },
  { month: 'Feb', target: 200, actual: 180 },
  { month: 'Mar', target: 300, actual: 290 },
  { month: 'Apr', target: 400, actual: 350 },
  { month: 'May', target: 500, actual: 480 },
  { month: 'Jun', target: 600, actual: 520 },
];

export default function ProgressChart({ data = defaultData }: ProgressChartProps) {
  const branding = useBranding();

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke={branding.colors.errorColor} 
          strokeWidth={2}
          name="Target"
          strokeDasharray="5 5"
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke={branding.colors.successColor} 
          strokeWidth={2}
          name="Actual"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
