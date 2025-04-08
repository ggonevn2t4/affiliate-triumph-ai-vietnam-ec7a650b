
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiToolsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" /> Công Nghệ AI Tiên Tiến
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Công Cụ AI Tối Ưu Cho Affiliate Marketer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Biến đổi cách bạn tiếp cận tiếp thị liên kết với các công cụ AI tiên tiến được thiết kế đặc biệt cho thị trường Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-end">
              <div className="mb-4">
                <h3 className="text-white text-2xl font-bold mb-2">AI Content Creator</h3>
                <p className="text-blue-100">Tạo nội dung tiếp thị hấp dẫn chỉ trong vài giây</p>
              </div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Tạo bài viết blog, mô tả sản phẩm và nội dung mạng xã hội</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Tối ưu hóa cho SEO với từ khóa phù hợp tự động</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Tạo nội dung phù hợp với văn hóa và thị trường Việt Nam</span>
                </li>
              </ul>
              <Link to="/ai-tools">
                <Button variant="outline" className="w-full flex items-center justify-center group">
                  Khám phá công cụ AI
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="h-64 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-end">
              <div className="mb-4">
                <h3 className="text-white text-2xl font-bold mb-2">AI Trend Analyzer</h3>
                <p className="text-purple-100">Dự đoán xu hướng thị trường để tối ưu hóa chiến dịch</p>
              </div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Phân tích dữ liệu thời gian thực về xu hướng tiêu dùng</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Đề xuất sản phẩm tiềm năng dựa trên phân tích thị trường</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cập nhật liên tục về các sự kiện mua sắm lớn tại Việt Nam</span>
                </li>
              </ul>
              <Link to="/ai-tools">
                <Button variant="outline" className="w-full flex items-center justify-center group">
                  Khám phá công cụ AI
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiToolsSection;
