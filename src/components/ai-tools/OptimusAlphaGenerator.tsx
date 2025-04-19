import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, History } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import useContentGeneration from '@/hooks/use-content-generation';
import HistoryDialog from './components/HistoryDialog';
import PromptForm from './components/PromptForm';
import ContentEditor from './components/ContentEditor';
import type { ContentFormat } from './types/content';
import type { ToneOption } from './types/content';

const contentFormats: ContentFormat[] = [
  { id: 'blog', name: 'Bài viết blog' },
  { id: 'social', name: 'Mạng xã hội' },
  { id: 'email', name: 'Email marketing' },
  { id: 'product', name: 'Mô tả sản phẩm' },
];

const marketingChannels: ContentFormat[] = [
  { id: 'general', name: 'Tổng quát' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'zalo', name: 'Zalo' },
];

const toneOptions: ToneOption[] = [
  { id: 'professional', name: 'Chuyên nghiệp', description: 'Giọng điệu trang trọng và chính thống' },
  { id: 'casual', name: 'Thân thiện', description: 'Giọng điệu gần gũi và dễ tiếp cận' },
  { id: 'enthusiastic', name: 'Nhiệt tình', description: 'Giọng điệu năng động và hào hứng' },
  { id: 'persuasive', name: 'Thuyết phục', description: 'Giọng điệu có tính thuyết phục cao' },
];

const OptimusAlphaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [contentType, setContentType] = useState('blog');
  const [contentHistory, setContentHistory] = useState<Array<{id: string, prompt: string, content: string, type: string, date: Date}>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const { isLoading, generateCompletion } = useContentGeneration();
  const [selectedTone, setSelectedTone] = useState('professional');
  const [wordLimit, setWordLimit] = useState(300);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const mockHistory = [
          {
            id: '1',
            prompt: 'Viết bài review về iPhone 15 Pro',
            content: 'iPhone 15 Pro là một sản phẩm đột phá với chip A17 Pro...',
            type: 'blog',
            date: new Date(2023, 3, 10)
          },
          {
            id: '2',
            prompt: 'Viết email khuyến mãi Black Friday',
            content: 'SALE SỐC BLACK FRIDAY - Giảm giá đến 50% cho tất cả sản phẩm...',
            type: 'email',
            date: new Date(2023, 3, 5)
          }
        ];
        setContentHistory(mockHistory);
      } catch (error) {
        console.error('Error fetching content history:', error);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung để sinh",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedType = contentFormats.find(type => type.id === contentType)?.name || 'Bài viết';
      const tone = toneOptions.find(t => t.id === selectedTone)?.name || 'Chuyên nghiệp';
      const content = await generateCompletion([
        {
          role: 'system',
          content: `Bạn là trợ lý AI chuyên về Affiliate Marketing cho người Việt Nam. 
          Hãy tạo ${selectedType} chất lượng cao với giọng điệu ${tone}, 
          có tính thuyết phục và tối ưu cho SEO. 
          Giới hạn độ dài khoảng ${wordLimit} từ.`
        },
        {
          role: 'user',
          content: prompt
        }
      ]);
      
      if (content) {
        setGeneratedContent(content);
        
        const newHistoryItem = {
          id: Date.now().toString(),
          prompt: prompt,
          content: content,
          type: contentType,
          date: new Date()
        };
        
        setContentHistory(prev => [newHistoryItem, ...prev]);
        
        toast({
          title: "Thành công",
          description: "Nội dung đã được tạo thành công!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Lỗi",
        description: "Lỗi khi tạo nội dung. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    toast({
      title: "Thành công",
      description: "Đã sao chép nội dung vào clipboard",
      variant: "default"
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareSocial = (platform: string) => {
    if (!generatedContent) return;
    
    let shareUrl = '';
    const encodedText = encodeURIComponent(generatedContent.substring(0, 280));
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    toast({
      title: "Thành công", 
      description: `Nội dung đã được chia sẻ lên ${platform}`,
      variant: "default"
    });
  };

  const handleLoadHistoryItem = (item: typeof contentHistory[0]) => {
    setPrompt(item.prompt);
    setGeneratedContent(item.content);
    setContentType(item.type);
    setShowHistory(false);
    toast({
      title: "Thành công",
      description: "Đã tải nội dung từ lịch sử",
      variant: "default"
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            Công cụ tạo nội dung AI
          </CardTitle>
          <Button variant="outline" onClick={() => setShowHistory(true)}>
            <History className="h-4 w-4 mr-2" />
            Lịch sử
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <PromptForm
          productName={prompt}
          onProductNameChange={setPrompt}
          selectedFormat={contentType}
          onFormatChange={setContentType}
          selectedChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          selectedTone={selectedTone}
          onToneChange={setSelectedTone}
          wordLimit={wordLimit}
          onWordLimitChange={setWordLimit}
          onGenerate={handleGenerate}
          isGenerating={isLoading}
          contentFormats={contentFormats}
          marketingChannels={marketingChannels}
        />
        
        {generatedContent && (
          <ContentEditor
            content={generatedContent}
            onRegenerate={handleGenerate}
            onCopy={handleCopy}
            isCopied={isCopied}
            onShare={handleShareSocial}
            selectedChannel={selectedChannel}
            channelName={marketingChannels.find(c => c.id === selectedChannel)?.name || 'Tổng quát'}
          />
        )}

        <HistoryDialog
          open={showHistory}
          onOpenChange={setShowHistory}
          contentHistory={contentHistory}
          onLoadHistoryItem={handleLoadHistoryItem}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};

export default OptimusAlphaGenerator;
