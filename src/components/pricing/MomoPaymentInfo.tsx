
import React from "react";
import { CopyIcon, CheckIcon, ScanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MomoPaymentInfo = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<string | null>(null);

  const momoDetails = {
    phoneNumber: "0708684608",
    accountName: "Cao Nhật Quang"
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
      <div className="flex justify-center mb-6">
        <div className="border-2 border-pink-500 p-2 rounded-lg inline-block bg-white">
          <div className="p-2 flex items-center justify-center bg-pink-50 rounded-md w-48 h-48">
            <div className="text-center">
              <ScanIcon className="w-16 h-16 text-pink-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Mã QR MoMo mẫu</p>
              <p className="text-xs text-pink-400 mt-1">Quét để thanh toán</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 bg-muted/30">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Số điện thoại Momo</p>
              <p className="font-medium">{momoDetails.phoneNumber}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(momoDetails.phoneNumber, 'phoneNumber')}
              className="h-8 px-2 text-muted-foreground"
            >
              {copied === 'phoneNumber' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Chủ tài khoản</p>
              <p className="font-medium">{momoDetails.accountName}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(momoDetails.accountName, 'accountName')}
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
          <li>Mở ứng dụng Momo trên điện thoại của bạn</li>
          <li>Chọn "Quét mã QR" hoặc "Chuyển tiền"</li>
          <li>Nhập số điện thoại Momo hoặc quét mã QR</li>
          <li>Nhập số tiền cần thanh toán</li>
          <li>Trong phần nội dung chuyển khoản, ghi rõ tên gói dịch vụ</li>
          <li>Xác nhận và hoàn tất giao dịch</li>
          <li>Chụp màn hình biên lai và gửi đến email: support@affiliatevn.vn</li>
        </ol>
      </div>
      
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-pink-800 text-sm">
        <p>
          <strong>Lưu ý:</strong> Tài khoản của bạn sẽ được kích hoạt trong vòng 24 giờ sau khi chúng tôi xác nhận thanh toán. Để được kích hoạt nhanh hơn, vui lòng liên hệ qua Zalo: 0708684608
        </p>
      </div>
    </div>
  );
};

export default MomoPaymentInfo;
