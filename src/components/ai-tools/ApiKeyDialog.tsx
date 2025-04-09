
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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

interface ApiKeyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai-api-key");
    return savedKey || "";
  });
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai-api-key", key);
    handleOpenChange(false);
    toast({
      title: "Cập nhật API Key",
      description: "API key của bạn đã được cập nhật thành công."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Cài đặt API
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Nhập API key OpenAI của bạn để sử dụng dịch vụ AI. API key sẽ được lưu trên trình duyệt của bạn.
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
              placeholder="sk-..."
              className="col-span-4"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
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
