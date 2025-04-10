
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-red-500">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Trang không tìm thấy</h1>
          <p className="text-gray-600 mb-8">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
            <br />
            Đường dẫn: <span className="font-medium">{location.pathname}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center justify-center"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button 
              className="flex items-center justify-center btn-gradient"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Về trang chủ
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
