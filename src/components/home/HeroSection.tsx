
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CircleDollarSign, ShoppingBag, TrendingUp, BarChart, Rocket } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email đăng ký:", email);
    setEmail('');
  };
  
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-brand-blue/90 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-purple/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-blue/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              Nền tảng tiếp thị liên kết số 1 Việt Nam
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Tối ưu thu nhập với{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-brand-purple via-pink-500 to-brand-blue bg-clip-text text-transparent">
                  AI Affiliate Marketing
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-brand-purple/40 to-brand-blue/40 blur-sm"></div>
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Tăng doanh thu từ tiếp thị liên kết với công nghệ AI tiên tiến giúp bạn tìm kiếm sản phẩm phù hợp, tạo nội dung hấp dẫn và tối ưu chiến dịch tự động.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" size="lg" className="h-12 px-8 bg-brand-purple hover:bg-brand-purple/90">
                Dùng thử miễn phí
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="flex items-center justify-center lg:justify-start text-sm text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Miễn phí 14 ngày, không cần thẻ tín dụng</span>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative z-20">
              <div className="glass-card p-4 md:p-6 shadow-2xl rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  alt="Dashboard Preview" 
                  className="rounded-lg shadow-2xl w-full"
                  src="/lovable-uploads/e4640c69-bee7-460b-9939-3e7fb9643b35.png"
                />
              </div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -left-12 top-1/4 glass-card p-4 shadow-xl rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 animate-float max-w-[200px]">
              <div className="flex items-center">
                <div className="bg-green-500/20 rounded-full p-2 mr-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Doanh thu</p>
                  <p className="text-lg font-bold text-white">+27.4%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-8 bottom-1/4 glass-card p-4 shadow-xl rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 animate-float-delayed max-w-[200px]">
              <div className="flex items-center">
                <div className="bg-blue-500/20 rounded-full p-2 mr-3">
                  <BarChart className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Tỉ lệ chuyển đổi</p>
                  <p className="text-lg font-bold text-white">12.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by section */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8">Được tin tưởng bởi hàng nghìn Affiliate Marketer</p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { icon: CircleDollarSign, name: "AffiPay", color: "text-brand-blue" },
              { icon: ShoppingBag, name: "AffShop", color: "text-green-500" },
              { icon: TrendingUp, name: "GrowthX", color: "text-brand-purple" },
              { icon: BarChart, name: "DataViz", color: "text-amber-500" },
              { icon: Rocket, name: "LaunchX", color: "text-blue-500" }
            ].map((partner, index) => (
              <div key={index} className="flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg h-16 w-36 p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2">
                  <partner.icon size={24} className={partner.color} />
                  <span className={`font-semibold text-white`}>{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
