
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ChevronDown, ArrowLeft, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai-api-key");
    return savedKey || "";
  });
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(!apiKey);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const openai = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : null;

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

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai-api-key", key);
    setIsApiKeyDialogOpen(false);
    toast({
      title: "Cập nhật API Key",
      description: "API key của bạn đã được cập nhật thành công."
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!apiKey) {
      setIsApiKeyDialogOpen(true);
      return;
    }

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
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" as const : "assistant" as const,
        content: msg.text
      }));

      // Add the new user message
      conversationHistory.push({
        role: "user" as const,
        content: input
      });

      // Call the OpenAI API with the correct message types
      const response = await openai!.chat.completions.create({
        model: "gpt-4o-mini", // Using GPT-4o-mini as a replacement
        messages: [
          {
            role: "system" as const,
            content: `Bạn là một trợ lý AI chuyên về Affiliate Marketing trong thị trường Việt Nam. 
                    Chủ đề hiện tại: "${selectedTopic}". 
                    Hãy trả lời với kiến thức cập nhật về thị trường Việt Nam và xu hướng Affiliate Marketing hiện tại.`
          },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      // Get AI response
      const aiResponse = response.choices[0]?.message?.content || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.";
      
      // Add AI response to messages
      const aiMessage = {
        id: Date.now().toString(),
        text: aiResponse,
        sender: "ai" as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error calling OpenAI API:", error);
      
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
          description: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
      
      // Add fallback AI response in case of error
      const errorMessage = {
        id: Date.now().toString(),
        text: "Xin lỗi, tôi đang gặp một số vấn đề kỹ thuật. Vui lòng thử lại sau.",
        sender: "ai" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            AI Coaching được hỗ trợ bởi công nghệ OpenAI GPT-4o-mini. Tư vấn dựa trên dữ liệu thị trường Việt Nam và xu hướng Affiliate Marketing hiện tại.
          </p>
        </form>
      </div>
    </>
  );
};

export default AiCoachingChat;
