
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CampaignForm, { CampaignFormValues } from "@/components/campaigns/CampaignForm";
import ApiKeyDialog from "@/components/ai-tools/ApiKeyDialog";
import { useOpenAiApi } from "@/hooks/use-openai-api";

const DEFAULT_API_KEY = "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";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
  
  useEffect(() => {
    // Lưu API key mặc định nếu chưa có
    if (!localStorage.getItem('openai-api-key')) {
      localStorage.setItem('openai-api-key', DEFAULT_API_KEY);
    }
  }, []);
  
  const { generateCompletion, isLoading: isAiLoading } = useOpenAiApi({
    onApiKeyMissing: () => setIsKeyDialogOpen(true)
  });

  const cleanAsterisks = (text: string): string => {
    return text ? text.replace(/\*\*/g, "") : text;
  };

  const onSubmit = async (values: CampaignFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Creating campaign:", values);
      // In a real app, you would send this data to your API
      // For now, we'll just show a success message
      
      toast({
        title: "Chiến dịch đã được tạo",
        description: `Chiến dịch "${values.name}" đã được tạo thành công.`,
      });
      
      // Redirect to dashboard after successful creation
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể tạo chiến dịch. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDescription = async (name: string, target: string, budget: string) => {
    if (!name || !target) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên chiến dịch và mục tiêu để tạo mô tả",
        variant: "destructive",
      });
      return null;
    }

    try {
      const prompt = `Tạo mô tả chiến dịch affiliate marketing với tên "${name}", mục tiêu "${target}" và ngân sách "${budget}". Mô tả nên ngắn gọn, súc tích và thể hiện rõ giá trị của chiến dịch. QUAN TRỌNG: KHÔNG sử dụng ký tự ** trong nội dung.`;
      
      let result = await generateCompletion([
        { role: "system", content: "Bạn là trợ lý viết nội dung affiliate marketing chuyên nghiệp. Hãy tạo mô tả chiến dịch súc tích, hấp dẫn và thuyết phục. Không sử dụng ký tự ** trong nội dung." },
        { role: "user", content: prompt }
      ]);

      if (result) {
        result = cleanAsterisks(result);
      }

      return result;
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo mô tả chiến dịch. Vui lòng thử lại.",
        variant: "destructive",
      });
      return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Tạo chiến dịch mới</h1>
          </div>
          <ApiKeyDialog open={isKeyDialogOpen} onOpenChange={setIsKeyDialogOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CampaignForm
            onSubmit={onSubmit}
            onCancel={() => navigate("/dashboard")}
            generateDescription={generateDescription}
            isSubmitting={isSubmitting || isAiLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;
