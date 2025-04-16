
import { Brain, BarChart3, Lightbulb, ShieldCheck, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-10 w-10 text-brand-purple" />,
    title: 'AI Tiên Tiến',
    description: 'Dự đoán xu hướng thị trường và tìm kiếm sản phẩm phù hợp với người dùng dựa trên công nghệ AI.'
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-brand-purple" />,
    title: 'Tạo Nội Dung Thông Minh',
    description: 'Tạo bài viết, hình ảnh và video chất lượng cao phù hợp với sản phẩm và đối tượng của bạn.'
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-brand-blue" />,
    title: 'Phân Tích Chuyên Sâu',
    description: 'Báo cáo chi tiết về hiệu suất chiến dịch của bạn với các chỉ số quan trọng để tối ưu hóa kết quả.'
  },
  {
    icon: <Zap className="h-10 w-10 text-brand-purple" />,
    title: 'Tự Động Hóa Tối Ưu',
    description: 'Quản lý chiến dịch tự động với AI giúp lập kế hoạch, theo dõi và điều chỉnh mà không cần can thiệp thủ công.'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-brand-blue" />,
    title: 'Bảo Vệ Hoa Hồng',
    description: 'Hệ thống chống gian lận bằng AI giúp phát hiện và ngăn chặn click giả, đảm bảo hoa hồng của bạn luôn an toàn.'
  },
  {
    icon: <Users className="h-10 w-10 text-brand-purple" />,
    title: 'Cộng Đồng Sôi Động',
    description: 'Tham gia vào cộng đồng hàng nghìn Affiliate Marketer để chia sẻ kinh nghiệm và học hỏi các chiến lược thành công.'
  }
];

const FeatureSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 25%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Công nghệ hiện đại
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Công Nghệ <span className="text-brand-purple">AI</span> Cho Tiếp Thị Liên Kết Hiện Đại
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nền tảng của chúng tôi cung cấp các công cụ tiên tiến để giúp bạn tối đa hóa doanh thu từ tiếp thị liên kết, tất cả được hỗ trợ bởi trí tuệ nhân tạo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-white hover:bg-gradient-to-br from-white to-brand-purple/5 border border-gray-100 hover:border-brand-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/5"
            >
              <div className="mb-6 p-3 inline-block rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 group-hover:from-brand-purple/20 group-hover:to-brand-blue/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-purple transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
