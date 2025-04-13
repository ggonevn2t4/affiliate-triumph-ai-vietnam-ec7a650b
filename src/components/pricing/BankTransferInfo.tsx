
import React from "react";
import { CopyIcon, CheckIcon, Building, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-8 py-4">
      <Card className="overflow-hidden shadow-md border-accent/20">
        <div className="bg-gradient-primary p-4 text-white flex items-center gap-3">
          <Landmark className="h-5 w-5" />
          <h3 className="font-medium">Thông tin chuyển khoản ngân hàng</h3>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ngân hàng</p>
                <p className="font-semibold text-lg">{bankDetails.bankName}</p>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Số tài khoản</p>
                <p className="font-semibold text-lg">{bankDetails.accountNumber}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                className="h-9 border-accent/30 hover:bg-accent/10 hover:text-accent transition-all"
              >
                {copied === 'accountNumber' ? 
                  <span className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    Đã sao chép
                  </span> : 
                  <span className="flex items-center gap-1">
                    <CopyIcon className="h-4 w-4" />
                    Sao chép
                  </span>
                }
              </Button>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chủ tài khoản</p>
                <p className="font-semibold text-lg">{bankDetails.accountName}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(bankDetails.accountName, 'accountName')}
                className="h-9 border-accent/30 hover:bg-accent/10 hover:text-accent transition-all"
              >
                {copied === 'accountName' ? 
                  <span className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    Đã sao chép
                  </span> : 
                  <span className="flex items-center gap-1">
                    <CopyIcon className="h-4 w-4" />
                    Sao chép
                  </span>
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-lg flex items-center gap-2">
          <span className="inline-flex items-center justify-center bg-secondary/80 text-secondary-foreground w-6 h-6 rounded-full text-sm">?</span>
          Hướng dẫn thanh toán
        </h4>
        <ol className="list-decimal list-inside space-y-3 text-sm bg-muted/30 p-4 rounded-lg border border-border/50">
          <li className="pl-2">Sao chép số tài khoản và chủ tài khoản</li>
          <li className="pl-2">Mở ứng dụng ngân hàng của bạn và tạo giao dịch chuyển khoản mới</li>
          <li className="pl-2">Dán thông tin tài khoản và nhập số tiền cần thanh toán</li>
          <li className="pl-2">Trong phần nội dung chuyển khoản, hãy ghi rõ tên gói dịch vụ</li>
          <li className="pl-2">Xác nhận và hoàn tất giao dịch</li>
          <li className="pl-2">Gửi biên lai giao dịch đến email: <span className="text-primary font-medium">support@affiliatevn.vn</span></li>
        </ol>
      </div>
      
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 text-amber-800 text-sm flex items-start gap-3">
        <div className="bg-amber-500/20 p-1 rounded-full mt-0.5">
          <span className="text-amber-500 font-bold text-lg leading-none">!</span>
        </div>
        <div>
          <p className="font-semibold mb-1">Lưu ý:</p>
          <p>
            Tài khoản của bạn sẽ được kích hoạt trong vòng 24 giờ sau khi chúng tôi xác nhận thanh toán. Nếu bạn cần kích hoạt ngay, vui lòng liên hệ với chúng tôi qua Zalo: <span className="font-medium">0708684608</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankTransferInfo;
