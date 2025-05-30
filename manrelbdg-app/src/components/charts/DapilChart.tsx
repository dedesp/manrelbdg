'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useContent, useBranding } from '@/hooks/useClientConfig';

interface DapilChartProps {
  data?: Array<{
    name: string;
    relawan: number;
    koordinator: number;
  }>;
}

// Mock data untuk development
const defaultData = [
  { name: 'Dapil 1', relawan: 120, koordinator: 8 },
  { name: 'Dapil 2', relawan: 98, koordinator: 6 },
  { name: 'Dapil 3', relawan: 156, koordinator: 10 },
  { name: 'Dapil 4', relawan: 89, koordinator: 5 },
  { name: 'Dapil 5', relawan: 134, koordinator: 9 },
  { name: 'Dapil 6', relawan: 145, koordinator: 11 },
];

export default function DapilChart({ data = defaultData }: DapilChartProps) {
  const content = useContent();
  const branding = useBranding();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar 
          dataKey="relawan" 
          fill={branding.colors.primary} 
          name={content.terminology.relawan} 
        />
        <Bar 
          dataKey="koordinator" 
          fill={branding.colors.successColor} 
          name={content.terminology.koordinator} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
