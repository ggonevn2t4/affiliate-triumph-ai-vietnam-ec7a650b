
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

const OPENROUTER_API_KEY = "your-api-key-here"; // API key của bạn sẽ được thay thế vào đây

export const useContentGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>
  ) => {
    setIsLoading(true);
    
    try {
      console.log("Đang tạo nội dung với model được chọn...");
      
      // Chọn model dựa trên độ phức tạp của nội dung
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Affiliate Marketing AI'
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku", // Model nhanh, chi phí thấp cho các tác vụ đơn giản
          messages: messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        throw new Error(`Lỗi API: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "";
      
      if (responseText) {
        return responseText;
      } else {
        throw new Error("Không nhận được phản hồi từ API");
      }
    } catch (error: any) {
      console.error('OpenRouter API error:', error);
      
      toast({
        title: "Lỗi Hệ Thống",
        description: "Không thể tạo nội dung. Vui lòng thử lại sau.",
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
