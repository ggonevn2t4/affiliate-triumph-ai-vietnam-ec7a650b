
import React from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BankTransferInfo = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<string | null>(null);

  const bankDetails = {
    accountNumber: "8873333333",
    accountName: "Cao Nhật Quang",
    bankName: "MB Bank"
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Đã sao chép!",
      description: "Đã sao chép thông tin vào clipboard",
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="border rounded-lg p-4 bg-muted/30">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ngân hàng</p>
              <p className="font-medium">{bankDetails.bankName}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Số tài khoản</p>
              <p className="font-medium">{bankDetails.accountNumber}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
              className="h-8 px-2 text-muted-foreground"
            >
              {copied === 'accountNumber' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Chủ tài khoản</p>
              <p className="font-medium">{bankDetails.accountName}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(bankDetails.accountName, 'accountName')}
              className="h-8 px-2 text-muted-foreground"
            >
              {copied === 'accountName' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Hướng dẫn thanh toán:</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Sao chép số tài khoản và chủ tài khoản</li>
          <li>Mở ứng dụng ngân hàng của bạn và tạo giao dịch chuyển khoản mới</li>
          <li>Dán thông tin tài khoản và nhập số tiền cần thanh toán</li>
          <li>Trong phần nội dung chuyển khoản, hãy ghi rõ tên gói dịch vụ</li>
          <li>Xác nhận và hoàn tất giao dịch</li>
          <li>Gửi biên lai giao dịch đến email: support@affiliatevn.vn</li>
        </ol>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm">
        <p>
          <strong>Lưu ý:</strong> Tài khoản của bạn sẽ được kích hoạt trong vòng 24 giờ sau khi chúng tôi xác nhận thanh toán. Nếu bạn cần kích hoạt ngay, vui lòng liên hệ với chúng tôi qua Zalo: 0708684608
        </p>
      </div>
    </div>
  );
};

export default BankTransferInfo;
