
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';
import { toast } from 'sonner';

const ApiKeyDialog = () => {
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);

  const handleSaveApiKey = () => {
    // In a real implementation, we would save this securely or use it to make authenticated requests
    // For this demo, we'll just show a success message
    if (apiKey.trim()) {
      localStorage.setItem('openrouter_api_key', apiKey.trim());
      toast.success('API key đã được lưu thành công!');
      setOpen(false);
    } else {
      toast.error('Vui lòng nhập API key hợp lệ');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            API key được lưu trữ an toàn trong trình duyệt của bạn và không được gửi đến máy chủ của chúng tôi.
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" onClick={handleSaveApiKey}>
            Lưu API key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
