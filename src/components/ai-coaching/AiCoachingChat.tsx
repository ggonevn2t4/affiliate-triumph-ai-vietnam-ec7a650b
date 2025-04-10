
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowLeft, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGeminiApi } from "@/hooks/use-gemini-api";
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
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("gemini-api-key");
    return savedKey || "";
  });
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(!apiKey);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const { 
    generateCompletion, 
    isLoading,
    updateApiKey 
  } = useGeminiApi({
    onApiKeyMissing: () => setIsApiKeyDialogOpen(true)
  });

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
    if (key) {
      setApiKey(key);
      updateApiKey(key);
      setIsApiKeyDialogOpen(false);
    }
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

      // Add system message
      const systemMessage = {
        role: "system" as const,
        content: `Bạn là một trợ lý AI chuyên về Affiliate Marketing trong thị trường Việt Nam. 
                Chủ đề hiện tại: "${selectedTopic}". 
                Hãy trả lời với kiến thức cập nhật về thị trường Việt Nam và xu hướng Affiliate Marketing hiện tại.`
      };

      // Call the Gemini API
      const aiResponse = await generateCompletion(
        [systemMessage, ...conversationHistory]
      );

      if (aiResponse) {
        // Add AI response to messages
        const aiMessage = {
          id: Date.now().toString(),
          text: aiResponse,
          sender: "ai" as const,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error("No response from API");
      }
    } catch (error: any) {
      console.error("Error in chat:", error);
      
      // Add fallback AI response in case of error
      const errorMessage = {
        id: Date.now().toString(),
        text: "Xin lỗi, tôi đang gặp một số vấn đề kỹ thuật. Vui lòng thử lại sau.",
        sender: "ai" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
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
                  <DialogTitle>Google Gemini API Key</DialogTitle>
                  <DialogDescription>
                    Nhập API key Google Gemini của bạn để sử dụng dịch vụ AI. API key sẽ được lưu trên trình duyệt của bạn.
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
                      placeholder="AIzaSy..."
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
            AI Coaching được hỗ trợ bởi công nghệ Google Gemini API. Tư vấn dựa trên dữ liệu thị trường Việt Nam và xu hướng Affiliate Marketing hiện tại.
          </p>
        </form>
      </div>
    </>
  );
};

export default AiCoachingChat;
