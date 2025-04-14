import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Magic, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { toast } from "sonner";
import SocialShareWidget from '@/components/ai-tools/SocialShareWidget';
import OptimusAlphaGenerator from '@/components/ai-tools/OptimusAlphaGenerator';

const AiTools = () => {
  const [articleTopic, setArticleTopic] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateArticle = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedArticle(`Đây là bài viết mẫu về chủ đề ${articleTopic}.`);
    setIsGenerating(false);
    
    toast.success("Bài viết đã được tạo thành công!");
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
            <h1 className="text-xl font-bold">Công cụ AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Hướng dẫn
            </Button>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Sức mạnh của AI trong tầm tay bạn</h2>
          <p className="text-gray-500">Sử dụng các công cụ AI để tạo nội dung, tối ưu hóa chiến dịch và hơn thế nữa</p>
        </div>

        <Tabs defaultValue="article-generator" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="article-generator">
              <Magic className="h-4 w-4 mr-2" />
              Tạo bài viết
            </TabsTrigger>
            <TabsTrigger value="optimus-alpha">
              <Sparkles className="h-4 w-4 mr-2" />
              Optimus Alpha
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="article-generator" className="space-y-6">
            <Card className="w-full shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="h-5 w-5 mr-2 text-amber-500" />
                  Công cụ tạo bài viết AI
                </CardTitle>
                <CardDescription>
                  Nhập chủ đề và AI sẽ tạo một bài viết hoàn chỉnh cho bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="article-topic">Chủ đề bài viết</Label>
                  <Input
                    id="article-topic"
                    placeholder="Ví dụ: Top 5 sản phẩm affiliate marketing"
                    value={articleTopic}
                    onChange={(e) => setArticleTopic(e.target.value)}
                  />
                </div>
                
                {generatedArticle && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="generated-article">Bài viết đã tạo</Label>
                    <Textarea
                      id="generated-article"
                      value={generatedArticle}
                      readOnly
                      className="min-h-[100px]"
                    />
                    <SocialShareWidget content={generatedArticle} title="Bài viết Affiliate Marketing" />
                  </div>
                )}
              </CardContent>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={handleGenerateArticle}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Tạo bài viết
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="optimus-alpha">
            <OptimusAlphaGenerator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AiTools;
