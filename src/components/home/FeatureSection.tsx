
import { Brain, BarChart3, Lightbulb, ShieldCheck, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-10 w-10 text-brand-blue" />,
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Công Nghệ <span className="text-brand-blue">AI</span> Cho Tiếp Thị Liên Kết Hiện Đại
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nền tảng của chúng tôi cung cấp các công cụ tiên tiến để giúp bạn tối đa hóa doanh thu từ tiếp thị liên kết, tất cả được hỗ trợ bởi trí tuệ nhân tạo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div className="mb-4 p-3 inline-block rounded-xl bg-gray-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
