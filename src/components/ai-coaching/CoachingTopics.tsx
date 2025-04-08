
import { Sparkles, Compass, Book, TrendingUp, MessageSquare } from "lucide-react";

interface CoachingTopicProps {
  onSelectTopic: (topic: string) => void;
}

const CoachingTopics = ({ onSelectTopic }: CoachingTopicProps) => {
  const topics = [
    {
      id: "beginner-guide",
      title: "Hướng dẫn cho người mới",
      description: "Học cách bắt đầu với Affiliate Marketing từ con số 0",
      icon: <Book className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      id: "content-strategy",
      title: "Chiến lược nội dung",
      description: "Tạo nội dung hấp dẫn để tăng tỷ lệ chuyển đổi",
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      id: "marketing-channels",
      title: "Kênh marketing hiệu quả",
      description: "Lựa chọn và tối ưu hóa các kênh phù hợp với thương hiệu của bạn",
      icon: <Compass className="h-8 w-8 text-green-500" />,
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      id: "trend-analysis",
      title: "Phân tích xu hướng",
      description: "Nhận diện và tận dụng xu hướng thị trường mới nhất",
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      id: "custom-advice",
      title: "Tư vấn tùy chỉnh",
      description: "Nhận lời khuyên cá nhân hóa dựa trên mục tiêu của bạn",
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-brand-blue" />
        Chọn chủ đề bạn muốn được tư vấn
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {topics.map(topic => (
          <div 
            key={topic.id}
            onClick={() => onSelectTopic(topic.title)}
            className={`cursor-pointer p-6 border rounded-xl transition-all ${topic.color} hover:shadow-md`}
          >
            <div className="mb-4">
              {topic.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
            <p className="text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachingTopics;
