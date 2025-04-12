
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, DownloadIcon, FilterIcon, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PerformanceChart from '@/components/analytics/PerformanceChart';
import ConversionFunnelChart from '@/components/analytics/ConversionFunnelChart';
import CampaignTable from '@/components/analytics/CampaignTable';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const isMobile = useIsMobile();

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Phân tích</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <FilterIcon className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Phân tích chi tiết</h2>
            <p className="text-gray-500">Theo dõi hiệu suất chiến dịch và chuyển đổi</p>
          </div>
          <div className="flex items-center mt-4 lg:mt-0 space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hôm nay</SelectItem>
                <SelectItem value="week">7 ngày qua</SelectItem>
                <SelectItem value="month">30 ngày qua</SelectItem>
                <SelectItem value="quarter">Quý hiện tại</SelectItem>
                <SelectItem value="year">Năm hiện tại</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu
              </CardTitle>
              <DollarSign className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.456.000₫</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+18.2%</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lượt tiếp cận
              </CardTitle>
              <Users className="h-4 w-4 text-brand-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,834</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+7.4%</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tỷ lệ chuyển đổi
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.28%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+2.1%</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng chiến dịch
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-brand-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+3</span> chiến dịch mới
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất chiến dịch</CardTitle>
                <CardDescription>
                  Số lượt click và doanh thu theo thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart className="h-80" />
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Phễu chuyển đổi</CardTitle>
                <CardDescription>
                  Hành trình từ tiếp cận đến chuyển đổi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConversionFunnelChart className="h-80" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất chiến dịch</CardTitle>
                <CardDescription>
                  So sánh hiệu suất các chiến dịch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất sản phẩm</CardTitle>
                <CardDescription>
                  So sánh hiệu suất giữa các sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Đang cập nhật dữ liệu...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
