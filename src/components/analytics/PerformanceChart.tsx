
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const data = [
  { date: '01/03', revenue: 8500000, clicks: 350 },
  { date: '08/03', revenue: 10200000, clicks: 420 },
  { date: '15/03', revenue: 9800000, clicks: 380 },
  { date: '22/03', revenue: 11500000, clicks: 450 },
  { date: '29/03', revenue: 12800000, clicks: 520 },
  { date: '05/04', revenue: 13200000, clicks: 580 },
  { date: '12/04', revenue: 14800000, clicks: 620 },
];

interface PerformanceChartProps {
  className?: string;
}

const PerformanceChart = ({ className = "" }: PerformanceChartProps) => {
  const isMobile = useIsMobile();
  
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-medium">{`Ngày ${label}`}</p>
          <p className="text-brand-blue">{`Doanh thu: ${formatVND(payload[0].value)}`}</p>
          <p className="text-gray-500">{`Lượt click: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: isMobile ? 0 : 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            yAxisId="left" 
            type="monotone" 
            dataKey="revenue" 
            name="Doanh thu" 
            stroke="#3B82F6" 
            fill="#3B82F6" 
            fillOpacity={0.2} 
          />
          <Area 
            yAxisId="right" 
            type="monotone" 
            dataKey="clicks" 
            name="Lượt click" 
            stroke="#9CA3AF" 
            fill="#9CA3AF" 
            fillOpacity={0.1} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
