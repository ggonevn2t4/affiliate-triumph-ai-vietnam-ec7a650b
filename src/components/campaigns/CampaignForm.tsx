
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export const campaignFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên chiến dịch phải có ít nhất 2 ký tự",
  }),
  target: z.string().min(1, {
    message: "Vui lòng nhập mục tiêu chiến dịch",
  }),
  budget: z.string().min(1, {
    message: "Vui lòng nhập ngân sách chiến dịch",
  }),
  startDate: z.string().min(1, {
    message: "Vui lòng chọn ngày bắt đầu chiến dịch",
  }),
  endDate: z.string().min(1, {
    message: "Vui lòng chọn ngày kết thúc chiến dịch",
  }),
  description: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export interface CampaignFormProps {
  defaultValues?: Partial<CampaignFormValues>;
  onSubmit: (values: CampaignFormValues) => void;
  onCancel?: () => void;
  generateDescription?: (name: string, target: string, budget: string) => Promise<string | null>;
  submitText?: string;
  isSubmitting?: boolean;
  templateId?: number | null;
}

const CampaignForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  generateDescription,
  submitText = "Tạo chiến dịch",
  isSubmitting = false,
  templateId,
}: CampaignFormProps) => {
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      target: "",
      budget: "",
      startDate: "",
      endDate: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleGenerateDescription = async () => {
    if (!generateDescription) return;

    const name = form.getValues("name");
    const target = form.getValues("target");
    const budget = form.getValues("budget");
    
    setIsGeneratingDescription(true);
    
    try {
      const description = await generateDescription(name, target, budget);
      if (description) {
        form.setValue("description", description);
      }
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên chiến dịch</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên chiến dịch" {...field} />
              </FormControl>
              <FormDescription>
                Đặt tên ngắn gọn và dễ nhớ cho chiến dịch của bạn
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mục tiêu</FormLabel>
                <FormControl>
                  <Input placeholder="Mục tiêu của chiến dịch" {...field} />
                </FormControl>
                <FormDescription>
                  Ví dụ: Tăng doanh số bán hàng, Tăng nhận diện thương hiệu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngân sách</FormLabel>
                <FormControl>
                  <Input placeholder="Ngân sách cho chiến dịch" {...field} />
                </FormControl>
                <FormDescription>
                  Tổng chi phí dự kiến cho chiến dịch
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Mô tả chiến dịch</FormLabel>
                {generateDescription && (
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isGeneratingDescription}
                  >
                    {isGeneratingDescription ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Tạo bởi AI
                      </>
                    )}
                  </Button>
                )}
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả chi tiết về chiến dịch" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Mô tả rõ về chiến dịch, sản phẩm quảng bá và đối tượng mục tiêu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex justify-end space-x-4">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Hủy bỏ
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang xử lý...
              </>
            ) : (
              submitText
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignForm;
