
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseApiKeyOptions {
  storageKey?: string;
  onApiKeyChange?: (apiKey: string | null) => void;
}

// Replace this with your actual, complete OpenRouter API key
const CONFIGURED_API_KEY = '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';

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
