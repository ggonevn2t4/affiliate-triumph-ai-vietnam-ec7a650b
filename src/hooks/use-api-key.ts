
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseApiKeyOptions {
  storageKey?: string;
  onApiKeyChange?: (apiKey: string | null) => void;
}

// IMPORTANT: Replacing the API key with the user-provided key
const CONFIGURED_API_KEY = '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';

export const useApiKey = (options: UseApiKeyOptions = {}) => {
  const { onApiKeyChange } = options;
  
  const [apiKey] = useState<string>(CONFIGURED_API_KEY);

  useEffect(() => {
    if (onApiKeyChange) {
      onApiKeyChange(CONFIGURED_API_KEY);
    }
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
