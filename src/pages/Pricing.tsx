
import React, { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BankTransferInfo from "@/components/pricing/BankTransferInfo";
import MomoPaymentInfo from "@/components/pricing/MomoPaymentInfo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Pricing = () => {
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);
  const [isMomoOpen, setIsMomoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPayment = (plan: string, paymentMethod: string) => {
    setSelectedPlan(plan);
    if (paymentMethod === "bank") {
      setIsBankTransferOpen(true);
    } else if (paymentMethod === "momo") {
      setIsMomoOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 px-4 md:py-24">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                Bảng Giá Dịch Vụ
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lựa chọn gói phù hợp với nhu cầu của bạn và tối ưu hóa thu nhập tiếp thị liên kết với AffiliateVN
              </p>
            </div>

            <Tabs defaultValue="monthly" className="w-full mb-8">
              <TabsList className="grid w-[300px] grid-cols-2 mx-auto mb-8">
                <TabsTrigger value="monthly">Hàng tháng</TabsTrigger>
                <TabsTrigger value="yearly">Hàng năm (Tiết kiệm 20%)</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Starter Plan */}
                  <PricingCard
                    title="Starter"
                    price="299.000đ"
                    description="Phù hợp cho người mới bắt đầu"
                    features={[
                      "5 chiến dịch tiếp thị",
                      "Công cụ phân tích cơ bản",
                      "Tạo nội dung AI tiêu chuẩn",
                      "Hỗ trợ qua email",
                      "Báo cáo hàng tuần"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Starter - 299.000đ/tháng", "bank")}
                    onMomoPayment={() => handleSelectPayment("Starter - 299.000đ/tháng", "momo")}
                  />

                  {/* Professional Plan */}
                  <PricingCard
                    title="Professional"
                    price="799.000đ"
                    description="Giải pháp cho nhà tiếp thị chuyên nghiệp"
                    popular={true}
                    features={[
                      "20 chiến dịch tiếp thị",
                      "Phân tích nâng cao",
                      "Tạo nội dung AI không giới hạn",
                      "Hỗ trợ ưu tiên 24/7",
                      "Phân tích đối thủ cạnh tranh",
                      "Tích hợp công cụ mạng xã hội",
                      "Báo cáo tùy chỉnh"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Professional - 799.000đ/tháng", "bank")}
                    onMomoPayment={() => handleSelectPayment("Professional - 799.000đ/tháng", "momo")}
                  />

                  {/* Enterprise Plan */}
                  <PricingCard
                    title="Enterprise"
                    price="1.999.000đ"
                    description="Dành cho doanh nghiệp và đội nhóm"
                    features={[
                      "Chiến dịch không giới hạn",
                      "Phân tích chuyên sâu",
                      "Tất cả tính năng AI nâng cao",
                      "Hỗ trợ 24/7 với quản lý riêng",
                      "Đào tạo và tư vấn 1:1",
                      "API tùy chỉnh",
                      "Báo cáo theo thời gian thực",
                      "Tuỳ chỉnh thương hiệu"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Enterprise - 1.999.000đ/tháng", "bank")}
                    onMomoPayment={() => handleSelectPayment("Enterprise - 1.999.000đ/tháng", "momo")}
                  />
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Starter Plan Yearly */}
                  <PricingCard
                    title="Starter"
                    price="2.870.000đ"
                    description="Phù hợp cho người mới bắt đầu"
                    features={[
                      "5 chiến dịch tiếp thị",
                      "Công cụ phân tích cơ bản",
                      "Tạo nội dung AI tiêu chuẩn",
                      "Hỗ trợ qua email",
                      "Báo cáo hàng tuần"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Starter - 2.870.000đ/năm", "bank")}
                    onMomoPayment={() => handleSelectPayment("Starter - 2.870.000đ/năm", "momo")}
                  />

                  {/* Professional Plan Yearly */}
                  <PricingCard
                    title="Professional"
                    price="7.670.000đ"
                    description="Giải pháp cho nhà tiếp thị chuyên nghiệp"
                    popular={true}
                    features={[
                      "20 chiến dịch tiếp thị",
                      "Phân tích nâng cao",
                      "Tạo nội dung AI không giới hạn",
                      "Hỗ trợ ưu tiên 24/7",
                      "Phân tích đối thủ cạnh tranh",
                      "Tích hợp công cụ mạng xã hội",
                      "Báo cáo tùy chỉnh"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Professional - 7.670.000đ/năm", "bank")}
                    onMomoPayment={() => handleSelectPayment("Professional - 7.670.000đ/năm", "momo")}
                  />

                  {/* Enterprise Plan Yearly */}
                  <PricingCard
                    title="Enterprise"
                    price="19.190.000đ"
                    description="Dành cho doanh nghiệp và đội nhóm"
                    features={[
                      "Chiến dịch không giới hạn",
                      "Phân tích chuyên sâu",
                      "Tất cả tính năng AI nâng cao",
                      "Hỗ trợ 24/7 với quản lý riêng",
                      "Đào tạo và tư vấn 1:1",
                      "API tùy chỉnh",
                      "Báo cáo theo thời gian thực",
                      "Tuỳ chỉnh thương hiệu"
                    ]}
                    onBankTransfer={() => handleSelectPayment("Enterprise - 19.190.000đ/năm", "bank")}
                    onMomoPayment={() => handleSelectPayment("Enterprise - 19.190.000đ/năm", "momo")}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* FAQ section */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-10">Câu Hỏi Thường Gặp</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <FaqItem 
                  question="Tôi có thể nâng cấp hoặc hạ cấp gói dịch vụ không?" 
                  answer="Bạn có thể dễ dàng nâng cấp hoặc hạ cấp gói dịch vụ vào bất kỳ lúc nào. Khi nâng cấp, bạn sẽ được tính phí theo tỷ lệ cho thời gian còn lại trong chu kỳ thanh toán hiện tại. Khi hạ cấp, thay đổi sẽ có hiệu lực vào đầu chu kỳ thanh toán tiếp theo."
                />
                <FaqItem 
                  question="Có giảm giá cho sinh viên không?" 
                  answer="Có, chúng tôi cung cấp giảm giá 30% cho sinh viên. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi với email sinh viên của bạn để xác minh tình trạng và nhận mã giảm giá."
                />
                <FaqItem 
                  question="Tôi có thể hủy gói dịch vụ bất kỳ lúc nào không?" 
                  answer="Bạn có thể hủy đăng ký của mình bất kỳ lúc nào. Sau khi hủy, bạn sẽ tiếp tục có quyền truy cập vào dịch vụ cho đến khi kết thúc chu kỳ thanh toán hiện tại."
                />
                <FaqItem 
                  question="Làm thế nào để nhận hóa đơn VAT?" 
                  answer="Bạn có thể yêu cầu hóa đơn VAT trong phần 'Hóa đơn' của tài khoản của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi với thông tin công ty của bạn, và chúng tôi sẽ gửi hóa đơn cho bạn."
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bank Transfer Dialog */}
      <Dialog open={isBankTransferOpen} onOpenChange={setIsBankTransferOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanh toán chuyển khoản ngân hàng</DialogTitle>
            <DialogDescription>
              Vui lòng chuyển khoản với nội dung: <span className="font-semibold">{selectedPlan}</span>
            </DialogDescription>
          </DialogHeader>
          <BankTransferInfo />
        </DialogContent>
      </Dialog>

      {/* Momo Dialog */}
      <Dialog open={isMomoOpen} onOpenChange={setIsMomoOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanh toán qua ví Momo</DialogTitle>
            <DialogDescription>
              Vui lòng quét mã QR hoặc chuyển khoản qua Momo với nội dung: <span className="font-semibold">{selectedPlan}</span>
            </DialogDescription>
          </DialogHeader>
          <MomoPaymentInfo />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false,
  onBankTransfer,
  onMomoPayment
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  onBankTransfer: () => void;
  onMomoPayment: () => void;
}) => {
  return (
    <Card className={`flex flex-col h-full ${popular ? 'border-brand-blue shadow-lg ring-2 ring-brand-blue relative' : 'border-gray-200'}`}>
      {popular && (
        <div className="absolute -top-4 left-0 w-full flex justify-center">
          <div className="bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-medium">
            Phổ biến nhất
          </div>
        </div>
      )}
      <CardHeader className={`${popular ? 'pt-8' : 'pt-6'}`}>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {title !== "Enterprise" && <span className="text-gray-500 ml-1">/tháng</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="text-center text-sm mb-2">Phương thức thanh toán</div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            onClick={onBankTransfer}
            variant="outline" 
            className="w-full"
          >
            Chuyển khoản
          </Button>
          <Button 
            onClick={onMomoPayment}
            variant="outline" 
            className="w-full text-pink-500 border-pink-300 hover:bg-pink-50"
          >
            Ví Momo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};

export default Pricing;
