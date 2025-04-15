
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ApiKeyDialog from "../ai-tools/ApiKeyDialog";

interface AiCoachingChatProps {
  selectedTopic: string;
}

const AiCoachingChat = ({ selectedTopic }: AiCoachingChatProps) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));

  // Initialize conversation with a system message based on the selected topic
  useEffect(() => {
    // Add a welcome message from the assistant based on the selected topic
    setMessages([
      {
        role: 'assistant',
        content: `Chào mừng bạn đến với phiên AI Coaching về chủ đề "${selectedTopic}". Tôi sẽ giúp bạn phát triển kỹ năng và chiến lược trong lĩnh vực này. Bạn có thể đặt câu hỏi hoặc chia sẻ thách thức bạn đang gặp phải.`
      }
    ]);
  }, [selectedTopic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Check for API key
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    // Add user message to chat
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulating API call to OpenAI
      // In a real implementation, this would make an actual API call
      setTimeout(() => {
        // Example response
        const response = { 
          role: 'assistant' as const, 
          content: `Cảm ơn câu hỏi của bạn về "${selectedTopic}". Đây là một số chiến lược và lời khuyên:\n\n1. Nghiên cứu thị trường kỹ lưỡng\n2. Tạo nội dung giá trị cao cho người dùng\n3. Xây dựng kênh tiếp thị đa dạng\n4. Theo dõi và phân tích dữ liệu hiệu suất\n5. Tối ưu hóa liên tục dựa trên phản hồi\n\nBạn muốn tìm hiểu sâu hơn về điểm nào trong số này?` 
        };
        
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Lỗi",
        description: "Không thể kết nối với AI Assistant. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleApiKeySave = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowApiKeyDialog(false);
    toast({
      title: "API Key đã được lưu",
      description: "Bây giờ bạn có thể sử dụng AI Coaching",
    });
    // Re-submit the message
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Topic header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{selectedTopic}</h2>
        <p className="text-sm text-gray-500">AI Coaching session</p>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card 
              className={`max-w-[80%] p-3 ${
                message.role === 'user' 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-3 bg-gray-100">
              <p className="animate-pulse">AI đang soạn phản hồi...</p>
            </Card>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex items-center space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 resize-none"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" className="rounded-full p-2 h-10 w-10" disabled={isLoading}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
      
      {/* API Key Dialog */}
      <ApiKeyDialog 
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleApiKeySave}
      />
    </div>
  );
};

export default AiCoachingChat;
