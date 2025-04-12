
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import CampaignForm from '@/components/campaigns/CampaignForm';
import CampaignTemplates from '@/components/campaigns/CampaignTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateCampaign = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("templates");
  
  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplateId(templateId);
    setActiveTab("custom");
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="templates" className="flex items-center">
              <LayoutTemplate className="mr-2 h-4 w-4" />
              Mẫu có sẵn
            </TabsTrigger>
            <TabsTrigger value="custom">
              Tùy chỉnh
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <CampaignTemplates onSelectTemplate={handleSelectTemplate} />
          </TabsContent>
          
          <TabsContent value="custom">
            <CampaignForm templateId={selectedTemplateId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CreateCampaign;
