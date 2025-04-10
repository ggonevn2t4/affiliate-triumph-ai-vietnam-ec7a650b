
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
    } else {
      console.error("API key is missing or not set correctly");
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
    model = "gemini-pro"
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
      
      // Lấy nội dung tin nhắn của người dùng
      const userMessage = messages.find(msg => msg.role === "user")?.content || "";
      
      if (!userMessage) {
        toast({
          title: "Lỗi",
          description: "Không có nội dung để tạo. Vui lòng nhập thông tin.",
          variant: "destructive"
        });
        setIsLoading(false);
        return null;
      }
      
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
      
      // Gửi tin nhắn của người dùng
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      let responseText = response.text();
      
      // Xử lý và trả về kết quả
      if (responseText) {
        responseText = cleanAsterisks(responseText);
        return responseText;
      } else {
        // Xử lý trường hợp không có phản hồi
        console.error("Không nhận được phản hồi từ API");
        return "Không thể tạo nội dung. Vui lòng thử lại sau.";
      }
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
