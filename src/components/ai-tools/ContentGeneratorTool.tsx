
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PenSquare, Copy, Check, Sparkles, Settings } from "lucide-react";
import OpenAI from "openai";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContentGeneratorTool = () => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<string>("blog-post");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai-api-key");
    return savedKey || "";
  });
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const openai = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : null;

  const contentTypeOptions = [
    { id: "blog-post", label: "Bài viết blog" },
    { id: "product-description", label: "Mô tả sản phẩm" },
    { id: "social-media", label: "Bài đăng mạng xã hội" },
    { id: "email", label: "Email marketing" },
    { id: "landing-page", label: "Nội dung trang đích" }
  ];

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai-api-key", key);
    setIsApiKeyDialogOpen(false);
    toast({
      title: "Cập nhật API Key",
      description: "API key của bạn đã được cập nhật thành công."
    });
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập yêu cầu của bạn để tạo nội dung",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey) {
      setIsApiKeyDialogOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const contentTypeLabel = contentTypeOptions.find(option => option.id === contentType)?.label || contentType;
      
      const systemPrompt = `Bạn là một chuyên gia về Affiliate Marketing tại thị trường Việt Nam. 
      Hãy tạo một ${contentTypeLabel} dựa trên yêu cầu sau: "${prompt}".
      
      Hãy đảm bảo nội dung:
      - Phù hợp với định dạng ${contentTypeLabel}
      - Tối ưu hóa SEO với từ khóa phù hợp
      - Phù hợp với văn hóa và thị trường Việt Nam
      - Có tính thuyết phục cao và tạo niềm tin
      - Có giọng điệu phù hợp với đối tượng mục tiêu
      
      Viết nội dung bằng tiếng Việt, tối ưu cho affiliate marketing.`;

      const response = await openai!.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system" as const,
            content: systemPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      });

      const content = response.choices[0]?.message?.content;
      
      if (content) {
        setGeneratedContent(content);
        toast({
          title: "Nội dung đã được tạo",
          description: "Nội dung AI đã được tạo thành công",
        });
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      
      // Check for API key errors
      if (error.status === 401 || (error.error && error.error.type === "invalid_request_error")) {
        toast({
          title: "Lỗi API key",
          description: "API key không hợp lệ hoặc đã hết hạn. Vui lòng cập nhật API key của bạn.",
          variant: "destructive"
        });
        setIsApiKeyDialogOpen(true);
      } else {
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }

      // Use a fallback response
      const demoResponses: Record<string, string> = {
        "blog-post": `# 5 Chiến lược Tiếp thị Liên kết Hiệu quả cho Người mới Bắt đầu\n\nTiếp thị liên kết là một cách tuyệt vời để kiếm thu nhập thụ động, nhưng làm thế nào để bắt đầu hiệu quả? Trong bài viết này, chúng ta sẽ khám phá 5 chiến lược quan trọng giúp bạn xây dựng nền tảng vững chắc trong lĩnh vực này.\n\n## 1. Chọn ngách phù hợp với đam mê\n\nKhi mới bắt đầu, việc chọn một lĩnh vực bạn quan tâm và có kiến thức sẽ giúp bạn duy trì động lực lâu dài. Đồng thời, hãy nghiên cứu về tiềm năng sinh lời của ngách đó trước khi đi sâu vào nó.\n\n## 2. Xây dựng nền tảng nội dung chất lượng\n\nBlog, kênh YouTube hoặc tài khoản mạng xã hội với nội dung giá trị là nền tảng để bạn giới thiệu sản phẩm một cách tự nhiên. Tập trung vào việc giải quyết vấn đề của độc giả thay vì chỉ bán hàng.\n\n## 3. Sử dụng chiến lược SEO cơ bản\n\nNghiên cứu từ khóa và tối ưu hóa nội dung của bạn để được xếp hạng cao trên các công cụ tìm kiếm. Điều này giúp tăng lưu lượng truy cập tự nhiên đến nền tảng của bạn.\n\n## 4. Xây dựng danh sách email\n\nEmail marketing vẫn là một trong những kênh có ROI cao nhất. Hãy tạo tài nguyên giá trị miễn phí để thu thập email và xây dựng mối quan hệ với khách hàng tiềm năng.\n\n## 5. Phân tích và tối ưu hóa liên tục\n\nSử dụng công cụ phân tích để theo dõi hiệu suất của các liên kết affiliate và điều chỉnh chiến lược của bạn dựa trên dữ liệu thực tế.\n\nKết hợp 5 chiến lược này sẽ giúp bạn xây dựng nền tảng tiếp thị liên kết vững chắc và sinh lời trong dài hạn.`,
      };
      
      const selectedTypeContent = demoResponses[contentType] || demoResponses["blog-post"];
      setGeneratedContent(selectedTypeContent);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      toast({
        title: "Đã sao chép",
        description: "Nội dung đã được sao chép vào clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <PenSquare className="h-5 w-5 text-brand-blue" />
          <h2>AI Content Creator</h2>
        </div>
        
        <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Cài đặt API
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>OpenAI API Key</DialogTitle>
              <DialogDescription>
                Nhập API key OpenAI của bạn để sử dụng dịch vụ AI. API key sẽ được lưu trên trình duyệt của bạn.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="api-key" className="col-span-4">
                  API Key
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  className="col-span-4"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => saveApiKey(apiKey)}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại nội dung</label>
          <div className="flex flex-wrap gap-2">
            {contentTypeOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setContentType(option.id)}
                className={`px-4 py-2 rounded-md text-sm ${
                  contentType === option.id
                    ? "bg-brand-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yêu cầu của bạn
          </label>
          <Textarea
            placeholder="Mô tả chi tiết nội dung bạn muốn tạo. Ví dụ: Tôi cần một bài viết blog về cách bắt đầu với Affiliate Marketing ở Việt Nam, tập trung vào các chiến lược cơ bản cho người mới..."
            className="min-h-[120px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleGenerateContent}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Đang tạo nội dung...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Tạo nội dung
            </>
          )}
        </Button>
      </div>
      
      {generatedContent && (
        <div className="mt-8 border rounded-lg">
          <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
            <h3 className="font-medium">Nội dung đã tạo</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyContent}
            >
              {copied ? (
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
          <div className="p-4 whitespace-pre-line">
            {generatedContent}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        Powered by OpenAI GPT-4o-mini API. Nội dung được tạo là duy nhất và được tối ưu hóa cho thị trường Việt Nam.
      </div>
    </div>
  );
};

export default ContentGeneratorTool;
