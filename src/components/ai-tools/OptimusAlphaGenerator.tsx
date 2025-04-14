
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader, Sparkles, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import SocialShareWidget from '@/components/ai-tools/SocialShareWidget';

const OptimusAlphaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Vui lòng nhập nội dung để sinh');
      return;
    }

    if (!apiKey.trim()) {
      toast.error('Vui lòng nhập API key OpenRouter');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AffiliateVN Content Generator'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-opus:alpha',
          messages: [
            {
              role: 'system',
              content: 'Bạn là trợ lý AI chuyên về Affiliate Marketing cho người Việt Nam. Hãy tạo nội dung chất lượng cao, có tính thuyết phục và tối ưu cho SEO.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      setGeneratedContent(content);
      setShowApiKeyInput(false);
      
      toast.success('Nội dung đã được tạo thành công!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Lỗi khi tạo nội dung. Vui lòng kiểm tra API key và thử lại.');
    } finally {
      setIsGenerating(false);
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
          Sử dụng OpenRouter API với model Optimus Alpha để tạo nội dung tiếp thị liên kết chất lượng cao
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showApiKeyInput && (
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenRouter API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Nhập OpenRouter API key của bạn"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-gray-500">Bạn có thể lấy API key từ <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenRouter.ai</a></p>
          </div>
        )}
        
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
          disabled={isGenerating || !prompt.trim() || !apiKey.trim()}
          className="w-full"
        >
          {isGenerating ? (
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
