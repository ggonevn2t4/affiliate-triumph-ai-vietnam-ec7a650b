
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ChevronDown, ArrowLeft, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AiCoachingChatProps {
  selectedTopic: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AiCoachingChat = ({ selectedTopic }: AiCoachingChatProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(""); // For demo purposes
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial AI greeting based on selected topic
  useEffect(() => {
    const initialGreeting = `Chào mừng bạn đến với dịch vụ AI Coaching về chủ đề "${selectedTopic}"! Tôi là trợ lý AI chuyên về Affiliate Marketing. Hãy cho tôi biết bạn đang gặp khó khăn hoặc có câu hỏi gì về chủ đề này?`;
    
    setMessages([
      {
        id: Date.now().toString(),
        text: initialGreeting,
        sender: "ai",
        timestamp: new Date()
      }
    ]);
  }, [selectedTopic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user" as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real application, you would call the Gemini API here
      // For now, we'll simulate a response
      
      // Simulated AI response
      setTimeout(() => {
        const aiResponses: Record<string, string[]> = {
          "Hướng dẫn cho người mới": [
            "Để bắt đầu với Affiliate Marketing, bạn nên: 1) Chọn ngách phù hợp với sở thích, 2) Tìm hiểu sản phẩm kỹ lưỡng, 3) Xây dựng nền tảng nội dung (blog, social media), 4) Tạo liên kết affiliate và theo dõi hiệu suất, 5) Tối ưu hóa chiến dịch dựa trên số liệu.",
            "Một sai lầm phổ biến của người mới là chọn quá nhiều sản phẩm để quảng bá. Tôi khuyên bạn nên tập trung vào 2-3 sản phẩm đầu tiên để học hỏi và hoàn thiện chiến lược marketing của mình.",
            "Đối với thị trường Việt Nam, các kênh hiệu quả nhất cho người mới bao gồm Facebook, TikTok và các diễn đàn chuyên ngành. Hãy bắt đầu từ những nơi bạn đã quen thuộc."
          ],
          "Chiến lược nội dung": [
            "Nội dung review sản phẩm chi tiết kết hợp với trải nghiệm cá nhân thường mang lại hiệu quả cao nhất. Hãy tạo nội dung giải quyết vấn đề thực tế của người dùng.",
            "Để tối ưu SEO cho nội dung affiliate, hãy nghiên cứu từ khóa có lượng tìm kiếm cao nhưng cạnh tranh thấp, sử dụng cấu trúc rõ ràng với tiêu đề H1, H2, và thêm hình ảnh chất lượng cao.",
            "Tần suất đăng bài lý tưởng là 2-3 bài/tuần đối với blog và hàng ngày đối với mạng xã hội. Chất lượng luôn quan trọng hơn số lượng."
          ]
        };
        
        // Get response based on topic or use default
        const topicResponses = aiResponses[selectedTopic] || [
          `Cảm ơn câu hỏi của bạn về "${input}". Trong lĩnh vực Affiliate Marketing, điều quan trọng là luôn theo dõi và phân tích số liệu để tối ưu hóa chiến dịch của bạn. Hãy cho tôi biết thêm về mục tiêu cụ thể và tôi sẽ đưa ra lời khuyên phù hợp hơn.`
        ];
        
        const randomIndex = Math.floor(Math.random() * topicResponses.length);
        const aiMessage = {
          id: Date.now().toString(),
          text: topicResponses[randomIndex],
          sender: "ai" as const,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error calling AI API:", error);
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[70vh]">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => window.history.back()}
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">AI Coaching: {selectedTopic}</h3>
        </div>
        <div>
          <Button variant="outline" size="sm">
            <ChevronDown className="h-4 w-4 mr-1" />
            Tùy chọn
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
              <div 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Nhập câu hỏi hoặc vấn đề bạn đang gặp..."
            className="resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" className="shrink-0" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          AI Coaching được hỗ trợ bởi công nghệ Gemini. Tư vấn dựa trên dữ liệu thị trường Việt Nam và xu hướng Affiliate Marketing hiện tại.
        </p>
      </form>
    </div>
  );
};

export default AiCoachingChat;
