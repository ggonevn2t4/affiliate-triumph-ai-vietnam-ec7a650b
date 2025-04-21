
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { useApiKey } from '@/hooks/use-api-key';

// Đổi sang model GPT-4o-mini của OpenAI
const getModelForContent = () => {
  return "gpt-4o-mini"; // Model OpenAI mới, nhanh
};

export const useContentGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApiKey();

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    contentType: string = 'general',
    complexity: 'simple' | 'complex' = 'simple'
  ) => {
    setIsLoading(true);

    if (!isConfigured || !apiKey) {
      toast({
        title: "Lỗi API Key",
        description: "Vui lòng liên hệ quản trị viên để kiểm tra cấu hình API key",
        variant: "destructive"
      });
      setIsLoading(false);
      return null;
    }

    try {
      console.log(`Đang tạo nội dung ${contentType} với model GPT-4o-mini...`);
      const model = getModelForContent();
      console.log("Sử dụng model:", model);

      // Sử dụng API endpoint của OpenRouter với model gpt-4o-mini, hoặc điều hướng sang endpoint OpenAI nếu cần
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Affiliate Marketing AI',
          'Origin': window.location.origin
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);

        let errorMessage = "Lỗi khi kết nối đến API";
        if (errorData.error?.message) {
          errorMessage = `${errorMessage}: ${errorData.error.message}`;
        }
        if (errorData.error?.code === 401) {
          errorMessage = "Lỗi xác thực API key. Vui lòng kiểm tra lại API key của bạn.";
        }

        toast({
          title: "Lỗi API",
          description: errorMessage,
          variant: "destructive"
        });

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const responseText = data.choices?.[0]?.message?.content || "";

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
