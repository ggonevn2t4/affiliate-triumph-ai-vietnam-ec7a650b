
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useApiKey } from '@/hooks/use-api-key';

interface ApiKeyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (apiKey: string) => void;
  storageKey?: string;
}

const ApiKeyDialog = ({ 
  open: controlledOpen, 
  onOpenChange,
  onSave,
  storageKey = 'openai_api_key'
}: ApiKeyDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { saveApiKey, isConfigured } = useApiKey({ 
    storageKey, 
    onApiKeyChange: onSave 
  });

  const isControlled = controlledOpen !== undefined;
  const currentOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  // Check for existing API key
  useEffect(() => {
    const existingKey = localStorage.getItem(storageKey);
    if (existingKey) {
      setInputValue(existingKey);
    }
  }, [storageKey]);

  const handleSaveApiKey = () => {
    if (!inputValue || inputValue.trim().length < 10) {
      toast({
        title: "Lỗi",
        description: "API key không hợp lệ. Vui lòng kiểm tra lại.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      localStorage.setItem(storageKey, inputValue);
      
      if (saveApiKey) {
        saveApiKey(inputValue);
      }
      
      if (onSave) {
        onSave(inputValue);
      }
      
      setOpen?.(false);
      
      toast({
        title: "Thành công",
        description: "API key đã được lưu thành công.",
      });
      
      // Force page reload to apply new API key
      window.location.reload();
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu API key. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog 
      open={currentOpen} 
      onOpenChange={(open) => setOpen?.(open)}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Key className="h-4 w-4 mr-2" />
          {isConfigured ? "Cập nhật API key" : "Cấu hình API"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cấu hình API key</DialogTitle>
          <DialogDescription>
            Nhập API key của bạn để sử dụng các tính năng AI. Bạn có thể lấy API key từ trang OpenRouter hoặc sử dụng API key mặc định.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right">
              API Key
            </Label>
            <Input
              id="api-key"
              type="password" 
              placeholder="sk-or-..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            API key được lưu trữ an toàn trong trình duyệt của bạn và không được gửi đến máy chủ của chúng tôi.
            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-1">
              Nhận API key từ OpenRouter
            </a>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen?.(false)}>
            Hủy
          </Button>
          <Button onClick={handleSaveApiKey}>
            Lưu API key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
