
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'T1', earned: 1200000, clicks: 420 },
  { name: 'T2', earned: 1800000, clicks: 680 },
  { name: 'T3', earned: 2200000, clicks: 790 },
  { name: 'T4', earned: 2800000, clicks: 980 },
  { name: 'T5', earned: 1900000, clicks: 620 },
  { name: 'T6', earned: 2700000, clicks: 870 },
  { name: 'T7', earned: 3100000, clicks: 1040 },
  { name: 'T8', earned: 2600000, clicks: 920 },
  { name: 'T9', earned: 2200000, clicks: 790 },
  { name: 'T10', earned: 2900000, clicks: 970 },
  { name: 'T11', earned: 3500000, clicks: 1150 },
  { name: 'T12', earned: 4200000, clicks: 1320 },
];

interface RevenueChartProps {
  title?: string;
  className?: string;
}

const RevenueChart = ({ title = "Doanh thu theo tháng", className = "" }: RevenueChartProps) => {
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
          <p className="font-medium">{`Tháng ${label}`}</p>
          <p className="text-brand-blue">{`Doanh thu: ${formatVND(payload[0].value)}`}</p>
          <p className="text-gray-500">{`Clicks: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="earned" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="clicks" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
