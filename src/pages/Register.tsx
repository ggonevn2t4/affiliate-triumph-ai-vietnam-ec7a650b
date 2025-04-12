
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signUp, loading, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    await signUp(email, password, fullName);
  };
  
  // Check password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const texts = ["", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
    const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
    
    return { strength, text: texts[strength], color: colors[strength] };
  };
  
  const passwordStrength = getPasswordStrength(password);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left panel - decorative */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-brand-purple to-brand-blue relative">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md">
              <div className="text-white mb-8">
                <h2 className="text-3xl font-bold mb-4">Bắt đầu hành trình tiếp thị liên kết với AI</h2>
                <p className="opacity-90">
                  Đăng ký ngay hôm nay để trải nghiệm sức mạnh của tiếp thị liên kết được hỗ trợ bởi AI tiên tiến.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-white">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>Tăng doanh thu với các công cụ AI tiên tiến</p>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>Tạo nội dung hấp dẫn chỉ trong vài giây</p>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>Phân tích chiến dịch chi tiết để tối ưu kết quả</p>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>Dự đoán xu hướng thị trường với công nghệ AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-1/2 flex flex-col p-8">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary rounded-lg w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                AffiliateVN
              </span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Đăng ký tài khoản</h1>
              <p className="text-gray-600">Bắt đầu tiếp thị liên kết với AI chỉ trong vài phút</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-gray-600">Độ mạnh: {passwordStrength.text}</div>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color}`} 
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="h-4 w-4 text-brand-blue focus:ring-brand-blue/50 border-gray-300 rounded"
                  />
                  <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                    Tôi đồng ý với{' '}
                    <Link to="/terms" className="text-brand-blue hover:text-brand-purple">
                      Điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link to="/privacy" className="text-brand-blue hover:text-brand-purple">
                      Chính sách bảo mật
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !agreeTerms}
                className="w-full btn-gradient h-11"
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc đăng ký bằng</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </div>
                </button>

                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    Facebook
                  </div>
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-medium text-brand-blue hover:text-brand-purple">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
