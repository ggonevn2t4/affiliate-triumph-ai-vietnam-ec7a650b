
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key, Info, ExternalLink, AlertCircle } from 'lucide-react';
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
  storageKey = 'openrouter_api_key'
}: ApiKeyDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { saveApiKey, isConfigured, apiKey } = useApiKey({ 
    storageKey, 
    onApiKeyChange: onSave 
  });

  const isControlled = controlledOpen !== undefined;
  const currentOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleSaveApiKey = () => {
    try {
      // Call saveApiKey without arguments
      saveApiKey();
      
      setOpen?.(false);
      
      toast({
        title: "Thông báo",
        description: "API key đã được cấu hình sẵn trong hệ thống.",
      });
    } catch (error) {
      console.error("Error with API key:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cấu hình API key. Vui lòng thử lại sau.",
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
        <Button variant="outline" size="sm" className="flex items-center">
          <Key className="h-4 w-4 mr-2" />
          {isConfigured ? "Cấu hình sẵn" : "Cấu hình API"}
          {!isConfigured && <span className="ml-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API OpenRouter đã được cấu hình sẵn</DialogTitle>
          <DialogDescription>
            Hệ thống đang sử dụng API key được cấu hình sẵn. Bạn không cần phải nhập API key riêng.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md border border-gray-100">
          <div className="flex items-start gap-2 mb-2">
            <Info className="h-4 w-4 mt-0.5 text-blue-500" />
            <p>Hệ thống đang sử dụng API key đã được cấu hình sẵn để đảm bảo tính ổn định.</p>
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-blue-800 text-xs">
              Hệ thống đang sử dụng model <strong>anthropic/claude-3-sonnet</strong> và <strong>anthropic/claude-3-haiku</strong> cho các tính năng AI.
            </p>
          </div>
          {isConfigured ? (
            <div className="mt-2 p-2 bg-green-50 rounded-md">
              <p className="text-green-800 text-xs flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                API key đã cấu hình và sẵn sàng sử dụng
              </p>
            </div>
          ) : (
            <div className="mt-2 p-2 bg-red-50 rounded-md">
              <p className="text-red-800 text-xs flex items-center">
                <AlertCircle className="h-4 w-4 mr-1.5" />
                API key chưa được cấu hình hoặc không hợp lệ
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.open('https://openrouter.ai/keys', '_blank')}>
            <ExternalLink className="h-4 w-4 mr-1.5" /> Tạo OpenRouter API key mới
          </Button>
          <Button onClick={() => setOpen?.(false)}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
