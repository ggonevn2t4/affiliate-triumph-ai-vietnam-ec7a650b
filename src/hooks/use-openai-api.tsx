
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseOpenAIApiOptions {
  onApiKeyMissing?: () => void;
}

// Updated API key
const OPENROUTER_API_KEY = "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";

export const useOpenAiApi = (options?: UseOpenAIApiOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(true); // Always consider API as configured
  const [apiKey] = useState<string>(OPENROUTER_API_KEY); // Using fixed API key

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    model = "openai/gpt-4o" // Model mặc định mới nhất của OpenAI
  ) => {
    setIsLoading(true);
    
    try {
      console.log(`Generating completion with model: ${model}`);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Affiliate Marketing AI'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 4096, // Tăng giới hạn token
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      let responseText = data.choices[0]?.message?.content || "";
      
      // Process and return result
      if (responseText) {
        responseText = cleanAsterisks(responseText);
        return responseText;
      } else {
        console.error("No response received from API");
        return "Không thể tạo nội dung. Vui lòng thử lại sau.";
      }
    } catch (error: any) {
      console.error("OpenRouter API error:", error);
      
      // Provide better error handling
      if (import.meta.env.DEV) {
        toast({
          title: "Thông báo hệ thống",
          description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
      
      // Return better error message instead of null
      return "Không thể tạo nội dung. Hệ thống đang bảo trì, vui lòng thử lại sau.";
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
