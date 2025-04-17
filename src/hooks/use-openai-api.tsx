
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseOpenAIApiOptions {
  onApiKeyMissing?: () => void;
}

// Backup API key in case the configured one fails
const OPENROUTER_API_KEY = "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";

export const useOpenAiApi = (options?: UseOpenAIApiOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('openai_api_key') || OPENROUTER_API_KEY
  );

  useEffect(() => {
    // Check if API key is available
    if (apiKey && apiKey.length > 10) {
      setIsApiConfigured(true);
    } else {
      console.error("API key is missing or not set correctly");
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang được bảo trì. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      if (options?.onApiKeyMissing) {
        options.onApiKeyMissing();
      }
    }
  }, [apiKey, options]);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    model = "openai/gpt-4o" // Model mặc định mới nhất của OpenAI
  ) => {
    if (!isApiConfigured) {
      if (options?.onApiKeyMissing) {
        options.onApiKeyMissing();
      }
      return null;
    }

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
      
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      // Return better error message instead of null
      return "Không thể tạo nội dung. Hệ thống đang bảo trì, vui lòng cập nhật API key hoặc thử lại sau.";
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
