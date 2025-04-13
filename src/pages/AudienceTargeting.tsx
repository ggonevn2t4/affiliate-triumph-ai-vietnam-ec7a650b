
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Filter, PieChart, Radar, BarChart, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AudienceSegmentation from '@/components/audience/AudienceSegmentation';
import AudienceDemographics from '@/components/audience/AudienceDemographics';
import AudienceInterests from '@/components/audience/AudienceInterests';

const AudienceTargeting = () => {
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
            <h1 className="text-xl font-bold">Nhắm mục tiêu khán giả</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Save className="h-4 w-4 mr-2" />
              Lưu phân khúc
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Phân tích và nhắm mục tiêu khán giả</h2>
          <p className="text-gray-500">Tạo và quản lý các phân khúc khán giả để tối ưu hóa các chiến dịch của bạn</p>
        </div>

        <Tabs defaultValue="segmentation" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="segmentation">
              <PieChart className="h-4 w-4 mr-2" />
              Phân khúc
            </TabsTrigger>
            <TabsTrigger value="demographics">
              <Users className="h-4 w-4 mr-2" />
              Nhân khẩu học
            </TabsTrigger>
            <TabsTrigger value="interests">
              <Radar className="h-4 w-4 mr-2" />
              Sở thích
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="segmentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tạo phân khúc khán giả</CardTitle>
                <CardDescription>
                  Tạo và quản lý phân khúc khán giả dựa trên nhiều tiêu chí
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AudienceSegmentation />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin nhân khẩu học</CardTitle>
                <CardDescription>
                  Phân tích chi tiết về nhân khẩu học của khán giả của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AudienceDemographics />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sở thích & Hành vi</CardTitle>
                <CardDescription>
                  Khám phá sở thích, hành vi và nhu cầu của khán giả của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AudienceInterests />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AudienceTargeting;
