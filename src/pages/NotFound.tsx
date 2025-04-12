
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Add page title for better SEO
    document.title = "Không tìm thấy trang | AffiliateVN";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 md:py-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 rounded-full h-20 w-20 md:h-24 md:w-24 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Trang không tìm thấy</h1>
            <div className="bg-red-50 text-red-500 rounded py-1 px-3 text-sm font-medium inline-block mb-4">
              Lỗi 404
            </div>
            
            <p className="text-gray-600 mb-6">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-6 text-sm break-all">
              <span className="font-medium text-gray-700">Đường dẫn:</span> <span className="text-gray-500">{location.pathname}</span>
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center`}>
              <Button 
                variant="outline" 
                className="flex items-center justify-center w-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              <Button 
                className="flex items-center justify-center w-full btn-gradient"
                asChild
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Về trang chủ
                </Link>
              </Button>
            </div>
          </div>
          
          {!isMobile && (
            <p className="text-gray-500 text-sm mt-6">
              Nếu bạn tin rằng có lỗi xảy ra, vui lòng liên hệ với chúng tôi qua email: support@affiliatevn.com
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
