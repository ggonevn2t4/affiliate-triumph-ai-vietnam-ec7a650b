
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Xóa khóa API mặc định đã bị đình chỉ
const GEMINI_API_KEY_NAME = 'gemini-api-key';

interface ApiKeyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(GEMINI_API_KEY_NAME) || "";
  });

  const saveApiKey = (key: string) => {
    if (key) {
      setApiKey(key);
      localStorage.setItem(GEMINI_API_KEY_NAME, key);
      if (onOpenChange) onOpenChange(false);
      toast({
        title: "Cập nhật API Key",
        description: "Google Gemini API key của bạn đã được cập nhật thành công."
      });
    } else {
      toast({
        title: "Lỗi",
        description: "API key không được để trống.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Cài đặt API
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Google Gemini API Key</DialogTitle>
          <DialogDescription>
            Nhập Google Gemini API key của bạn để sử dụng dịch vụ AI. API key sẽ được lưu trên trình duyệt của bạn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="col-span-4">
              API Key
            </Label>
            <Input
              id="api-key"
              type="password" 
              placeholder="Nhập API key của bạn..."
              className="col-span-4"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="col-span-4 text-sm text-amber-600">
            Khóa API trước đó đã bị đình chỉ. Vui lòng nhập khóa API mới từ Google AI Studio.
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => saveApiKey(apiKey)}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
