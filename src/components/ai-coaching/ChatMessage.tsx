
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card 
        className={`max-w-[80%] p-3 ${
          role === 'user' 
            ? 'bg-brand-blue text-white' 
            : 'bg-gray-100'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </Card>
    </div>
  );
};

export default ChatMessage;
