
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng ký
    console.log("Email đăng ký:", email);
    setEmail('');
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 md:py-28">
      {/* Decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="inline-block mb-4 px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full font-medium text-sm">
              Nền tảng tiếp thị liên kết số 1 Việt Nam
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tối ưu thu nhập với 
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent"> AI Affiliate Marketing</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tăng doanh thu từ tiếp thị liên kết với công nghệ AI tiên tiến giúp bạn tìm kiếm sản phẩm phù hợp, tạo nội dung hấp dẫn và tối ưu chiến dịch tự động.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-blue flex-grow"
                required
              />
              <Button type="submit" className="btn-gradient rounded-lg px-6 py-3 whitespace-nowrap">
                Dùng thử miễn phí
              </Button>
            </form>

            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Miễn phí 14 ngày, không cần thẻ tín dụng</span>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="glass-card p-4 md:p-6 shadow-xl relative z-20 animate-float">
              <img 
                src="https://placehold.co/600x400?text=Dashboard+Preview" 
                alt="Dashboard Preview"
                className="rounded-lg shadow-sm" 
              />
            </div>
            
            {/* Stats floating cards */}
            <div className="absolute -left-12 top-1/4 glass-card p-3 md:p-4 shadow-md animate-float max-w-36 md:max-w-48">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Doanh thu</p>
                  <p className="font-bold">+27.4%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-10 md:-right-12 bottom-1/4 glass-card p-3 md:p-4 shadow-md animate-float" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center">
                <div className="bg-brand-blue/10 rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Tỉ lệ chuyển đổi</p>
                  <p className="font-bold">12.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Được tin tưởng bởi hàng nghìn Affiliate Marketer</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            <img src="https://placehold.co/120x40?text=Logo+1" alt="Partner logo" className="h-8" />
            <img src="https://placehold.co/120x40?text=Logo+2" alt="Partner logo" className="h-8" />
            <img src="https://placehold.co/120x40?text=Logo+3" alt="Partner logo" className="h-8" />
            <img src="https://placehold.co/120x40?text=Logo+4" alt="Partner logo" className="h-8" />
            <img src="https://placehold.co/120x40?text=Logo+5" alt="Partner logo" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
