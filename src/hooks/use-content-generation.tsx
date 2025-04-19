
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const useContentGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>
  ) => {
    if (!OPENROUTER_API_KEY) {
      toast({
        title: "Lỗi Cấu Hình",
        description: "API key cho OpenRouter chưa được cấu hình. Vui lòng kiểm tra cài đặt.",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);
    
    try {
      console.log("Generating completion with Claude 3 Haiku");
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Affiliate Marketing AI'
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Lỗi không xác định'}`);
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "";
      
      if (responseText) {
        return responseText;
      } else {
        console.error("Không nhận được phản hồi từ API");
        toast({
          title: "Lỗi Tạo Nội Dung",
          description: "Không thể tạo nội dung. Vui lòng thử lại sau.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error: any) {
      console.error('OpenRouter API error:', error);
      
      toast({
        title: "Lỗi Hệ Thống",
        description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateCompletion,
  };
};

export default useContentGeneration;
