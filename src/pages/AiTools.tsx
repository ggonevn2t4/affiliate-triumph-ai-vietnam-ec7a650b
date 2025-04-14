
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import OptimusAlphaGenerator from '@/components/ai-tools/OptimusAlphaGenerator';
import ApiKeyDialog from '@/components/ai-tools/ApiKeyDialog';

const AiTools = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Công cụ AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ApiKeyDialog />
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Sức mạnh của AI trong tầm tay bạn</h2>
          <p className="text-gray-500">Sử dụng các công cụ AI để tạo nội dung, tối ưu hóa chiến dịch và hơn thế nữa</p>
        </div>

        <OptimusAlphaGenerator />
      </main>
    </div>
  );
};

export default AiTools;
