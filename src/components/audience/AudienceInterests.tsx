
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, TrendingUp, LinkIcon } from "lucide-react";

const interestsData = [
  { name: 'Công nghệ', value: 68, color: '#3B82F6', trending: true },
  { name: 'Thời trang', value: 52, color: '#EC4899', trending: true },
  { name: 'Làm đẹp', value: 45, color: '#F97316', trending: false },
  { name: 'Du lịch', value: 38, color: '#10B981', trending: true },
  { name: 'Ẩm thực', value: 32, color: '#A855F7', trending: false },
  { name: 'Thể thao', value: 26, color: '#F43F5E', trending: false },
  { name: 'Sức khỏe', value: 23, color: '#6366F1', trending: true },
  { name: 'Giáo dục', value: 20, color: '#14B8A6', trending: false }
];

const behaviorData = [
  { name: 'Mua sắm trực tuyến', value: 75 },
  { name: 'Đọc đánh giá sản phẩm', value: 65 },
  { name: 'So sánh giá', value: 85 },
  { name: 'Sử dụng mã giảm giá', value: 60 },
  { name: 'Xem video sản phẩm', value: 50 },
];

const contentPreferenceData = [
  { name: 'Video', value: 40 },
  { name: 'Bài viết', value: 30 },
  { name: 'Hình ảnh', value: 20 },
  { name: 'Podcast', value: 10 },
];

const COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F97316'];

const AudienceInterests = () => {
  const [showAllInterests, setShowAllInterests] = useState(false);
  
  const visibleInterests = showAllInterests ? interestsData : interestsData.slice(0, 5);
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-100">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="interests">
        <TabsList>
          <TabsTrigger value="interests">Sở thích</TabsTrigger>
          <TabsTrigger value="behavior">Hành vi</TabsTrigger>
          <TabsTrigger value="content">Ưa thích nội dung</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interests" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sở thích hàng đầu của khán giả</CardTitle>
              <CardDescription>Phân tích các chủ đề và danh mục được khán giả quan tâm nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visibleInterests.map((interest, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium">{interest.name}</span>
                        {interest.trending && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm font-medium">{interest.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="rounded-full h-2" 
                        style={{ width: `${interest.value}%`, backgroundColor: interest.color }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAllInterests(!showAllInterests)} 
                  className="mt-2"
                >
                  {showAllInterests ? (
                    <span className="flex items-center">
                      Hiển thị ít hơn <ChevronUp className="ml-1 h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Xem tất cả sở thích <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Đề xuất nội dung dựa trên sở thích</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="border rounded-md p-3 hover:bg-gray-50">
                    <div className="font-medium mb-1">Top 10 smartphone bán chạy nhất</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Phù hợp: Công nghệ
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-gray-50">
                    <div className="font-medium mb-1">Xu hướng thời trang mùa hè</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Phù hợp: Thời trang
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Hành vi mua sắm</CardTitle>
              <CardDescription>Phân tích hành vi mua sắm và tương tác của khán giả</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={behaviorData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 border-t pt-4 text-sm">
                <h4 className="font-medium mb-2">Hiểu về hành vi khán giả</h4>
                <p className="text-gray-600 mb-4">
                  Khán giả của bạn thường so sánh giá trước khi mua sắm (85%) và ưa thích mua sắm trực tuyến (75%). 
                  Họ cũng dành thời gian đọc đánh giá sản phẩm (65%) và sử dụng mã giảm giá (60%).
                </p>
                <h4 className="font-medium mb-2">Đề xuất chiến lược</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Nhấn mạnh giá trị và giá cả cạnh tranh trong nội dung</li>
                  <li>Khuyến khích đánh giá từ người dùng và hiển thị nổi bật</li>
                  <li>Cung cấp mã giảm giá độc quyền để tăng chuyển đổi</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ưa thích nội dung</CardTitle>
              <CardDescription>Phân tích loại nội dung mà khán giả ưa thích</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentPreferenceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentPreferenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 border-t pt-4 text-sm">
                <h4 className="font-medium mb-2">Tối ưu hóa nội dung của bạn</h4>
                <p className="text-gray-600 mb-4">
                  Khán giả của bạn ưa thích nội dung dạng video (40%) và bài viết (30%). 
                  Tập trung vào các định dạng này sẽ tăng tương tác và chuyển đổi.
                </p>
                <h4 className="font-medium mb-2">Đề xuất chiến lược nội dung</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Tạo video ngắn về sản phẩm và hướng dẫn sử dụng</li>
                  <li>Viết bài đánh giá chi tiết và so sánh sản phẩm</li>
                  <li>Sử dụng hình ảnh chất lượng cao để minh họa tính năng sản phẩm</li>
                  <li>Thử nghiệm podcast cho nội dung chuyên sâu</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AudienceInterests;
