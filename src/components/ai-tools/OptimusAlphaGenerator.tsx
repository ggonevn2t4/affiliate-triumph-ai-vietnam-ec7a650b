import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader, Sparkles, Copy, Check, Wand2, History, Save, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Clock, RotateCcw, FileText } from 'lucide-react';
import { toast } from 'sonner';
import SocialShareWidget from '@/components/ai-tools/SocialShareWidget';
import useContentGeneration from '@/hooks/use-content-generation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const OptimusAlphaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [contentType, setContentType] = useState('blog');
  const [contentHistory, setContentHistory] = useState<Array<{id: string, prompt: string, content: string, type: string, date: Date}>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { isLoading, generateCompletion } = useContentGeneration();

  const templates = {
    blog: [
      { id: 'blog-review', name: 'Bài đánh giá sản phẩm', 
        template: 'Viết bài đánh giá chi tiết về [Sản phẩm] bao gồm ưu điểm, nhược điểm, so sánh với đối thủ cạnh tranh và link affiliate.' },
      { id: 'blog-tutorial', name: 'Hướng dẫn sử dụng', 
        template: 'Viết bài hướng dẫn chi tiết cách sử dụng [Sản phẩm] với hình ảnh minh họa và link affiliate.' }
    ],
    product: [
      { id: 'product-features', name: 'Đặc điểm nổi bật', 
        template: 'Liệt kê 5 đặc điểm nổi bật của [Sản phẩm] kèm lợi ích cụ thể cho người dùng và link mua hàng.' },
      { id: 'product-comparison', name: 'So sánh sản phẩm', 
        template: 'So sánh chi tiết giữa [Sản phẩm A] và [Sản phẩm B] với bảng so sánh đặc điểm và giá cả kèm link affiliate.' }
    ],
    social: [
      { id: 'social-promotion', name: 'Bài đăng quảng cáo', 
        template: 'Viết bài đăng quảng cáo ngắn gọn về [Sản phẩm] kèm theo call-to-action và link affiliate ẩn trong bitly.' },
      { id: 'social-testimonial', name: 'Chia sẻ trải nghiệm', 
        template: 'Viết bài chia sẻ trải nghiệm cá nhân với [Sản phẩm] theo format: Vấn đề - Giải pháp - Kết quả, kèm link affiliate.' }
    ],
    email: [
      { id: 'email-newsletter', name: 'Bản tin email', 
        template: 'Viết bản tin email giới thiệu [Sản phẩm] với tiêu đề thu hút, nội dung ngắn gọn và link mua hàng.' },
      { id: 'email-promotion', name: 'Email khuyến mãi', 
        template: 'Viết email thông báo khuyến mãi cho [Sản phẩm] với thông tin về giảm giá, thời hạn và call-to-action rõ ràng.' }
    ]
  };

  const contentTypes = [
    { id: 'blog', label: 'Bài viết blog' },
    { id: 'product', label: 'Mô tả sản phẩm' },
    { id: 'social', label: 'Nội dung mạng xã hội' },
    { id: 'email', label: 'Email marketing' }
  ];

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
      toast.error('Vui lòng nhập nội dung để sinh');
      return;
    }

    try {
      const selectedType = contentTypes.find(type => type.id === contentType)?.label || 'Bài viết';

      const content = await generateCompletion([
        {
          role: 'system',
          content: `Bạn là trợ lý AI chuyên về Affiliate Marketing cho người Việt Nam. Hãy tạo ${selectedType} chất lượng cao, có tính thuyết phục và tối ưu cho SEO theo yêu cầu được cung cấp.`
        },
        {
          role: 'user',
          content: prompt
        }
      ]);
      
      if (content) {
        setGeneratedContent(content);
        setEditedContent(content);
        
        const newHistoryItem = {
          id: Date.now().toString(),
          prompt: prompt,
          content: content,
          type: contentType,
          date: new Date()
        };
        
        setContentHistory(prev => [newHistoryItem, ...prev]);
        
        toast.success('Nội dung đã được tạo thành công!');
      } else {
        toast.error('Không thể tạo nội dung. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Lỗi khi tạo nội dung. Vui lòng thử lại sau.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    setIsCopied(true);
    toast.success('Đã sao chép nội dung vào clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLoadHistoryItem = (item: typeof contentHistory[0]) => {
    setPrompt(item.prompt);
    setGeneratedContent(item.content);
    setEditedContent(item.content);
    setContentType(item.type);
    setShowHistory(false);
    toast.success('Đã tải nội dung từ lịch sử');
  };

  const handleLoadTemplate = (templateId: string) => {
    const templateData = templates[contentType as keyof typeof templates]?.find(t => t.id === templateId);
    if (templateData) {
      setPrompt(templateData.template);
      setSelectedTemplate(templateId);
    }
  };

  const applyFormatting = (formatting: string) => {
    let formattedContent = editedContent;
    
    switch(formatting) {
      case 'bold':
        formattedContent = `**${editedContent}**`;
        break;
      case 'italic':
        formattedContent = `*${editedContent}*`;
        break;
      case 'underline':
        formattedContent = `<u>${editedContent}</u>`;
        break;
      case 'list':
        formattedContent = editedContent.split('\n').map(line => `• ${line}`).join('\n');
        break;
      case 'ordered-list':
        formattedContent = editedContent.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
        break;
      default:
        break;
    }
    
    setEditedContent(formattedContent);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            Công cụ tạo nội dung AI
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Label htmlFor="content-type">Loại nội dung</Label>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map(type => (
                <Button
                  key={type.id}
                  type="button"
                  variant={contentType === type.id ? "default" : "outline"}
                  onClick={() => {
                    setContentType(type.id);
                    setSelectedTemplate('');
                  }}
                  className="h-9"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={showHistory} onOpenChange={setShowHistory}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setShowHistory(true)}>
                  <History className="h-4 w-4 mr-2" />
                  Lịch sử
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Lịch sử nội dung</DialogTitle>
                  <DialogDescription>
                    Xem và tải lại các nội dung đã tạo trước đây
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  {contentHistory.length > 0 ? (
                    contentHistory.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base font-medium">
                              {item.prompt.length > 50 ? `${item.prompt.substring(0, 50)}...` : item.prompt}
                            </CardTitle>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(item.date)}
                            </span>
                          </div>
                          <CardDescription>
                            {contentTypes.find(type => type.id === item.type)?.label}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="bg-gray-50 rounded p-2 text-sm line-clamp-3">
                            {item.content}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="ml-auto"
                            onClick={() => handleLoadHistoryItem(item)}
                          >
                            <RotateCcw className="h-3 w-3 mr-2" />
                            Tải lại
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Chưa có nội dung nào được tạo
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template">Mẫu nội dung</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {templates[contentType as keyof typeof templates]?.map(template => (
              <Button
                key={template.id}
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className="justify-start h-auto py-2 px-3"
                onClick={() => handleLoadTemplate(template.id)}
              >
                <FileText className="h-4 w-4 mr-2 shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{template.template}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

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
              <div className="flex space-x-2">
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
            </div>
            
            <div className="flex items-center space-x-1 p-1 bg-gray-50 rounded-t-md border border-b-0">
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('bold')}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('italic')}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('underline')}>
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('list')}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('ordered-list')}>
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[300px] rounded-t-none font-mono text-sm"
            />
            
            <div className="mt-6">
              <SocialShareWidget content={editedContent} title="Nội dung Affiliate Marketing từ Optimus Alpha" />
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
