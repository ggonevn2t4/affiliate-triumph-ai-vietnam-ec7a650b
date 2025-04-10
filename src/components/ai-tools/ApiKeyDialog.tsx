
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
import { Button } from "@/components/ui/button";
import { Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGeminiApi } from "@/hooks/use-gemini-api";

interface ApiKeyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
  const { genAI } = useGeminiApi();
  const [apiStatus, setApiStatus] = useState<"configured" | "missing" | "checking">("checking");
  
  useEffect(() => {
    // Kiểm tra trạng thái API key
    if (genAI) {
      setApiStatus("configured");
    } else {
      setApiStatus("missing");
    }
  }, [genAI]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Trạng thái API
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thông tin API Google Gemini</DialogTitle>
          <DialogDescription>
            Ứng dụng sử dụng API Google Gemini được cấu hình bởi hệ thống.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {apiStatus === "checking" && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              <div>
                <h3 className="font-medium text-blue-800">Đang kiểm tra</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Vui lòng đợi trong khi hệ thống kiểm tra trạng thái API...
                </p>
              </div>
            </div>
          )}
          
          {apiStatus === "configured" && (
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">API đã được cấu hình</h3>
                <p className="text-sm text-green-700 mt-1">
                  Hệ thống đã cấu hình API Google Gemini. Bạn có thể sử dụng tất cả các tính năng AI.
                </p>
              </div>
            </div>
          )}
          
          {apiStatus === "missing" && (
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">API chưa được cấu hình</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Hệ thống chưa cấu hình API Google Gemini. Vui lòng liên hệ quản trị viên để kích hoạt tính năng AI.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">Thông báo</h3>
              <p className="text-sm text-gray-700 mt-1">
                Tính năng AI sử dụng API key của hệ thống. Người dùng không cần cung cấp API key riêng.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange && onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
