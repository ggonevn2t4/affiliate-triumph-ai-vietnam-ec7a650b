
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

interface UseGeminiApiOptions {
  onApiKeyMissing?: () => void;
}

// Tên API key trong local storage
const GEMINI_API_KEY_NAME = 'gemini-api-key';

export const useGeminiApi = (options?: UseGeminiApiOptions) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedKey = localStorage.getItem(GEMINI_API_KEY_NAME);
    if (savedKey) {
      setApiKey(savedKey);
      setGenAI(new GoogleGenerativeAI(savedKey));
    }
  }, []);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

  const updateApiKey = (newKey: string) => {
    if (newKey) {
      setApiKey(newKey);
      localStorage.setItem(GEMINI_API_KEY_NAME, newKey);
      setGenAI(new GoogleGenerativeAI(newKey));
      toast({
        title: "API Key đã được cập nhật",
        description: "Google Gemini API key của bạn đã được lưu thành công."
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
    model = "gemini-2.0-flash-live-001"
  ) => {
    if (!genAI) {
      if (options?.onApiKeyMissing) {
        options.onApiKeyMissing();
      }
      return null;
    }

    setIsLoading(true);
    
    try {
      // Kết hợp prompt hệ thống với tin nhắn người dùng
      const systemPrompt = messages.find(msg => msg.role === "system")?.content || "";
      
      // Chuyển đổi định dạng tin nhắn từ OpenAI sang Gemini
      const userMessages = messages
        .filter(msg => msg.role !== "system")
        .map(msg => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        }));
      
      // Lấy Gemini model
      const geminiModel = genAI.getGenerativeModel({ model });
      
      // Tạo chat session
      const chat = geminiModel.startChat({
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
        // Thêm system prompt vào context nếu có
        systemInstruction: systemPrompt ? { text: systemPrompt } : undefined,
      });
      
      // Gửi tin nhắn và nhận phản hồi
      const lastUserMessage = userMessages[userMessages.length - 1];
      const result = await chat.sendMessageStream(lastUserMessage.parts);
      
      // Lấy nội dung phản hồi
      let responseText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        responseText += chunkText;
      }
      
      // Xử lý và trả về kết quả
      if (responseText) {
        responseText = cleanAsterisks(responseText);
      }
      
      return responseText;
    } catch (error: any) {
      console.error("Google Gemini API error:", error);
      
      // Xử lý lỗi API key
      if (error.status === 401 || error.message?.includes("API key")) {
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
    genAI,
    isLoading,
    generateCompletion,
  };
};

export default useGeminiApi;
