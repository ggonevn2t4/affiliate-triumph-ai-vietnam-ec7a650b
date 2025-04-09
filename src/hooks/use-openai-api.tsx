
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import OpenAI from "openai";

interface UseOpenAIApiOptions {
  onApiKeyMissing?: () => void;
}

export const useOpenAiApi = (options?: UseOpenAIApiOptions) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [openai, setOpenai] = useState<OpenAI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedKey = localStorage.getItem('openai-api-key');
    if (savedKey) {
      setApiKey(savedKey);
      setOpenai(new OpenAI({ apiKey: savedKey, dangerouslyAllowBrowser: true }));
    }
  }, []);

  const updateApiKey = (newKey: string) => {
    if (newKey) {
      setApiKey(newKey);
      localStorage.setItem('openai-api-key', newKey);
      setOpenai(new OpenAI({ apiKey: newKey, dangerouslyAllowBrowser: true }));
      toast({
        title: "API Key đã được cập nhật",
        description: "OpenAI API key của bạn đã được lưu thành công."
      });
    } else {
      toast({
        title: "Lỗi",
        description: "API key không được để trống.",
        variant: "destructive"
      });
    }
  };

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>, 
    model = "gpt-4o-mini"
  ) => {
    if (!openai) {
      if (options?.onApiKeyMissing) {
        options.onApiKeyMissing();
      }
      return null;
    }

    setIsLoading(true);
    
    try {
      const response = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      });
      
      return response.choices[0]?.message?.content || null;
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      
      // Handle API key errors
      if (error.status === 401 || (error.error && error.error.type === "invalid_request_error")) {
        toast({
          title: "Lỗi API key",
          description: "API key không hợp lệ hoặc đã hết hạn. Vui lòng cập nhật API key của bạn.",
          variant: "destructive"
        });
        
        if (options?.onApiKeyMissing) {
          options.onApiKeyMissing();
        }
      } else {
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra khi thực hiện yêu cầu. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    apiKey,
    updateApiKey,
    openai,
    isLoading,
    generateCompletion,
  };
};

export default useOpenAiApi;
