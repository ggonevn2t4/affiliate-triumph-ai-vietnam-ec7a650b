
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseApiKeyOptions {
  storageKey?: string;
  onApiKeyChange?: (apiKey: string | null) => void;
}

// API key được cấu hình sẵn
const CONFIGURED_API_KEY = 'sk-or-v1-...'; // Thay thế bằng API key thật của bạn

export const useApiKey = (options: UseApiKeyOptions = {}) => {
  const { onApiKeyChange } = options;
  
  const [apiKey] = useState<string>(CONFIGURED_API_KEY);

  useEffect(() => {
    onApiKeyChange?.(CONFIGURED_API_KEY);
  }, [onApiKeyChange]);

  return {
    apiKey,
    isConfigured: true,
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
