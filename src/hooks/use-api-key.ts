
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseApiKeyOptions {
  storageKey?: string;
  onApiKeyChange?: (apiKey: string | null) => void;
}

// IMPORTANT: Replacing the API key with the user-provided key
// Lưu ý: Đây là API key mẫu, bạn nên thay bằng API key thật của bạn
const CONFIGURED_API_KEY = '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';

export const useApiKey = (options: UseApiKeyOptions = {}) => {
  const { onApiKeyChange } = options;
  
  const [apiKey] = useState<string>(CONFIGURED_API_KEY);
  const [isConfigured, setIsConfigured] = useState(!!CONFIGURED_API_KEY);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của API key
    const checkApiKey = async () => {
      if (!CONFIGURED_API_KEY) {
        setIsConfigured(false);
        return;
      }

      try {
        // Không cần thực hiện API call thật để kiểm tra, chỉ cần kiểm tra format
        if (CONFIGURED_API_KEY.startsWith('sk-or-')) {
          setIsConfigured(true);
          if (onApiKeyChange) {
            onApiKeyChange(CONFIGURED_API_KEY);
          }
        } else {
          setIsConfigured(false);
          console.error('API key không đúng định dạng OpenRouter');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra API key:', error);
        setIsConfigured(false);
      }
    };

    checkApiKey();
  }, [onApiKeyChange]);

  return {
    apiKey,
    isConfigured,
    saveApiKey: () => {
      toast({
        title: "API đã được cấu hình sẵn",
        description: "Bạn không thể thay đổi API key.",
        variant: "default",
      });
      return false;
    },
    clearApiKey: () => {
      toast({
        title: "API đã được cấu hình sẵn",
        description: "Bạn không thể xóa API key.",
        variant: "default",
      });
    }
  };
};
