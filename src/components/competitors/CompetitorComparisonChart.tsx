
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

// Sample data for the chart
const data = [
  { name: 'Lượt click', bạn: 4500, đốiThủ1: 3800, đốiThủ2: 5200, đốiThủ3: 4100 },
  { name: 'Tỷ lệ chuyển đổi', bạn: 3.2, đốiThủ1: 2.8, đốiThủ2: 3.5, đốiThủ3: 2.9 },
  { name: 'Doanh thu', bạn: 12500000, đốiThủ1: 9800000, đốiThủ2: 15300000, đốiThủ3: 10200000 },
  { name: 'ROI', bạn: 320, đốiThủ1: 270, đốiThủ2: 380, đốiThủ3: 290 },
  { name: 'CPC', bạn: 5200, đốiThủ1: 4800, đốiThủ2: 5500, đốiThủ3: 4900 },
];

interface CompetitorComparisonChartProps {
  className?: string;
}

const CompetitorComparisonChart = ({ className = "" }: CompetitorComparisonChartProps) => {
  const [metricType, setMetricType] = useState('all');
  
  const getFilteredData = () => {
    if (metricType === 'all') return data;
    return data.filter(item => item.name === metricType);
  };

  const formatValue = (value: number, metricName: string) => {
    if (metricName === 'Doanh thu') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
      }).format(value);
    } else if (metricName === 'Tỷ lệ chuyển đổi' || metricName === 'ROI') {
      return `${value}%`;
    } else if (metricName === 'CPC') {
      return `${value.toLocaleString()}đ`;
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${formatValue(entry.value, label)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-lg font-medium mb-2 sm:mb-0">Hiệu suất so với đối thủ</h3>
          <Select value={metricType} onValueChange={setMetricType}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Chọn chỉ số" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tất cả chỉ số</SelectItem>
                <SelectItem value="Lượt click">Lượt click</SelectItem>
                <SelectItem value="Tỷ lệ chuyển đổi">Tỷ lệ chuyển đổi</SelectItem>
                <SelectItem value="Doanh thu">Doanh thu</SelectItem>
                <SelectItem value="ROI">ROI</SelectItem>
                <SelectItem value="CPC">CPC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Bạn</div>
              <div className="h-2 w-full bg-blue-500 rounded-full"></div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Đối thủ 1</div>
              <div className="h-2 w-full bg-green-500 rounded-full"></div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Đối thủ 2</div>
              <div className="h-2 w-full bg-purple-500 rounded-full"></div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Đối thủ 3</div>
              <div className="h-2 w-full bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={getFilteredData()}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="bạn" name="Bạn" fill="#3B82F6" />
          <Bar dataKey="đốiThủ1" name="Đối thủ 1" fill="#10B981" />
          <Bar dataKey="đốiThủ2" name="Đối thủ 2" fill="#8B5CF6" />
          <Bar dataKey="đốiThủ3" name="Đối thủ 3" fill="#F97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompetitorComparisonChart;
