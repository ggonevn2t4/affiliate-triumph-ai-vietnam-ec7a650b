
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import ApiKeyDialog from "./ApiKeyDialog";

const TrendAnalyzerTool = () => {
  const [topic, setTopic] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));

  const analyzeTrend = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis(`Phân tích xu hướng cho chủ đề "${topic}":\n\n` +
                "1. Tăng trưởng ổn định trong 3 tháng qua.\n" +
                "2. Sự quan tâm tăng vọt từ giới trẻ.\n" +
                "3. Các từ khóa liên quan: [từ khóa 1], [từ khóa 2], [từ khóa 3].\n" +
                "4. Đề xuất nội dung: [ý tưởng nội dung 1], [ý tưởng nội dung 2].");
      setIsLoading(false);
    }, 2000);
  };

  const handleApiKeySave = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowApiKeyDialog(false);
    toast({
      title: "API Key đã được lưu",
      description: "Bây giờ bạn có thể sử dụng Trend Analyzer Tool",
    });
  };

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            Trend Analyzer Tool
          </CardTitle>
          <CardDescription>Nhập chủ đề bạn muốn phân tích xu hướng.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Input
              type="text"
              placeholder="Ví dụ: Affiliate Marketing 2024"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <Button onClick={analyzeTrend} disabled={isLoading}>
            {isLoading ? "Đang phân tích..." : "Phân tích"}
          </Button>
          {analysis && (
            <div className="mt-4">
              <Textarea
                className="min-h-[100px] resize-none"
                readOnly
                value={analysis}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleApiKeySave}
      />
    </div>
  );
};

export default TrendAnalyzerTool;
