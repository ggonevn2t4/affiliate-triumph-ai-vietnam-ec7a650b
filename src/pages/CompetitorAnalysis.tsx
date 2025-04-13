
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Target, Filter, LineChart, Search, Users, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CompetitorComparisonChart from '@/components/competitors/CompetitorComparisonChart';
import CompetitorInsightsTable from '@/components/competitors/CompetitorInsightsTable';
import CompetitorBenchmarkScores from '@/components/competitors/CompetitorBenchmarkScores';

const CompetitorAnalysis = () => {
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
            <h1 className="text-xl font-bold">Phân tích đối thủ</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Tìm đối thủ
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Activity className="h-4 w-4 mr-2" />
              Báo cáo mới
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Phân tích đối thủ cạnh tranh</h2>
          <p className="text-gray-500">So sánh chiến dịch của bạn với các đối thủ trong ngành</p>
        </div>

        <Tabs defaultValue="comparison" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="comparison">
              <BarChart3 className="h-4 w-4 mr-2" />
              So sánh
            </TabsTrigger>
            <TabsTrigger value="insights">
              <LineChart className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="benchmark">
              <Target className="h-4 w-4 mr-2" />
              Benchmarks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>So sánh hiệu suất đối thủ</CardTitle>
                <CardDescription>
                  So sánh chiến dịch của bạn với các đối thủ chính trong ngành
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompetitorComparisonChart className="h-80" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights từ đối thủ</CardTitle>
                <CardDescription>
                  Phân tích chiến lược và phương pháp tiếp cận của đối thủ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompetitorInsightsTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benchmark" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Benchmark ngành</CardTitle>
                <CardDescription>
                  So sánh hiệu suất của bạn với điểm chuẩn của ngành
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompetitorBenchmarkScores />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CompetitorAnalysis;
