
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-primary rounded-lg w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                AffiliateVN
              </span>
            </Link>
            <p className="text-gray-600 mb-6">
              Nền tảng tiếp thị liên kết hàng đầu Việt Nam với công nghệ AI tiên tiến, giúp bạn tối ưu hoá thu nhập từ tiếp thị liên kết.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Bảng điều khiển
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Công cụ AI
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Phân tích dữ liệu
                </Link>
              </li>
              <li>
                <Link to="/link-management" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Quản lý liên kết
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-blue" />
                <a href="tel:0708684608" className="text-gray-600 hover:text-brand-blue transition-colors">
                  0708684608 (Zalo)
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-brand-blue flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Landmark 81, Quận Bình Thạnh, TPHCM
                </span>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Trung tâm hỗ trợ
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Tài liệu hướng dẫn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">© 2025 AffiliateVN. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-brand-blue transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-brand-blue transition-colors">
              Chính sách bảo mật
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-brand-blue transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
