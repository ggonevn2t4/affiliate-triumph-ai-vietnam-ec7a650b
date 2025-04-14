
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader, Sparkles, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import SocialShareWidget from '@/components/ai-tools/SocialShareWidget';
import useGeminiApi from '@/hooks/use-gemini-api';

const OptimusAlphaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { isLoading, generateCompletion, isApiConfigured } = useGeminiApi();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Vui lòng nhập nội dung để sinh');
      return;
    }

    if (!isApiConfigured) {
      toast.error('API chưa được cấu hình. Vui lòng liên hệ quản trị viên.');
      return;
    }

    try {
      const content = await generateCompletion([
        {
          role: 'system',
          content: 'Bạn là trợ lý AI chuyên về Affiliate Marketing cho người Việt Nam. Hãy tạo nội dung chất lượng cao, có tính thuyết phục và tối ưu cho SEO.'
        },
        {
          role: 'user',
          content: prompt
        }
      ], 'anthropic/claude-3-opus:beta');
      
      if (content) {
        setGeneratedContent(content);
        toast.success('Nội dung đã được tạo thành công!');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Lỗi khi tạo nội dung. Vui lòng thử lại sau.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    toast.success('Đã sao chép nội dung vào clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
          Optimus Alpha - Sinh nội dung Affiliate
        </CardTitle>
        <CardDescription>
          Sử dụng model Claude 3 Opus để tạo nội dung tiếp thị liên kết chất lượng cao
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Yêu cầu</Label>
          <Textarea
            id="prompt"
            placeholder="Ví dụ: Viết bài review về sản phẩm X cho blog affiliate marketing"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {generatedContent && (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="generated-content">Nội dung đã tạo</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" /> Sao chép
                  </>
                )}
              </Button>
            </div>
            <div className="bg-gray-50 rounded-md p-4 whitespace-pre-wrap text-sm">
              {generatedContent}
            </div>
            
            <div className="mt-6">
              <SocialShareWidget content={generatedContent} title="Nội dung Affiliate Marketing từ Optimus Alpha" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Đang tạo nội dung...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Tạo nội dung
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OptimusAlphaGenerator;
