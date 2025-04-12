
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseOpenAIApiOptions {
  onApiKeyMissing?: () => void;
}

// API key OpenRouter được cấu hình sẵn
const OPENROUTER_API_KEY = "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";

export const useOpenAiApi = (options?: UseOpenAIApiOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);

  useEffect(() => {
    // Kiểm tra API key có sẵn
    if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "YOUR_API_KEY_HERE") {
      setIsApiConfigured(true);
    } else {
      console.error("OpenRouter API key is missing or not set correctly");
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang được bảo trì. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  }, []);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    model = "openai/gpt-4o" // Model mặc định sử dụng GPT-4o của OpenAI thông qua OpenRouter
  ) => {
    if (!isApiConfigured) {
      if (options?.onApiKeyMissing) {
        options.onApiKeyMissing();
      }
      return null;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin, // Origin domain
          'X-Title': 'Affiliate Marketing AI'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2048
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.choices[0]?.message?.content || "";
      
      // Xử lý và trả về kết quả
      if (responseText) {
        responseText = cleanAsterisks(responseText);
        return responseText;
      } else {
        console.error("Không nhận được phản hồi từ API");
        return "Không thể tạo nội dung. Vui lòng thử lại sau.";
      }
    } catch (error: any) {
      console.error("OpenRouter API error:", error);
      
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      // Trả về nội dung mẫu khi gặp lỗi
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isApiConfigured,
    isLoading,
    generateCompletion,
  };
};

export default useOpenAiApi;
