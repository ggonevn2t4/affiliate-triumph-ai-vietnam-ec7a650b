
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import OpenAI from "openai";

interface UseOpenAIApiOptions {
  onApiKeyMissing?: () => void;
}

const DEFAULT_API_KEY = "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";

export const useOpenAiApi = (options?: UseOpenAIApiOptions) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [openai, setOpenai] = useState<OpenAI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedKey = localStorage.getItem('openai-api-key') || DEFAULT_API_KEY;
    if (savedKey) {
      setApiKey(savedKey);
      setOpenai(new OpenAI({ apiKey: savedKey, dangerouslyAllowBrowser: true }));
      // Lưu API key mặc định nếu chưa có
      if (!localStorage.getItem('openai-api-key')) {
        localStorage.setItem('openai-api-key', DEFAULT_API_KEY);
      }
    }
  }, []);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

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
      // Cập nhật các prompt system để loại bỏ ký tự **
      const updatedMessages = messages.map(msg => {
        if (msg.role === "system") {
          return {
            ...msg,
            content: msg.content + " QUAN TRỌNG: KHÔNG sử dụng ký tự ** trong nội dung phản hồi."
          };
        }
        return msg;
      });
      
      const response = await openai.chat.completions.create({
        model,
        messages: updatedMessages,
        temperature: 0.7,
        max_tokens: 2048,
      });
      
      let content = response.choices[0]?.message?.content || null;
      if (content) {
        content = cleanAsterisks(content);
      }
      return content;
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
