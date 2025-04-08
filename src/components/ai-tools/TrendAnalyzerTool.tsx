import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Compass, Search, TrendingUp, Calendar } from "lucide-react";
import OpenAI from "openai";

interface TrendResult {
  keyword: string;
  growthRate: number;
  searchVolume: number;
  potentialProducts: string[];
  insights: string;
}

const TrendAnalyzerTool = () => {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<string>("fashion");
  const [timeRange, setTimeRange] = useState<string>("month");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TrendResult[] | null>(null);
  const [apiKey] = useState("sk-default-openai-key"); // Replace with your OpenAI key
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const nicheOptions = [
    { id: "fashion", label: "Thời trang" },
    { id: "beauty", label: "Làm đẹp" },
    { id: "tech", label: "Công nghệ" },
    { id: "health", label: "Sức khỏe" },
    { id: "home", label: "Đồ gia dụng" }
  ];

  const timeRangeOptions = [
    { id: "week", label: "7 ngày qua" },
    { id: "month", label: "30 ngày qua" },
    { id: "quarter", label: "3 tháng qua" },
    { id: "year", label: "12 tháng qua" }
  ];

  const handleAnalyzeTrends = async () => {
    if (!query.trim() && niche.trim() === "") {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn ngành hàng hoặc nhập từ khóa để phân tích xu hướng",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare the prompt for trend analysis
      const prompt = `Bạn là một chuyên gia phân tích xu hướng thị trường Affiliate Marketing. 
      Hãy phân tích xu hướng cho ngành "${nicheOptions.find(option => option.id === niche)?.label || niche}" 
      ${query ? `với từ khóa cụ thể: "${query}"` : ""} 
      trong khoảng thời gian ${timeRangeOptions.find(option => option.id === timeRange)?.label || timeRange}.
      
      Hãy đưa ra kết quả dưới dạng JSON với định dạng:
      [
        {
          "keyword": "Từ khóa xu hướng 1",
          "growthRate": số phần trăm tăng trưởng (chỉ số, không có ký hiệu %),
          "searchVolume": số lượng tìm kiếm ước tính mỗi tháng (chỉ số, không có dấu phẩy hay ký hiệu khác),
          "potentialProducts": ["Sản phẩm tiềm năng 1", "Sản phẩm tiềm năng 2", "Sản phẩm tiềm năng 3"],
          "insights": "Phân tích chuyên sâu về xu hướng này"
        },
        {
          "keyword": "Từ khóa xu hướng 2",
          "growthRate": số phần trăm tăng trưởng,
          "searchVolume": số lượng tìm kiếm,
          "potentialProducts": ["Sản phẩm tiềm năng 1", "Sản phẩm tiềm năng 2", "Sản phẩm tiềm năng 3"],
          "insights": "Phân tích chuyên sâu về xu hướng này"
        },
        {
          "keyword": "Từ khóa xu hướng 3",
          "growthRate": số phần trăm tăng trưởng,
          "searchVolume": số lượng tìm kiếm,
          "potentialProducts": ["Sản phẩm tiềm năng 1", "Sản phẩm tiềm năng 2", "Sản phẩm tiềm năng 3"],
          "insights": "Phân tích chuyên sâu về xu hướng này"
        }
      ]
      
      Đảm bảo cung cấp thông tin thực tế và cập nhật về xu hướng thị trường Việt Nam.
      
      Trả lời chỉ bao gồm JSON, không có chữ hay định dạng khác.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a Vietnamese market analysis expert specializing in affiliate marketing trends. Only respond with JSON data, nothing else."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
        max_tokens: 2048,
      });

      const resultText = response.choices[0]?.message?.content || "{}";
      
      try {
        // Parse the JSON
        const parsedData = JSON.parse(resultText);
        // Check if it's an array or if it's wrapped in another object
        const trendsData = Array.isArray(parsedData) ? parsedData : parsedData.trends || parsedData.results || [];
        
        if (trendsData.length > 0) {
          setResults(trendsData as TrendResult[]);
          toast({
            title: "Phân tích hoàn tất",
            description: "Dữ liệu xu hướng đã được phân tích và hiển thị",
          });
        } else {
          throw new Error("No trend data found");
        }
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Could not parse JSON from response");
      }
    } catch (error) {
      console.error("Error analyzing trends:", error);
      toast({
        title: "Lỗi phân tích",
        description: "Đã có lỗi xảy ra khi phân tích xu hướng. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      // Use demo data as fallback
      const demoResults: Record<string, TrendResult[]> = {
        "fashion": [
          {
            keyword: "Thời trang bền vững",
            growthRate: 68,
            searchVolume: 12500,
            potentialProducts: ["Quần áo từ chất liệu tái chế", "Thương hiệu thời trang xanh", "Phụ kiện thân thiện với môi trường"],
            insights: "Xu hướng thời trang bền vững đang tăng mạnh tại Việt Nam, đặc biệt trong nhóm người tiêu dùng Z-Gen và Millennials có ý thức về môi trường. Các sản phẩm có chứng nhận thân thiện với môi trường đang được ưa chuộng."
          },
          {
            keyword: "Y2K Fashion",
            growthRate: 124,
            searchVolume: 28000,
            potentialProducts: ["Áo crop top retro", "Quần baggy jeans", "Phụ kiện hoài cổ thập niên 2000"],
            insights: "Phong cách Y2K đang bùng nổ trên TikTok và Instagram tại Việt Nam, với lượng tìm kiếm tăng gấp đôi trong 3 tháng qua. Đây là thời điểm tốt để quảng bá các sản phẩm thời trang lấy cảm hứng từ thập niên 2000."
          },
          {
            keyword: "Áo khoác bomber",
            growthRate: 87,
            searchVolume: 15600,
            potentialProducts: ["Áo khoác bomber oversized", "Áo khoác bomber phối màu", "Bomber jacket vintage"],
            insights: "Áo khoác bomber đang trở lại mạnh mẽ trong mùa thu/đông năm nay. Các mẫu oversized và phiên bản có họa tiết độc đáo đang được tìm kiếm nhiều nhất."
          }
        ]
      };
      
      const selectedNicheResults = demoResults[niche] || demoResults["fashion"];
      setResults(selectedNicheResults);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to render growth indicator
  const renderGrowthIndicator = (growth: number) => {
    const color = growth > 100 ? "text-green-600" : growth > 50 ? "text-green-500" : "text-amber-500";
    return (
      <div className={`flex items-center ${color}`}>
        <TrendingUp className="h-4 w-4 mr-1" />
        <span className="font-medium">{growth}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Compass className="h-5 w-5 text-brand-purple" />
        <h2>AI Trend Analyzer</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngành hàng</label>
          <div className="flex flex-wrap gap-2">
            {nicheOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setNiche(option.id)}
                className={`px-4 py-2 rounded-md text-sm ${
                  niche === option.id
                    ? "bg-brand-purple text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng thời gian</label>
          <div className="flex flex-wrap gap-2">
            {timeRangeOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setTimeRange(option.id)}
                className={`px-4 py-2 rounded-md text-sm ${
                  timeRange === option.id
                    ? "bg-brand-purple text-white"
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
            Từ khóa hoặc chủ đề cụ thể (tùy chọn)
          </label>
          <Textarea
            placeholder="Nhập từ khóa hoặc chủ đề cụ thể bạn muốn phân tích... Ví dụ: thời trang bền vững, phụ kiện điện thoại"
            className="min-h-[80px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleAnalyzeTrends}
          disabled={isLoading}
          className="w-full bg-brand-purple hover:bg-brand-purple/90"
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Đang phân tích...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Phân tích xu hướng
            </>
          )}
        </Button>
      </div>
      
      {results && (
        <div className="mt-8">
          <h3 className="font-medium text-lg mb-4">Kết quả phân tích xu hướng</h3>
          
          <div className="space-y-6">
            {results.map((trend, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                  <h4 className="font-medium">{trend.keyword}</h4>
                  {renderGrowthIndicator(trend.growthRate)}
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Lượng tìm kiếm</p>
                      <p className="font-medium">{trend.searchVolume.toLocaleString()} lượt/tháng</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tăng trưởng</p>
                      <p className="font-medium">{trend.growthRate}% trong 30 ngày qua</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Sản phẩm tiềm năng</p>
                    <div className="flex flex-wrap gap-2">
                      {trend.potentialProducts.map((product, i) => (
                        <span key={i} className="bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full text-sm">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phân tích chuyên sâu</p>
                    <p className="text-sm">{trend.insights}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Dữ liệu cập nhật: {new Date().toLocaleDateString("vi-VN")}</span>
            </div>
            <span>Powered by Google Gemini 2.5 Pro API</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendAnalyzerTool;
