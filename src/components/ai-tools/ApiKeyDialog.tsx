
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';
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
  storageKey
}: ApiKeyDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { saveApiKey } = useApiKey({ storageKey, onApiKeyChange: onSave });

  const isControlled = controlledOpen !== undefined;
  const currentOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleSaveApiKey = () => {
    if (saveApiKey(inputValue)) {
      setOpen?.(false);
      setInputValue('');
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
          Cấu hình API
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cấu hình API key</DialogTitle>
          <DialogDescription>
            Nhập API key của bạn để sử dụng các tính năng AI. Bạn có thể lấy API key từ trang OpenRouter.
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
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSaveApiKey}>
            Lưu API key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
