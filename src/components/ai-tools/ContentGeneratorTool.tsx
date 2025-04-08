
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PenSquare, Copy, Check, Sparkles } from "lucide-react";

const ContentGeneratorTool = () => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<string>("blog-post");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

    setIsLoading(true);
    
    // In a real application, this would call the Gemini API
    // For this demo, we'll simulate a response
    setTimeout(() => {
      const demoResponses: Record<string, string> = {
        "blog-post": `# 5 Chiến lược Tiếp thị Liên kết Hiệu quả cho Người mới Bắt đầu\n\nTiếp thị liên kết là một cách tuyệt vời để kiếm thu nhập thụ động, nhưng làm thế nào để bắt đầu hiệu quả? Trong bài viết này, chúng ta sẽ khám phá 5 chiến lược quan trọng giúp bạn xây dựng nền tảng vững chắc trong lĩnh vực này.\n\n## 1. Chọn ngách phù hợp với đam mê\n\nKhi mới bắt đầu, việc chọn một lĩnh vực bạn quan tâm và có kiến thức sẽ giúp bạn duy trì động lực lâu dài. Đồng thời, hãy nghiên cứu về tiềm năng sinh lời của ngách đó trước khi đi sâu vào nó.\n\n## 2. Xây dựng nền tảng nội dung chất lượng\n\nBlog, kênh YouTube hoặc tài khoản mạng xã hội với nội dung giá trị là nền tảng để bạn giới thiệu sản phẩm một cách tự nhiên. Tập trung vào việc giải quyết vấn đề của độc giả thay vì chỉ bán hàng.\n\n## 3. Sử dụng chiến lược SEO cơ bản\n\nNghiên cứu từ khóa và tối ưu hóa nội dung của bạn để được xếp hạng cao trên các công cụ tìm kiếm. Điều này giúp tăng lưu lượng truy cập tự nhiên đến nền tảng của bạn.\n\n## 4. Xây dựng danh sách email\n\nEmail marketing vẫn là một trong những kênh có ROI cao nhất. Hãy tạo tài nguyên giá trị miễn phí để thu thập email và xây dựng mối quan hệ với khách hàng tiềm năng.\n\n## 5. Phân tích và tối ưu hóa liên tục\n\nSử dụng công cụ phân tích để theo dõi hiệu suất của các liên kết affiliate và điều chỉnh chiến lược của bạn dựa trên dữ liệu thực tế.\n\nKết hợp 5 chiến lược này sẽ giúp bạn xây dựng nền tảng tiếp thị liên kết vững chắc và sinh lời trong dài hạn.`,
        "product-description": `**Bộ Công Cụ Affiliate Pro: Giải pháp toàn diện cho Affiliate Marketer**\n\nBạn đã sẵn sàng đưa chiến dịch tiếp thị liên kết của mình lên tầm cao mới? Bộ Công Cụ Affiliate Pro là người bạn đồng hành hoàn hảo trong hành trình này!\n\n**Tính năng nổi bật:**\n\n✅ **Bảng điều khiển trực quan**: Theo dõi hiệu suất thời gian thực với giao diện dễ sử dụng\n\n✅ **Công cụ tạo nội dung AI**: Tạo bài viết blog, mô tả sản phẩm và bài đăng mạng xã hội chỉ trong vài giây\n\n✅ **Phân tích đối thủ cạnh tranh**: Hiểu chiến lược của đối thủ và tìm cơ hội chưa khai thác\n\n✅ **Bộ tạo liên kết thông minh**: Tạo và quản lý các liên kết rút gọn với khả năng theo dõi nâng cao\n\n✅ **Báo cáo chi tiết**: Hiểu rõ nguồn lưu lượng truy cập và hành vi khách hàng\n\nĐược thiết kế đặc biệt cho thị trường Việt Nam, Bộ Công Cụ Affiliate Pro phù hợp với mọi cấp độ kinh nghiệm - từ người mới bắt đầu đến chuyên gia.\n\nĐừng để các cơ hội tiếp thị liên kết trôi qua! Nâng cấp lên Bộ Công Cụ Affiliate Pro ngay hôm nay và chứng kiến doanh thu của bạn tăng lên!`,
        "social-media": `📈 **TIẾT LỘ: 3 Bí Quyết Tăng Doanh Thu Affiliate Marketing Tôi Ước Đã Biết Khi Mới Bắt Đầu** 📈\n\nNăm ngoái, tôi kiếm được 0đ từ tiếp thị liên kết. Năm nay? Hơn 50 triệu/tháng! 🚀\n\nĐây là 3 thay đổi lớn nhất:\n\n1️⃣ NGỪNG quảng bá mọi sản phẩm! Tập trung vào 2-3 sản phẩm tôi THỰC SỰ sử dụng và yêu thích → Tăng tỷ lệ chuyển đổi x3\n\n2️⃣ Tạo nội dung GIẢI QUYẾT VẤN ĐỀ trước, giới thiệu sản phẩm sau → Xây dựng niềm tin và uy tín\n\n3️⃣ Sử dụng công cụ phân tích để theo dõi ĐÚNG từ khóa và kênh mang lại doanh thu → Tập trung vào những gì hiệu quả\n\nBạn đã thử chiến lược nào trong số này chưa? Chia sẻ kết quả của bạn trong phần bình luận! 👇\n\n#AffiliateMarketing #TiếpThịLiênKết #KiếmTiềnOnline #MarketingTips`,
        "email": `Chủ đề: Khám phá bí quyết tăng doanh thu Affiliate Marketing của bạn lên 200%\n\nXin chào [Tên],\n\nTôi hy vọng email này tìm thấy bạn trong tâm trạng tuyệt vời!\n\nBạn có đang gặp khó khăn trong việc tăng doanh thu từ các chiến dịch tiếp thị liên kết của mình không? Bạn không đơn độc. Nhiều Affiliate Marketer bỏ cuộc quá sớm vì họ không biết những chiến lược đã được chứng minh mà tôi sắp chia sẻ với bạn.\n\n**Trong webinar MIỄN PHÍ sắp tới của chúng tôi, bạn sẽ học được:**\n\n- Cách chọn đúng sản phẩm có tỷ lệ chuyển đổi cao và hoa hồng hấp dẫn\n- Chiến lược tạo nội dung thu hút khiến người xem không thể không nhấp vào liên kết của bạn\n- Bí quyết tối ưu hóa trang web và bài đăng mạng xã hội của bạn để tăng tỷ lệ chuyển đổi\n- Cách phân tích và cải thiện hiệu suất chiến dịch của bạn theo thời gian\n\nWebinar này phù hợp cho cả người mới bắt đầu lẫn những Affiliate Marketer đã có kinh nghiệm muốn đột phá sang cấp độ tiếp theo.\n\n**Chi tiết sự kiện:**\nNgày: 15/04/2025\nThời gian: 19:30 - 21:00\nĐịa điểm: Trực tuyến (liên kết sẽ được gửi sau khi đăng ký)\n\n[ĐĂNG KÝ NGAY]\n\nSố lượng chỗ có hạn, vì vậy hãy đảm bảo bạn đăng ký sớm để không bỏ lỡ cơ hội này!\n\nTrân trọng,\n[Tên của bạn]\nChuyên gia Affiliate Marketing\n\nP.S. Những người đăng ký sẽ nhận được MIỄN PHÍ ebook "50 Chiến lược Affiliate Marketing Hiệu quả" trị giá 500.000đ. Đừng bỏ lỡ!`,
        "landing-page": `# Khóa Học Bí Quyết Thành Công Trong Affiliate Marketing\n\n## Từ Con Số 0 Đến 8 Chữ Số Trong 12 Tháng\n\n*Được giảng dạy bởi chuyên gia hàng đầu với 7+ năm kinh nghiệm và doanh thu hơn 2 tỷ đồng/tháng từ tiếp thị liên kết*\n\n### Bạn có đang gặp phải những vấn đề này?\n\n- Đã thử nhiều sản phẩm affiliate nhưng không tạo ra doanh thu\n- Tạo nội dung liên tục nhưng không có người click vào liên kết\n- Không biết cách chọn đúng sản phẩm và ngách thị trường\n- Mệt mỏi với những chiến lược không hiệu quả và lãng phí thời gian\n\n### Giới thiệu khóa học "Bí Quyết Thành Công Trong Affiliate Marketing"\n\nKhóa học trực tuyến toàn diện này sẽ đưa bạn từng bước từ việc chọn ngách thị trường, xây dựng nền tảng, tạo nội dung hấp dẫn đến tối ưu hóa chiến dịch và mở rộng quy mô doanh thu của bạn.\n\n### Bạn sẽ học được gì?\n\n✅ Phương pháp chọn ngách thị trường có lợi nhuận cao\n✅ Cách xây dựng nền tảng truyền thông cá nhân mạnh mẽ\n✅ Công thức tạo nội dung chuyển đổi cao đã được chứng minh\n✅ Chiến lược SEO đặc biệt cho Affiliate Marketing\n✅ Kỹ thuật phân tích và tối ưu hóa để tăng doanh thu\n\n### Học viên của chúng tôi nói gì?\n\n*"Sau 6 tháng áp dụng các chiến lược trong khóa học, tôi đã tăng doanh thu từ 3 triệu lên 45 triệu đồng mỗi tháng. Đây là khoản đầu tư tốt nhất tôi từng thực hiện cho sự nghiệp của mình."* - Nguyễn Văn A\n\n*"Tôi đã thử nhiều khóa học khác nhưng không có kết quả. Khóa học này thực sự đã thay đổi cuộc sống của tôi với các chiến lược thực tế và hỗ trợ liên tục từ cộng đồng."* - Trần Thị B\n\n### Đăng ký ngay hôm nay với ưu đãi đặc biệt!\n\nGiá gốc: ~~5.990.000đ~~\nGiá ưu đãi hôm nay: 2.990.000đ (Tiết kiệm 50%)\n\n⚡ THÊM: 3 phần quà độc quyền cho 50 người đăng ký đầu tiên\n\n[ĐĂNG KÝ NGAY]\n\n*Cam kết hoàn tiền 100% trong 30 ngày nếu không hài lòng!*`
      };

      const selectedTypeContent = demoResponses[contentType] || demoResponses["blog-post"];
      setGeneratedContent(selectedTypeContent);
      setIsLoading(false);
      
      toast({
        title: "Nội dung đã được tạo",
        description: "Nội dung AI đã được tạo thành công",
      });
    }, 2000);
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
      <div className="flex items-center gap-2 text-lg font-semibold">
        <PenSquare className="h-5 w-5 text-brand-blue" />
        <h2>AI Content Creator</h2>
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
        Powered by Google Gemini 2.5 Pro API. Nội dung được tạo là duy nhất và được tối ưu hóa cho thị trường Việt Nam.
      </div>
    </div>
  );
};

export default ContentGeneratorTool;
