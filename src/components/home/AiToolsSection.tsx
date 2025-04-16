
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, BookUser, Bot, Brain, Fingerprint, Zap, LineChart } from 'lucide-react';

const AiToolsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 25%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" /> Công Nghệ AI Tiên Tiến
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Công Cụ <span className="text-brand-purple">AI</span> Tối Ưu Cho Affiliate Marketer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Biến đổi cách bạn tiếp cận tiếp thị liên kết với các công cụ AI tiên tiến được thiết kế đặc biệt cho thị trường Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            {
              title: "AI Content Creator",
              description: "Tạo nội dung tiếp thị hấp dẫn chỉ trong vài giây",
              icon: <Brain />,
              gradient: "from-blue-600 to-indigo-600",
              features: [
                "Tạo bài viết blog, mô tả sản phẩm và nội dung mạng xã hội",
                "Tối ưu hóa cho SEO với từ khóa phù hợp tự động",
                "Tạo nội dung phù hợp với văn hóa và thị trường Việt Nam"
              ],
              link: "/ai-tools"
            },
            {
              title: "AI Trend Analyzer",
              description: "Dự đoán xu hướng thị trường để tối ưu hóa chiến dịch",
              icon: <LineChart />,
              gradient: "from-purple-600 to-pink-600",
              features: [
                "Phân tích dữ liệu thời gian thực về xu hướng tiêu dùng",
                "Đề xuất sản phẩm tiềm năng dựa trên phân tích thị trường",
                "Cập nhật liên tục về các sự kiện mua sắm lớn tại Việt Nam"
              ],
              link: "/ai-tools"
            },
            {
              title: "AI Coaching",
              description: "Nhận tư vấn cá nhân hóa cho chiến lược tiếp thị của bạn",
              icon: <Bot />,
              gradient: "from-teal-600 to-emerald-600",
              features: [
                "Lời khuyên cá nhân hóa dựa trên dữ liệu hành vi và mục tiêu",
                "Chiến lược tối ưu về thời điểm đăng bài và kênh marketing",
                "Hướng dẫn tùy chỉnh cho marketers ở mọi cấp độ kinh nghiệm"
              ],
              link: "/ai-coaching"
            }
          ].map((tool, index) => (
            <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white group">
              <div className={`h-64 bg-gradient-to-r ${tool.gradient} p-6 flex items-end group-hover:scale-[1.02] transition-transform duration-300`}>
                <div className="mb-4">
                  <div className="mb-8">
                    {React.cloneElement(tool.icon as React.ReactElement, {
                      className: "w-12 h-12 text-white/90"
                    })}
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">{tool.title}</h3>
                  <p className="text-white/90">{tool.description}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-3 mb-6">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={tool.link}>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center group hover:bg-brand-purple hover:text-white border-brand-purple/20 text-brand-purple"
                  >
                    Khám phá công cụ
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiToolsSection;
