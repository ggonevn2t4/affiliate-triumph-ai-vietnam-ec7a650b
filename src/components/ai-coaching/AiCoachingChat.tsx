
import { useState } from "react";
import ApiKeyDialog from "../ai-tools/ApiKeyDialog";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAiChat } from "@/hooks/use-ai-chat";
import { toast } from "@/hooks/use-toast";

interface AiCoachingChatProps {
  selectedTopic: string;
}

const AiCoachingChat = ({ selectedTopic }: AiCoachingChatProps) => {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));
  const { messages, input, setInput, isLoading, handleSubmit } = useAiChat(selectedTopic);

  const handleApiKeySave = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowApiKeyDialog(false);
    toast({
      title: "API Key đã được lưu",
      description: "Bây giờ bạn có thể sử dụng AI Coaching",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Topic header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{selectedTopic}</h2>
        <p className="text-sm text-gray-500">AI Coaching session</p>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 bg-gray-100 rounded-lg">
              <p className="animate-pulse">AI đang soạn phản hồi...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat input */}
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      {/* API Key Dialog */}
      <ApiKeyDialog 
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleApiKeySave}
      />
    </div>
  );
};

export default AiCoachingChat;
