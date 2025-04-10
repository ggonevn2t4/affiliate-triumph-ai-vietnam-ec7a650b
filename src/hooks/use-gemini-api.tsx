
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

interface UseGeminiApiOptions {
  onApiKeyMissing?: () => void;
}

// Thay thế API key này bằng API key của bạn
const YOUR_FIXED_API_KEY = "YOUR_API_KEY_HERE";

export const useGeminiApi = (options?: UseGeminiApiOptions) => {
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sử dụng API key cố định từ hệ thống
    if (YOUR_FIXED_API_KEY && YOUR_FIXED_API_KEY !== "YOUR_API_KEY_HERE") {
      setGenAI(new GoogleGenerativeAI(YOUR_FIXED_API_KEY));
    }
  }, []);

  const cleanAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, "");
  };

  const generateCompletion = async (
    messages: Array<{role: "system" | "user" | "assistant"; content: string}>,
    model = "gemini-2.0-flash-live-001"
  ) => {
    if (!genAI || YOUR_FIXED_API_KEY === "YOUR_API_KEY_HERE") {
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang được bảo trì. Vui lòng thử lại sau.",
        variant: "destructive"
      });
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
      
      // Lấy tin nhắn cuối cùng của người dùng và trích xuất phần nội dung
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
      
      toast({
        title: "Thông báo hệ thống",
        description: "Tính năng AI đang gặp sự cố. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      
      // Trả về nội dung mẫu khi gặp lỗi
      return "Không thể tạo nội dung. Hệ thống đang bảo trì, vui lòng thử lại sau.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    genAI,
    isLoading,
    generateCompletion,
  };
};

export default useGeminiApi;
