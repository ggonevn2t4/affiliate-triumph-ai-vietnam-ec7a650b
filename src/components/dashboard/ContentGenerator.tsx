import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCcw, Copy, Check, Share2, Facebook, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useContentGeneration } from '@/hooks/use-content-generation';

interface ContentFormat {
  id: string;
  name: string;
}

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

const ContentGenerator = () => {
  const [productName, setProductName] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('blog');
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { generateCompletion, isLoading: isGenerating } = useContentGeneration();

  const handleGenerate = async () => {
    if (!productName) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên sản phẩm để tạo nội dung",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratedContent('');
    setError(null);
    
    try {
      const formatName = contentFormats.find(format => format.id === selectedFormat)?.name || selectedFormat;
      const channelName = marketingChannels.find(channel => channel.id === selectedChannel)?.name || 'Tổng quát';
      
      console.log("Bắt đầu tạo nội dung cho:", productName, "với định dạng:", formatName, "kênh:", channelName);
      
      const prompt = `Bạn là một chuyên gia về Affiliate Marketing tại Việt Nam.
      Hãy tạo nội dung "${formatName}" cho sản phẩm có tên: "${productName}".
      
      Nội dung cần được tối ưu hóa cho kênh marketing: ${channelName}.
      
      Hãy tạo nội dung phù hợp với định dạng, tối ưu SEO, và hấp dẫn để tăng tỷ lệ chuyển đổi.
      Viết bằng tiếng Việt và phù hợp với thị trường Việt Nam.
      
      QUAN TRỌNG: KHÔNG sử dụng ký tự ** trong nội dung.`;

      const content = await generateCompletion([
        {
          role: "system",
          content: "You are a Vietnamese affiliate marketing expert. Create compelling content optimized for the Vietnamese market. Do not use asterisks (**) in your content."
        },
        {
          role: "user",
          content: prompt
        }
      ]);
      
      console.log("Nhận được phản hồi:", content ? "Có nội dung" : "Không có nội dung");
      
      if (content) {
        setGeneratedContent(content);
      } else {
        setError("Không thể tạo nội dung cho sản phẩm này. Vui lòng thử lại sau.");
        setFallbackContent();
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Đã xảy ra lỗi khi tạo nội dung. Đang hiển thị nội dung mẫu.");
      
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      setFallbackContent();
    }
  };
  
  const setFallbackContent = () => {
    const formatTexts = {
      blog: `# Đánh giá chi tiết về ${productName}: Có đáng để bạn mua không?

Nếu bạn đang tìm kiếm một ${productName} chất lượng cao, bạn đã đến đúng nơi. Trong bài viết này, chúng tôi sẽ phân tích chi tiết về sản phẩm này và giúp bạn quyết định xem nó có phải là lựa chọn tốt cho nhu cầu của bạn hay không.

## Những ưu điểm nổi bật của ${productName}

- Thiết kế hiện đại và bền bỉ
- Hiệu suất vượt trội so với các sản phẩm cùng phân khúc
- Tiết kiệm chi phí dài hạn
- Được nhiều chuyên gia đánh giá cao

## Ai nên mua ${productName}?

Sản phẩm này đặc biệt phù hợp với những người đang tìm kiếm giải pháp hiệu quả mà không cần phải chi quá nhiều tiền...`,
      
      social: `🔥 REVIEW HOT: ${productName} - Sản phẩm đang làm mưa làm gió trên thị trường!

✅ Thiết kế sang trọng
✅ Hiệu suất vượt trội
✅ Giá cực kỳ hợp lý

👉 Đừng bỏ lỡ cơ hội sở hữu ${productName} với ưu đãi đặc biệt khi mua qua link trong bio!

#review #musthave #deal`,
      
      email: `Chào bạn,

Tôi vừa khám phá ra một sản phẩm tuyệt vời mà tôi nghĩ bạn sẽ thích - ${productName}.

Điều làm tôi ấn tượng nhất về ${productName} là [đặc điểm nổi bật]. Nó giải quyết vấn đề [vấn đề phổ biến] một cách hiệu quả và tiết kiệm.

Hiện tại đang có chương trình giảm giá 15% cho sản phẩm này. Bạn có thể tìm hiểu thêm tại đây: [Link]

Trân trọng,
[Tên của bạn]`,
      
      product: `${productName}

★★★★★ (4.9/5) - Dựa trên 253 đánh giá

✅ [Đặc điểm nổi bật 1]
✅ [Đặc điểm nổi bật 2]
✅ [Đặc điểm nổi bật 3]

👉 Sản phẩm hot nhất phân khúc [loại sản phẩm] hiện nay
👉 Bảo hành chính hãng 12 tháng
👉 Giao hàng miễn phí toàn quốc

Giá gốc: ₫XXX,XXX
Giá ưu đãi: ₫XXX,XXX (Giảm 20%)

Mua ngay kẻo hết!`,
    };
    
    const content = formatTexts[selectedFormat as keyof typeof formatTexts];
    setGeneratedContent(content);
  };
  
  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({
      title: "Đã sao chép",
      description: "Nội dung đã được sao chép vào clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleShareSocial = (platform: string) => {
    if (!generatedContent) return;
    
    let shareUrl = '';
    const encodedText = encodeURIComponent(generatedContent.substring(0, 280)); // Twitter character limit
    
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
      title: "Chia sẻ thành công",
      description: `Nội dung đã được chia sẻ lên ${platform}`,
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Tạo nội dung bằng AI</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-brand-purple text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>AI content creator</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="basic" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Cơ bản</TabsTrigger>
          <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm để tạo nội dung"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Định dạng nội dung</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {contentFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`px-3 py-2 border rounded-md text-sm transition-all
                    ${selectedFormat === format.id
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {format.name}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tối ưu cho kênh marketing</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {marketingChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`px-3 py-2 border rounded-md text-sm transition-all
                    ${selectedChannel === channel.id
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {channel.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
            <p className="text-sm text-blue-800">
              Tính năng nâng cao giúp tối ưu nội dung cho từng kênh marketing cụ thể, bao gồm độ dài, giọng điệu và cấu trúc phù hợp nhất.
            </p>
          </div>
        </TabsContent>
      </Tabs>
        
      <Button 
        onClick={handleGenerate}
        disabled={!productName || isGenerating}
        className="btn-gradient w-full"
      >
        {isGenerating ? (
          <>
            <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
            Đang tạo...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Tạo nội dung
          </>
        )}
      </Button>
      
      {error && (
        <div className="mt-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <div>
            <p className="text-amber-800 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {generatedContent && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <span className="text-sm font-medium">Nội dung đã tạo</span>
            <div className="flex space-x-2">
              <button 
                onClick={handleRegenerate} 
                className="p-1 rounded hover:bg-gray-200"
                title="Tạo lại"
              >
                <RefreshCcw className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={handleCopy} 
                className="p-1 rounded hover:bg-gray-200"
                title="Sao chép"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
              <button 
                onClick={() => handleShareSocial('facebook')} 
                className="p-1 rounded hover:bg-gray-200"
                title="Chia sẻ Facebook"
              >
                <Facebook className="w-4 h-4 text-[#4267B2]" />
              </button>
              <button 
                onClick={() => handleShareSocial('twitter')} 
                className="p-1 rounded hover:bg-gray-200"
                title="Chia sẻ Twitter"
              >
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              </button>
            </div>
          </div>
          <div className="p-4 text-sm whitespace-pre-line max-h-80 overflow-y-auto">
            {generatedContent}
          </div>
          <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Tối ưu cho: {marketingChannels.find(c => c.id === selectedChannel)?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
              >
                <Share2 className="h-3 w-3 mr-1" /> Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
