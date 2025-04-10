
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-purple text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Sẵn sàng tối ưu hóa thu nhập từ tiếp thị liên kết?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Tham gia cùng hàng nghìn Affiliate Marketer thành công trên nền tảng AffiliateVN
          và bắt đầu tối ưu hóa thu nhập của bạn ngay hôm nay.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/register">
            <Button size="lg" className="bg-white text-brand-purple hover:bg-blue-50">
              Đăng ký miễn phí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="/demo">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Xem demo
            </Button>
          </a>
        </div>
        <p className="mt-6 text-blue-100 text-sm">
          Không cần thẻ tín dụng. Dùng thử miễn phí 14 ngày.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
