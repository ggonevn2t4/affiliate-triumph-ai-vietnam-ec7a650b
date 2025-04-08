
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, PenSquare, Sparkles, Compass, BookUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentGeneratorTool from "@/components/ai-tools/ContentGeneratorTool";
import TrendAnalyzerTool from "@/components/ai-tools/TrendAnalyzerTool";

const AiTools = () => {
  const [activeTab, setActiveTab] = useState<"content" | "trends">("content");

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại bảng điều khiển
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Công cụ AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/ai-coaching">
              <Button variant="outline" size="sm">
                <BookUser className="h-4 w-4 mr-2" />
                AI Coaching
              </Button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gradient-primary rounded-xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-1">Công cụ AI cho Affiliate Marketing</h2>
          <p className="mb-4 opacity-90">Tận dụng sức mạnh của trí tuệ nhân tạo để tối ưu hóa chiến dịch tiếp thị liên kết của bạn</p>
          <div className="flex items-center space-x-4">
            <Button className="bg-white text-brand-blue hover:bg-blue-50 flex items-center">
              <PenSquare className="h-4 w-4 mr-2" />
              Tạo nội dung mới
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 flex items-center">
              <Compass className="h-4 w-4 mr-2" />
              Khám phá tính năng
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "content"
                    ? "border-b-2 border-brand-blue text-brand-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <PenSquare className="mr-2 h-4 w-4" />
                  AI Content Creator
                </div>
              </button>
              <button
                onClick={() => setActiveTab("trends")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "trends"
                    ? "border-b-2 border-brand-blue text-brand-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Compass className="mr-2 h-4 w-4" />
                  AI Trend Analyzer
                </div>
              </button>
            </div>
          </div>
          <div className="p-6">
            {activeTab === "content" ? (
              <ContentGeneratorTool />
            ) : (
              <TrendAnalyzerTool />
            )}
          </div>
        </div>

        {/* AI Features Showcase */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-brand-blue" />
            Tính năng AI tiên tiến
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-100 rounded-lg p-5 shadow-sm">
              <h4 className="font-medium text-lg mb-2">Tạo nội dung tự động</h4>
              <p className="text-gray-600 mb-4">Tạo bài viết blog, mô tả sản phẩm và nội dung mạng xã hội chất lượng cao chỉ với vài cú nhấp chuột</p>
              <div className="text-brand-blue font-medium">Sử dụng công nghệ OpenAI GPT</div>
            </div>
            <div className="border border-gray-100 rounded-lg p-5 shadow-sm">
              <h4 className="font-medium text-lg mb-2">Phân tích xu hướng thị trường</h4>
              <p className="text-gray-600 mb-4">Nhận thông tin chi tiết về xu hướng mới nổi để tận dụng cơ hội trước khi đối thủ cạnh tranh</p>
              <div className="text-brand-blue font-medium">Dự đoán xu hướng với độ chính xác cao</div>
            </div>
            <div className="border border-gray-100 rounded-lg p-5 shadow-sm">
              <h4 className="font-medium text-lg mb-2">Tối ưu hóa từ khóa tự động</h4>
              <p className="text-gray-600 mb-4">Phân tích từ khóa mục tiêu và tối ưu hóa nội dung của bạn để đạt thứ hạng tốt hơn trên các công cụ tìm kiếm</p>
              <div className="text-brand-blue font-medium">Tăng lưu lượng tự nhiên</div>
            </div>
          </div>
        </div>

        {/* AI Coaching Promotion */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Nâng cao kỹ năng của bạn với AI Coaching</h3>
            <p className="opacity-90">Nhận lời khuyên cá nhân hóa và chiến lược chuyên sâu từ trợ lý AI của chúng tôi</p>
          </div>
          <Link to="/ai-coaching">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
              <BookUser className="h-4 w-4 mr-2" />
              Trải nghiệm AI Coaching ngay
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AiTools;
