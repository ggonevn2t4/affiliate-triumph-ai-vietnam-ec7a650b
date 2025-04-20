
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseApiKeyOptions {
  storageKey?: string;
  onApiKeyChange?: (apiKey: string | null) => void;
}

export const useApiKey = (options: UseApiKeyOptions = {}) => {
  const { 
    storageKey = 'openrouter_api_key',
    onApiKeyChange 
  } = options;
  
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return localStorage.getItem(storageKey);
  });

  const saveApiKey = (key: string) => {
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      toast({
        title: 'Vui lòng nhập API key hợp lệ',
        variant: 'destructive'
      });
      return false;
    }

    localStorage.setItem(storageKey, trimmedKey);
    setApiKey(trimmedKey);
    onApiKeyChange?.(trimmedKey);
    toast({
      title: 'API key đã được lưu thành công!',
    });
    return true;
  };

  const clearApiKey = () => {
    localStorage.removeItem(storageKey);
    setApiKey(null);
    onApiKeyChange?.(null);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem(storageKey);
    if (storedKey !== apiKey) {
      setApiKey(storedKey);
      onApiKeyChange?.(storedKey);
    }
  }, [storageKey, onApiKeyChange]);

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    isConfigured: Boolean(apiKey)
  };
};
