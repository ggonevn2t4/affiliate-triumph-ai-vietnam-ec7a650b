
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { TrendingUp, Search, LineChart, RefreshCcw } from "lucide-react";
import ApiKeyDialog from "./ApiKeyDialog";
import { useApiKey } from "@/hooks/use-api-key";
import { Progress } from "@/components/ui/progress";

const TrendAnalyzerTool = () => {
  const [topic, setTopic] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { apiKey, isConfigured } = useApiKey();

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
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Simulate API call with enhanced analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setProgress(100);

      setAnalysis(
        `📊 Phân tích xu hướng cho chủ đề "${topic}":

🔍 Tổng quan thị trường:
• Mức độ quan tâm: Tăng 45% trong 3 tháng qua
• Xu hướng tìm kiếm: Tăng mạnh vào cuối tuần
• Độ phổ biến: 8.5/10

📈 Phân tích chi tiết:
1. Phân khúc độ tuổi quan tâm nhiều nhất:
   • Gen Z (18-24): 35%
   • Millennials (25-34): 45%
   • Gen X (35-44): 20%

2. Từ khóa liên quan hot nhất:
   • ${topic} review
   • ${topic} là gì
   • Cách bắt đầu ${topic}
   • ${topic} cho người mới

3. Kênh marketing hiệu quả:
   • TikTok: 40% tương tác
   • Facebook: 35% tương tác
   • YouTube: 25% tương tác

💡 Đề xuất nội dung:
1. Tạo video ngắn giải thích ${topic} cho người mới
2. Viết bài review chi tiết về ${topic}
3. Chia sẻ case study thành công về ${topic}
4. Tạo series hướng dẫn từng bước về ${topic}`
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
            AI Trend Analyzer
          </CardTitle>
          <CardDescription>
            Phân tích xu hướng và đưa ra đề xuất cho chiến dịch tiếp thị của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                Đang phân tích xu hướng và tổng hợp dữ liệu...
              </p>
            </div>
          )}

          {analysis && !isLoading && (
            <Card className="mt-4 bg-slate-50">
              <CardContent className="prose prose-sm max-w-none pt-4">
                <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-0">
                  {analysis}
                </pre>
              </CardContent>
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
