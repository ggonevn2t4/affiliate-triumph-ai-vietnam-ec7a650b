
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ input, onInputChange, onSubmit, isLoading }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t flex items-center space-x-2">
      <Textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Nhập câu hỏi của bạn..."
        className="flex-1 resize-none"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <Button type="submit" className="rounded-full p-2 h-10 w-10" disabled={isLoading}>
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
