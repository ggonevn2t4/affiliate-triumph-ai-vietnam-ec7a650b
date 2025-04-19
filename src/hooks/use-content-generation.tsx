
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

// OpenRouter API key configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "sk-or-v1-..."; // Replace with your API key

export const useContentGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>
  ) => {
    setIsLoading(true);
    
    try {
      console.log("Generating completion with Claude 3 Haiku");
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin, // Required for OpenRouter
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
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "";
      
      if (responseText) {
        return responseText;
      } else {
        console.error("No response received from API");
        return "Không thể tạo nội dung. Vui lòng thử lại sau.";
      }
    } catch (error: any) {
      console.error("OpenRouter API error:", error);
      
      if (import.meta.env.DEV) {
        toast({
          title: "Thông báo hệ thống",
          description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
      
      // Fallback content in case of error
      return "Không thể tạo nội dung. Hệ thống đang bảo trì, vui lòng thử lại sau.";
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
