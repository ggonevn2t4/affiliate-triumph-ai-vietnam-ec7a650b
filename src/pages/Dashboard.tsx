
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, DollarSign, Users, ShoppingBag, BarChart2, FilePen, BookUser } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ProductSuggestion from '@/components/dashboard/ProductSuggestion';
import ContentGenerator from '@/components/dashboard/ContentGenerator';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại trang chủ
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Bảng điều khiển</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Hỗ trợ
            </Button>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium bg-brand-blue/10 text-brand-blue rounded-md">
                      <BarChart3 className="h-4 w-4 mr-3" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/create-campaign" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <ShoppingBag className="h-4 w-4 mr-3" />
                      Chiến dịch
                    </Link>
                  </li>
                  <li>
                    <Link to="/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <BarChart2 className="h-4 w-4 mr-3" />
                      Phân tích
                    </Link>
                  </li>
                  <li>
                    <Link to="/content" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <FilePen className="h-4 w-4 mr-3" />
                      Nội dung
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai-coaching" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <BookUser className="h-4 w-4 mr-3" />
                      AI Coaching
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-10 space-y-6">
            {/* Welcome banner */}
            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">Xin chào, Thành An</h2>
              <p className="mb-4 opacity-90">Chào mừng quay trở lại với AffiliateVN!</p>
              <div className="flex items-center space-x-4">
                <Button className="bg-white text-brand-blue hover:bg-blue-50" asChild>
                  <Link to="/create-campaign">Tạo chiến dịch mới</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/ai-tools">Khám phá công cụ AI</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Doanh thu tháng này" 
                value="9.850.000₫" 
                icon={<DollarSign className="h-4 w-4 text-brand-blue" />}
                change={18.2}
                changeText="so với tháng trước"
              />
              <StatCard 
                title="Số lượt click" 
                value="3,872" 
                icon={<Users className="h-4 w-4 text-brand-purple" />}
                change={12.5}
                changeText="so với tháng trước"
              />
              <StatCard 
                title="Tỉ lệ chuyển đổi" 
                value="4.28%" 
                icon={<BarChart2 className="h-4 w-4 text-brand-blue" />}
                change={-1.8}
                changeText="so với tháng trước"
              />
              <StatCard 
                title="Sản phẩm đang quảng bá" 
                value="12" 
                icon={<ShoppingBag className="h-4 w-4 text-brand-purple" />}
                changeText="2 sản phẩm mới"
              />
            </div>

            {/* Charts */}
            <RevenueChart className="w-full" />

            {/* AI Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductSuggestion />
              <ContentGenerator />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
