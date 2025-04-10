
import { BookUser, MessageSquare, Compass, Lightbulb, Star, PenSquare } from "lucide-react";

const CoachingSidebar = () => {
  return (
    <div className="lg:col-span-2 hidden lg:block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
        <nav>
          <ul className="space-y-1">
            <li>
              <a 
                href="/ai-coaching" 
                className="flex items-center px-3 py-2 text-sm font-medium bg-brand-blue/10 text-brand-blue rounded-md"
              >
                <BookUser className="h-4 w-4 mr-3" />
                Coaching AI
              </a>
            </li>
            <li>
              <a 
                href="/ai-tools" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <PenSquare className="h-4 w-4 mr-3" />
                Công cụ AI
              </a>
            </li>
            <li>
              <a 
                href="/ai-coaching/history" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Lịch sử hội thoại
              </a>
            </li>
            <li>
              <a 
                href="/ai-coaching/resources" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Compass className="h-4 w-4 mr-3" />
                Tài nguyên học tập
              </a>
            </li>
            <li>
              <a 
                href="/ai-coaching/tips" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Lightbulb className="h-4 w-4 mr-3" />
                Mẹo và chiến thuật
              </a>
            </li>
            <li>
              <a 
                href="/ai-coaching/success-stories" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Star className="h-4 w-4 mr-3" />
                Câu chuyện thành công
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CoachingSidebar;
