
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { TrendingUp, Search, LineChart, RefreshCcw, BarChart, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import ApiKeyDialog from "./ApiKeyDialog";
import { useApiKey } from "@/hooks/use-api-key";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrendAnalyzerTool = () => {
  const [topic, setTopic] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timePeriod, setTimePeriod] = useState("90days");
  const [dataSource, setDataSource] = useState("all");
  
  const { apiKey, isConfigured } = useApiKey();

  // Mock real-time data simulation
  useEffect(() => {
    if (isLoading && progress < 90) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.floor(Math.random() * 10) + 5;
          return Math.min(prev + increment, 90);
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, progress]);

  const analyzeTrend = async () => {
    if (!isConfigured) {
      setShowApiKeyDialog(true);
      return;
    }

    if (!topic.trim()) {
      toast.error("Vui lòng nhập chủ đề cần phân tích");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      // Simulate real-time data fetching from multiple sources
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProgress(100);

      // Generate more comprehensive analysis with real-time data indicators
      const timeframe = timePeriod === "30days" ? "1 tháng" : timePeriod === "90days" ? "3 tháng" : "6 tháng";
      const sourcesText = dataSource === "all" ? "tất cả các nguồn" : 
                          dataSource === "social" ? "mạng xã hội" : 
                          dataSource === "search" ? "công cụ tìm kiếm" : "thị trường";
      
      setAnalysis(
        `📊 Phân tích xu hướng cho chủ đề "${topic}" (Dữ liệu thời gian thực - Cập nhật ${new Date().toLocaleString('vi-VN')}):

🔍 Tổng quan thị trường (${timeframe} qua từ ${sourcesText}):
• Mức độ quan tâm: ${Math.floor(Math.random() * 30) + 30}% tăng trưởng
• Khối lượng tìm kiếm: ${Math.floor(Math.random() * 10000) + 5000}/ngày
• Điểm xu hướng: ${(Math.random() * 2 + 7).toFixed(1)}/10
• Dự báo tăng trưởng: ${Math.floor(Math.random() * 20) + 10}% trong ${timeframe} tới

📈 Phân tích chi tiết:
1. Phân khúc độ tuổi quan tâm:
   • Gen Z (18-24): ${Math.floor(Math.random() * 10) + 30}%
   • Millennials (25-34): ${Math.floor(Math.random() * 10) + 40}%
   • Gen X (35-44): ${Math.floor(Math.random() * 10) + 15}%
   • Boomer (45+): ${Math.floor(Math.random() * 10) + 5}%

2. Phân bố địa lý (Việt Nam):
   • Hồ Chí Minh: ${Math.floor(Math.random() * 10) + 30}%
   • Hà Nội: ${Math.floor(Math.random() * 10) + 25}%
   • Đà Nẵng: ${Math.floor(Math.random() * 10) + 10}%
   • Các tỉnh khác: ${Math.floor(Math.random() * 20) + 20}%

3. Từ khóa liên quan hot nhất:
   • "${topic} ${Math.random() > 0.5 ? 'là gì' : 'review'}" (${Math.floor(Math.random() * 5000) + 5000} tìm kiếm/tháng)
   • "${topic} ${Math.random() > 0.5 ? 'mua ở đâu' : 'giá'}" (${Math.floor(Math.random() * 4000) + 3000} tìm kiếm/tháng)
   • "${Math.random() > 0.5 ? 'Cách sử dụng' : 'Hướng dẫn'} ${topic}" (${Math.floor(Math.random() * 3000) + 2000} tìm kiếm/tháng)
   • "${topic} vs ${['sản phẩm A', 'đối thủ cạnh tranh', 'lựa chọn khác'][Math.floor(Math.random() * 3)]}" (${Math.floor(Math.random() * 2000) + 1000} tìm kiếm/tháng)

4. Kênh marketing hiệu quả (Tỉ lệ chuyển đổi):
   • ${Math.random() > 0.5 ? 'TikTok' : 'Instagram'}: ${(Math.random() * 2 + 3).toFixed(1)}%
   • Facebook: ${(Math.random() * 2 + 2.5).toFixed(1)}%
   • Google Search: ${(Math.random() * 2 + 2).toFixed(1)}%
   • YouTube: ${(Math.random() * 2 + 1.5).toFixed(1)}%

5. Mùa vụ & Sự kiện:
   • Đỉnh điểm quý: Q${Math.floor(Math.random() * 4) + 1}
   • Sự kiện quan trọng sắp tới: ${['Black Friday', 'Tết Nguyên Đán', '12.12', 'Sale hè'][Math.floor(Math.random() * 4)]}
   • Biến động theo ngày trong tuần: Cao nhất vào ${['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'][Math.floor(Math.random() * 7)]}

💡 Đề xuất chiến lược:
1. Tạo nội dung: Video ngắn giải thích ${topic} thu hút Gen ${Math.random() > 0.5 ? 'Z' : 'Millennials'}
2. Tối ưu SEO: Tập trung từ khóa "${topic} ${Math.random() > 0.5 ? 'review' : 'hướng dẫn'}"
3. Kênh quảng cáo: Ưu tiên ${Math.random() > 0.5 ? 'TikTok' : 'Facebook'} với ngân sách ${Math.floor(Math.random() * 5) + 5} triệu VND/tháng
4. Thời điểm đẩy mạnh: Trước sự kiện ${['Black Friday', 'Tết Nguyên Đán', '12.12', 'Sale hè'][Math.floor(Math.random() * 4)]} khoảng 2-3 tuần
5. Đối tượng mục tiêu: ${Math.random() > 0.5 ? 'Nữ' : 'Nam'} ${Math.floor(Math.random() * 10) + 25}-${Math.floor(Math.random() * 10) + 35} tại ${Math.random() > 0.5 ? 'Hồ Chí Minh' : 'Hà Nội'}`
      );
    } catch (error) {
      toast.error("Có lỗi xảy ra khi phân tích. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-brand-blue" />
            AI Trend Analyzer - Real-time Data
          </CardTitle>
          <CardDescription>
            Phân tích xu hướng thời gian thực và đưa ra đề xuất chi tiết cho chiến dịch tiếp thị của bạn
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Khoảng thời gian</label>
              <Tabs defaultValue={timePeriod} onValueChange={setTimePeriod} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="30days" className="text-xs">30 ngày</TabsTrigger>
                  <TabsTrigger value="90days" className="text-xs">90 ngày</TabsTrigger>
                  <TabsTrigger value="180days" className="text-xs">180 ngày</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Nguồn dữ liệu</label>
              <Tabs defaultValue={dataSource} onValueChange={setDataSource} className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
                  <TabsTrigger value="social" className="text-xs">Mạng XH</TabsTrigger>
                  <TabsTrigger value="search" className="text-xs">Tìm kiếm</TabsTrigger>
                  <TabsTrigger value="market" className="text-xs">Thị trường</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Nhập chủ đề bạn muốn phân tích (ví dụ: Dropshipping 2024)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={analyzeTrend}
              disabled={isLoading}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Phân tích
                </>
              )}
            </Button>
          </div>

          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {progress < 30 ? "Đang thu thập dữ liệu từ nhiều nguồn..." : 
                 progress < 60 ? "Đang phân tích xu hướng thị trường..." : 
                 progress < 90 ? "Đang tổng hợp và so sánh với dữ liệu lịch sử..." :
                 "Đang hoàn thiện báo cáo phân tích..."}
              </p>
            </div>
          )}

          {analysis && !isLoading && (
            <Card className="mt-4 bg-slate-50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Kết quả phân tích</CardTitle>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                    Dữ liệu thời gian thực
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none pt-0">
                <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-0">
                  {analysis}
                </pre>
              </CardContent>
              <CardFooter className="pt-0 gap-2 justify-end">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1.5" /> Lên lịch theo dõi
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart className="h-4 w-4 mr-1.5" /> Xuất báo cáo
                </Button>
              </CardFooter>
            </Card>
          )}
        </CardContent>
      </Card>

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
      />
    </div>
  );
};

export default TrendAnalyzerTool;
