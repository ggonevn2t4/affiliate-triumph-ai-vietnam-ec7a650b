
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCcw, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import OpenAI from 'openai';

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

const DEFAULT_API_KEY = "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";

const ContentGenerator = () => {
  const [productName, setProductName] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('blog');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai-api-key") || DEFAULT_API_KEY;
    return savedKey;
  });
  
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  useEffect(() => {
    // Lưu API key mặc định nếu chưa có
    if (!localStorage.getItem("openai-api-key")) {
      localStorage.setItem("openai-api-key", DEFAULT_API_KEY);
    }
  }, []);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };
  
  const handleGenerate = async () => {
    if (!productName) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên sản phẩm để tạo nội dung",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent('');
    
    try {
      const formatName = contentFormats.find(format => format.id === selectedFormat)?.name || selectedFormat;
      
      const prompt = `Bạn là một chuyên gia về Affiliate Marketing tại Việt Nam.
      Hãy tạo nội dung "${formatName}" cho sản phẩm có tên: "${productName}".
      
      Hãy tạo nội dung phù hợp với định dạng, tối ưu SEO, và hấp dẫn để tăng tỷ lệ chuyển đổi.
      Viết bằng tiếng Việt và phù hợp với thị trường Việt Nam.
      
      QUAN TRỌNG: KHÔNG sử dụng ký tự ** trong nội dung.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a Vietnamese affiliate marketing expert. Create compelling content optimized for the Vietnamese market. Do not use asterisks (**) in your content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const content = response.choices[0]?.message?.content;
      
      if (content) {
        setGeneratedContent(cleanAsterisks(content));
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
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
      setGeneratedContent(cleanAsterisks(content));
    } finally {
      setIsGenerating(false);
    }
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
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Tạo nội dung bằng AI</h3>
        <div className="flex items-center text-brand-purple text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>AI content creator</span>
        </div>
      </div>
      
      <div className="grid gap-4 mb-6">
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
        
        <Button 
          onClick={handleGenerate}
          disabled={!productName || isGenerating}
          className="btn-gradient"
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
      </div>
      
      {generatedContent && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg">
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
            </div>
          </div>
          <div className="p-4 text-sm whitespace-pre-line max-h-80 overflow-y-auto">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
