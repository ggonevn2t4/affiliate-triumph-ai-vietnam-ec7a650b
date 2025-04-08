
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, Compass, Sparkles, MessageSquare, Lightbulb, ArrowRight, BookUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AiCoachingChat from "@/components/ai-coaching/AiCoachingChat";
import CoachingTopics from "@/components/ai-coaching/CoachingTopics";
import CoachingSidebar from "@/components/ai-coaching/CoachingSidebar";

const AiCoaching = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    toast({
      title: "Chủ đề đã được chọn",
      description: `Bạn đã chọn chủ đề: ${topic}`,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại bảng điều khiển
              </Button>
            </Link>
            <h1 className="text-xl font-bold">AI Coaching</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Lịch sử hội thoại
            </Button>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center">
              TA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <CoachingSidebar />
          
          {/* Main content */}
          <div className="lg:col-span-10 space-y-6">
            {/* Welcome banner */}
            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">AI Coaching cá nhân hóa</h2>
              <p className="mb-4 opacity-90">Nhận lời khuyên và chiến lược chuyên sâu từ trợ lý AI để phát triển sự nghiệp Affiliate Marketing của bạn!</p>
              <div className="flex items-center space-x-4">
                <Button className="bg-white text-brand-blue hover:bg-blue-50 flex items-center">
                  <BookUser className="h-4 w-4 mr-2" />
                  Hướng dẫn sử dụng
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 flex items-center">
                  <Compass className="h-4 w-4 mr-2" />
                  Khám phá tính năng
                </Button>
              </div>
            </div>

            {!selectedTopic ? (
              <CoachingTopics onSelectTopic={handleTopicSelect} />
            ) : (
              <AiCoachingChat selectedTopic={selectedTopic} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiCoaching;
