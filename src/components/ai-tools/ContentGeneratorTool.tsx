import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Copy, Check } from 'lucide-react';
import ApiKeyDialog from "./ApiKeyDialog";

const ContentGeneratorTool = () => {
  const [inputText, setInputText] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));

  const handleGenerateContent = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Văn bản trống",
        description: "Vui lòng nhập nội dung để tạo.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsLoading(true);
    setGeneratedContent("");

    try {
      // Simulate API call
      setTimeout(() => {
        const generated = `Đây là nội dung được tạo dựa trên: "${inputText}".\n\nĐây chỉ là bản demo. Hãy nhập API key để sử dụng thật.`;
        setGeneratedContent(generated);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo nội dung. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleApiKeySave = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowApiKeyDialog(false);
    toast({
      title: "API Key đã được lưu",
      description: "Bây giờ bạn có thể sử dụng AI Tools",
    });
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Nhập nội dung bạn muốn tạo..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={4}
      />
      <Button onClick={handleGenerateContent} disabled={isLoading}>
        {isLoading ? "Đang tạo..." : "Tạo nội dung"}
      </Button>

      {generatedContent && (
        <Card>
          <CardContent className="relative">
            <Textarea
              readOnly
              value={generatedContent}
              rows={4}
              className="resize-none"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleCopyContent}
              disabled={isCopied}
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </CardContent>
        </Card>
      )}

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleApiKeySave}
      />
    </div>
  );
};

export default ContentGeneratorTool;
