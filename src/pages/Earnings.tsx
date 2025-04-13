import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, ShoppingBag, BarChart2, FilePen, BookUser, DollarSign, Smartphone } from 'lucide-react';
import EarningsTracker from '@/components/earnings/EarningsTracker';

const Earnings = () => {
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
            <h1 className="text-xl font-bold">Theo dõi Thu nhập</h1>
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
                    <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <BarChart3 className="h-4 w-4 mr-3" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/earnings" className="flex items-center px-3 py-2 text-sm font-medium bg-brand-blue/10 text-brand-blue rounded-md">
                      <DollarSign className="h-4 w-4 mr-3" />
                      Thu nhập
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
                  <li>
                    <Link to="/mobile-app" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <Smartphone className="h-4 w-4 mr-3" />
                      Ứng dụng di động
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-10 space-y-6">
            <EarningsTracker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earnings;
