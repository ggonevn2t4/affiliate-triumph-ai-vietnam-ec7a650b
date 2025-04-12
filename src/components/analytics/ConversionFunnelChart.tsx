
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const data = [
  { name: 'Tiếp cận', value: 12834, fill: '#818CF8' },
  { name: 'Click', value: 5218, fill: '#60A5FA' },
  { name: 'Xem trang', value: 3845, fill: '#34D399' },
  { name: 'Thêm vào giỏ', value: 1202, fill: '#FBBF24' },
  { name: 'Chuyển đổi', value: 678, fill: '#F87171' },
];

interface ConversionFunnelChartProps {
  className?: string;
}

const ConversionFunnelChart = ({ className = "" }: ConversionFunnelChartProps) => {
  const isMobile = useIsMobile();
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const rateFromPrevious = (index: number) => {
        if (index === 0) return '100%';
        const current = data[index].value;
        const previous = data[index - 1].value;
        const rate = (current / previous) * 100;
        return rate.toFixed(1) + '%';
      };
      
      const index = data.findIndex(item => item.name === label);
      const conversionRate = rateFromPrevious(index);
      
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-medium">{label}</p>
          <p className="text-gray-800">{`Số lượng: ${payload[0].value.toLocaleString()}`}</p>
          <p className="text-brand-blue">{`Tỷ lệ: ${conversionRate}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: isMobile ? 50 : 80,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionFunnelChart;
