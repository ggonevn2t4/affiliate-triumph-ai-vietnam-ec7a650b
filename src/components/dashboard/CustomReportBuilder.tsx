
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilePen, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface CustomReportConfig {
  metrics: string[];
  timeRange: string;
  filters: Record<string, any>;
}

const CustomReportBuilder = ({ teamId }: { teamId: string }) => {
  const { user } = useAuth();
  const [reportName, setReportName] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveReport = async () => {
    try {
      // Mock successful report creation instead of using Supabase
      toast({
        title: "Báo cáo đã được tạo",
        description: "Báo cáo mới đã được lưu thành công.",
      });
      
      setReportName('');
      setDescription('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi khi tạo báo cáo",
        description: "Đã xảy ra lỗi khi lưu báo cáo. Vui lòng thử lại.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilePen className="h-5 w-5 mr-2" />
          Tạo báo cáo tùy chỉnh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Tên báo cáo"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
          <Input
            placeholder="Mô tả báo cáo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={handleSaveReport} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Lưu báo cáo
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomReportBuilder;
