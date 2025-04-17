
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, LineChart, Calendar } from 'lucide-react';
import OptimusAlphaGenerator from '@/components/ai-tools/OptimusAlphaGenerator';
import TrendAnalyzerTool from '@/components/ai-tools/TrendAnalyzerTool';
import SocialMediaPlanner from '@/components/ai-tools/SocialMediaPlanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Sức mạnh của AI trong tầm tay bạn</h2>
          <p className="text-gray-500">Sử dụng các công cụ AI để tạo nội dung, phân tích xu hướng và tối ưu chiến dịch marketing của bạn</p>
        </div>
        
        <Tabs defaultValue="content-generator" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content-generator" className="flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Tạo nội dung
            </TabsTrigger>
            <TabsTrigger value="trend-analyzer" className="flex items-center justify-center">
              <LineChart className="h-4 w-4 mr-2" />
              Phân tích xu hướng
            </TabsTrigger>
            <TabsTrigger value="social-planner" className="flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              Lên lịch đăng bài
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content-generator" className="mt-6">
            <OptimusAlphaGenerator />
          </TabsContent>
          <TabsContent value="trend-analyzer" className="mt-6">
            <TrendAnalyzerTool />
          </TabsContent>
          <TabsContent value="social-planner" className="mt-6">
            <SocialMediaPlanner />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AiTools;
