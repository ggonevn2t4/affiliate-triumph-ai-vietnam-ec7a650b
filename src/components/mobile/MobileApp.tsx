
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, BarChart3, ShoppingBag, FileText, User, ArrowUpRight, Phone, Smartphone, Tablet, Laptop } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deviceType, setDeviceType] = useState('mobile');
  
  // Change device type preview
  const changeDeviceType = (type: string) => {
    setDeviceType(type);
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Ứng dụng di động AffiliateVN</h2>
        <p className="text-gray-500 max-w-2xl mb-6">
          Quản lý chiến dịch affiliate và theo dõi hiệu suất kinh doanh của bạn mọi lúc mọi nơi với ứng dụng di động của chúng tôi.
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          <Button 
            variant={deviceType === 'mobile' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => changeDeviceType('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Điện thoại
          </Button>
          <Button 
            variant={deviceType === 'tablet' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => changeDeviceType('tablet')}
          >
            <Tablet className="h-4 w-4 mr-2" />
            Máy tính bảng
          </Button>
        </div>
      </div>
      
      <div className={`border-8 rounded-3xl border-gray-800 bg-white shadow-xl overflow-hidden transition-all duration-300
        ${deviceType === 'mobile' ? 'w-[320px] h-[640px]' : 'w-[768px] h-[1024px]'}`}>
        <div className="relative h-full">
          {/* Status bar */}
          <div className="bg-gray-800 text-white text-xs px-4 py-2 flex justify-between">
            <span>10:30</span>
            <div className="flex space-x-2">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* App content */}
          <div className="h-[calc(100%-80px)] overflow-y-auto p-4">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="dashboard" className="m-0">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-1">Xin chào, Thành An</h2>
                  <p className="text-sm text-gray-500">Chào mừng quay trở lại!</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <StatCard 
                    title="Doanh thu" 
                    value="9.85M₫" 
                    icon={<BarChart3 className="h-3 w-3 text-brand-blue" />}
                    change={18.2}
                    bgColor="bg-blue-50"
                  />
                  <StatCard 
                    title="Lượt click" 
                    value="3,872" 
                    icon={<ArrowUpRight className="h-3 w-3 text-green-500" />}
                    change={12.5}
                    bgColor="bg-green-50"
                  />
                </div>
                
                <Card className="mb-4">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Chiến dịch đang hoạt động</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <ul className="space-y-2">
                      {['Khuyến mãi Tết 2023', 'Mua 1 tặng 1', 'Giảm giá hè'].map((campaign, index) => (
                        <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{campaign}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Hoạt động gần đây</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <ul className="space-y-2 text-xs">
                      <li className="flex gap-2 pb-2 border-b">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Bạn nhận được 250.000₫ từ chiến dịch Khuyến mãi Tết</p>
                          <p className="text-gray-500">2 giờ trước</p>
                        </div>
                      </li>
                      <li className="flex gap-2 pb-2 border-b">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Chiến dịch mới đã được tạo</p>
                          <p className="text-gray-500">8 giờ trước</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Nội dung mới được tạo bởi AI</p>
                          <p className="text-gray-500">hôm qua</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="campaigns" className="m-0">
                <h2 className="text-xl font-bold mb-4">Chiến dịch</h2>
                <p className="text-gray-500 mb-6">Quản lý các chiến dịch affiliate của bạn</p>
                
                <div className="space-y-3">
                  {['Khuyến mãi Tết 2023', 'Mua 1 tặng 1', 'Giảm giá hè', 'Flash Sale Cuối Tuần', 'Giảm Giá Black Friday'].map((campaign, index) => (
                    <Card key={index} className="border">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">{campaign}</CardTitle>
                      </CardHeader>
                      <CardFooter className="py-2 border-t bg-gray-50 flex justify-between">
                        <span className="text-xs text-gray-500">10/04/2023</span>
                        <Button variant="ghost" size="sm" className="h-6 p-0">
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="earnings" className="m-0">
                <h2 className="text-xl font-bold mb-4">Thu nhập</h2>
                <p className="text-gray-500 mb-6">Theo dõi thu nhập hoa hồng của bạn</p>
                
                <Card className="mb-4">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Tổng thu nhập</CardTitle>
                  </CardHeader>
                  <CardContent className="py-6 text-center">
                    <p className="text-3xl font-bold">9,850,000₫</p>
                    <p className="text-sm text-green-500 flex items-center justify-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      18.2% so với tháng trước
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Giao dịch gần đây</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <ul className="space-y-2">
                      {[
                        { program: 'Shopee', amount: '250,000₫', date: '10/04/2023' },
                        { program: 'Lazada', amount: '180,000₫', date: '05/04/2023' },
                        { program: 'Tiki', amount: '120,000₫', date: '28/03/2023' },
                      ].map((tx, index) => (
                        <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                          <div>
                            <p className="font-medium">{tx.program}</p>
                            <p className="text-xs text-gray-500">{tx.date}</p>
                          </div>
                          <p className="font-semibold">{tx.amount}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="m-0">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-20 h-20 rounded-full bg-brand-blue text-white flex items-center justify-center text-3xl mb-4">
                    TA
                  </div>
                  <h2 className="text-xl font-bold">Thành An</h2>
                  <p className="text-gray-500 mb-6">thanhan@example.com</p>
                  
                  <div className="w-full space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Thông tin cá nhân
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Quản lý chiến dịch
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Báo cáo thu nhập
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50" size="sm">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Bottom navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-[60px] border-t bg-white flex items-center justify-around px-2">
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center justify-center h-12 w-16 ${activeTab === 'dashboard' ? 'text-brand-blue' : 'text-gray-500'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Home className="h-5 w-5" />
              <span className="text-[10px] mt-1">Trang chủ</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center justify-center h-12 w-16 ${activeTab === 'campaigns' ? 'text-brand-blue' : 'text-gray-500'}`}
              onClick={() => setActiveTab('campaigns')}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-[10px] mt-1">Chiến dịch</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center justify-center h-12 w-16 ${activeTab === 'earnings' ? 'text-brand-blue' : 'text-gray-500'}`}
              onClick={() => setActiveTab('earnings')}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-[10px] mt-1">Thu nhập</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center justify-center h-12 w-16 ${activeTab === 'profile' ? 'text-brand-blue' : 'text-gray-500'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-5 w-5" />
              <span className="text-[10px] mt-1">Tài khoản</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Tính năng ứng dụng di động</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-medium text-lg mb-2">Theo dõi thời gian thực</h3>
              <p className="text-gray-500 text-sm">Theo dõi hiệu suất chiến dịch và thu nhập ngay trên thiết bị di động của bạn.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Quản lý chiến dịch</h3>
              <p className="text-gray-500 text-sm">Tạo và quản lý các chiến dịch affiliate của bạn mọi lúc mọi nơi.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Công cụ AI di động</h3>
              <p className="text-gray-500 text-sm">Truy cập các công cụ AI để tạo nội dung và phân tích trực tiếp trên điện thoại.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
