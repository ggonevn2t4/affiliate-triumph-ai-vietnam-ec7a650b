
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PenSquare, Copy, Check, Sparkles, AlertTriangle } from "lucide-react";
import { ApiKeyDialog } from "./ApiKeyDialog";
import { useGeminiApi } from "@/hooks/use-gemini-api";

const ContentGeneratorTool = () => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<string>("blog-post");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { generateCompletion, isLoading } = useGeminiApi();

  const contentTypeOptions = [
    { id: "blog-post", label: "Bài viết blog" },
    { id: "product-description", label: "Mô tả sản phẩm" },
    { id: "social-media", label: "Bài đăng mạng xã hội" },
    { id: "email", label: "Email marketing" },
    { id: "landing-page", label: "Nội dung trang đích" }
  ];

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập yêu cầu của bạn để tạo nội dung",
        variant: "destructive"
      });
      return;
    }

    setError(null);
    
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
      - QUAN TRỌNG: KHÔNG sử dụng ký tự ** trong bài viết
      
      Viết nội dung bằng tiếng Việt, tối ưu cho affiliate marketing.`;

      console.log("Sending request to Gemini API...");
      
      const content = await generateCompletion([
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ]);
      
      console.log("Received response:", content ? "Content received" : "No content");
      
      if (content) {
        setGeneratedContent(content);
        toast({
          title: "Nội dung đã được tạo",
          description: "Nội dung AI đã được tạo thành công",
        });
      } else {
        setError("Hệ thống không thể tạo nội dung. Vui lòng thử lại sau.");
        // Sử dụng nội dung mẫu cho trường hợp thất bại
        setFallbackContent();
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      setError("Đã xảy ra lỗi khi tạo nội dung.");
      
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại sau.",
        variant: "destructive"
      });

      // Sử dụng nội dung mẫu nếu có lỗi
      setFallbackContent();
    }
  };

  const setFallbackContent = () => {
    const demoResponses: Record<string, string> = {
      "blog-post": `5 Chiến lược Tiếp thị Liên kết Hiệu quả cho Người mới Bắt đầu\n\nTiếp thị liên kết là một cách tuyệt vời để kiếm thu nhập thụ động, nhưng làm thế nào để bắt đầu hiệu quả? Trong bài viết này, chúng ta sẽ khám phá 5 chiến lược quan trọng giúp bạn xây dựng nền tảng vững chắc trong lĩnh vực này.\n\n1. Chọn ngách phù hợp với đam mê\n\nKhi mới bắt đầu, việc chọn một lĩnh vực bạn quan tâm và có kiến thức sẽ giúp bạn duy trì động lực lâu dài. Đồng thời, hãy nghiên cứu về tiềm năng sinh lời của ngách đó trước khi đi sâu vào nó.\n\n2. Xây dựng nền tảng nội dung chất lượng\n\nBlog, kênh YouTube hoặc tài khoản mạng xã hội với nội dung giá trị là nền tảng để bạn giới thiệu sản phẩm một cách tự nhiên. Tập trung vào việc giải quyết vấn đề của độc giả thay vì chỉ bán hàng.\n\n3. Sử dụng chiến lược SEO cơ bản\n\nNghiên cứu từ khóa và tối ưu hóa nội dung của bạn để được xếp hạng cao trên các công cụ tìm kiếm. Điều này giúp tăng lưu lượng truy cập tự nhiên đến nền tảng của bạn.\n\n4. Xây dựng danh sách email\n\nEmail marketing vẫn là một trong những kênh có ROI cao nhất. Hãy tạo tài nguyên giá trị miễn phí để thu thập email và xây dựng mối quan hệ với khách hàng tiềm năng.\n\n5. Phân tích và tối ưu hóa liên tục\n\nSử dụng công cụ phân tích để theo dõi hiệu suất của các liên kết affiliate và điều chỉnh chiến lược của bạn dựa trên dữ liệu thực tế.\n\nKết hợp 5 chiến lược này sẽ giúp bạn xây dựng nền tảng tiếp thị liên kết vững chắc và sinh lời trong dài hạn.`,
      "product-description": `Máy Lọc Không Khí SmartBreeze Pro\n\n★★★★★ (4.8/5) - Dựa trên 325 đánh giá\n\n✅ Công nghệ lọc HEPA 13 lớp loại bỏ 99.97% bụi mịn PM2.5\n✅ Diệt khuẩn UV-C tiên tiến\n✅ Vận hành siêu êm, phù hợp cho phòng ngủ\n\n👉 Thiết bị lọc không khí cao cấp nhất trên thị trường hiện nay\n👉 Bảo hành chính hãng 24 tháng\n👉 Miễn phí vận chuyển toàn quốc\n\nGiá gốc: 5.990.000₫\nGiá ưu đãi: 4.790.000₫ (Giảm 20%)\n\nMua ngay hôm nay để bảo vệ sức khỏe gia đình bạn khỏi ô nhiễm không khí!`,
      "social-media": `🔥 REVIEW HOT: Tai nghe không dây SoundPods Pro - Sản phẩm đang làm mưa làm gió thị trường audio!\n\n✅ Thời lượng pin 36 giờ, gấp đôi đối thủ\n✅ Chống ồn chủ động thế hệ mới\n✅ Chất âm studio chuẩn xác\n✅ Kết nối Bluetooth 5.3 không độ trễ\n\n👉 Đừng bỏ lỡ ưu đãi GIẢM NGAY 30% chỉ trong tuần này!\n\nClick link trong bio để mua với giá ưu đãi nhất thị trường 🎧\n\n#SoundPodsProVN #AmThanhChatLuong #UuDaiHot`,
      "email": `Chào [Tên khách hàng],\n\nCảm ơn bạn đã quan tâm đến các sản phẩm chăm sóc da từ thiên nhiên của chúng tôi!\n\nChúng tôi vừa ra mắt bộ sản phẩm mới "Natural Radiance" với công thức độc quyền từ chiết xuất lô hội hữu cơ và vitamin C tinh khiết, đặc biệt phù hợp với làn da người Việt.\n\nƯu đãi đặc biệt dành riêng cho bạn:\n• Giảm 25% cho đơn hàng đầu tiên\n• Quà tặng: Mặt nạ dưỡng ẩm cao cấp (trị giá 350.000đ)\n• Miễn phí vận chuyển\n\nKhuyến mãi chỉ kéo dài 7 ngày - hãy nhanh tay đặt hàng ngay hôm nay!\n\n[BUTTON: MUA NGAY VỚI ƯU ĐÃI 25%]\n\nTrân trọng,\nĐội ngũ Chăm sóc Khách hàng`,
      "landing-page": `# Khóa Học Online "Thành Công Với Affiliate Marketing"\n\n## Bạn Muốn Tạo Thu Nhập Thụ Động Từ Affiliate Marketing?\n\nKhóa học "Thành Công Với Affiliate Marketing" sẽ giúp bạn xây dựng hệ thống kiếm tiền tự động, ngay cả khi bạn đang ngủ!\n\n### Học Viên Của Chúng Tôi Đạt Được:\n✓ Thu nhập trung bình 15-30 triệu đồng/tháng\n✓ Tự do về thời gian và địa điểm làm việc\n✓ Kỹ năng marketing online đỉnh cao\n✓ Mạng lưới đối tác rộng khắp\n\n### Nội Dung Khóa Học:\n• 8 module đào tạo chuyên sâu\n• 30+ video bài giảng HD\n• Công cụ và template độc quyền\n• Hỗ trợ 1-1 từ chuyên gia\n• Cộng đồng học viên năng động\n\n## Ưu Đãi Đặc Biệt - Chỉ Còn 5 Suất Cuối!\n~~3.990.000đ~~ CHỈ CÒN 1.990.000đ\n\n[ĐĂNG KÝ NGAY]\n\n*Cam kết hoàn tiền 100% trong 30 ngày nếu không hài lòng*`,
    };
    
    const selectedTypeContent = demoResponses[contentType] || demoResponses["blog-post"];
    setGeneratedContent(selectedTypeContent);
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
        
        <ApiKeyDialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen} />
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
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 text-sm">{error}</p>
            <p className="text-red-600 text-xs mt-1">Hệ thống sẽ hiển thị nội dung mẫu dưới đây.</p>
          </div>
        </div>
      )}
      
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
        Powered by Google Gemini API. Nội dung được tạo là duy nhất và được tối ưu hóa cho thị trường Việt Nam.
      </div>
    </div>
  );
};

export default ContentGeneratorTool;
