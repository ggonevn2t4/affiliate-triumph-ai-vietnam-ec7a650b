
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
import { Settings, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ApiKeyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
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
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Thông báo</h3>
              <p className="text-sm text-amber-700 mt-1">
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
