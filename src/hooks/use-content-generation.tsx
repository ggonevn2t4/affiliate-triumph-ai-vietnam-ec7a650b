
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

// API key thực tế của OpenRouter
const OPENROUTER_API_KEY = "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";

// Các model phù hợp với các loại nội dung khác nhau
const getModelForContent = (contentType: string, complexity: 'simple' | 'complex' = 'simple') => {
  if (complexity === 'complex') {
    return "anthropic/claude-3-opus"; // Model mạnh nhất cho nội dung phức tạp
  }
  
  switch (contentType) {
    case 'blog':
      return "anthropic/claude-3-sonnet"; // Phù hợp cho nội dung dài, chất lượng cao
    case 'product':
      return "anthropic/claude-3-sonnet"; // Tốt cho mô tả sản phẩm chi tiết
    default:
      return "anthropic/claude-3-haiku"; // Nhanh, chi phí thấp cho các nội dung ngắn
  }
};

export const useContentGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    contentType: string = 'general',
    complexity: 'simple' | 'complex' = 'simple'
  ) => {
    setIsLoading(true);
    
    try {
      console.log(`Đang tạo nội dung ${contentType} với độ phức tạp ${complexity}...`);
      
      // Lựa chọn model phù hợp với loại nội dung
      const model = getModelForContent(contentType, complexity);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Affiliate Marketing AI'
        },
        body: JSON.stringify({
          model: model,
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
