
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import useContentGeneration from "@/hooks/use-content-generation";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useAiChat = (selectedTopic: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { isLoading, generateCompletion } = useContentGeneration();

  // Initialize conversation with welcome message
  useEffect(() => {
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

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await generateCompletion([
        {
          role: 'system',
          content: `Bạn là một AI Coach chuyên về Affiliate Marketing, đặc biệt là về chủ đề "${selectedTopic}". 
          Hãy cung cấp lời khuyên thực tế, chiến lược cụ thể và hướng dẫn chi tiết.
          Trả lời ngắn gọn, dễ hiểu và đúng trọng tâm.
          Sử dụng ngôn ngữ thân thiện và chuyên nghiệp.`
        },
        ...messages,
        userMessage
      ]);
      
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo phản hồi. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit
  };
};
