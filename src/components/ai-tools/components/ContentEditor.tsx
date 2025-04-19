
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Facebook, RefreshCcw, Share2, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentEditorProps {
  content: string;
  onRegenerate: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onShare: (platform: string) => void;
  selectedChannel: string;
  channelName: string;
}

const ContentEditor = ({
  content,
  onRegenerate,
  onCopy,
  isCopied,
  onShare,
  selectedChannel,
  channelName,
}: ContentEditorProps) => {
  
  const handleCopyButtonClick = () => {
    onCopy();
    toast({
      title: "Đã sao chép",
      description: "Nội dung đã được sao chép vào clipboard",
      variant: "default"
    });
  };
  
  return (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-medium">Nội dung đã tạo</span>
        <div className="flex space-x-2">
          <button 
            onClick={onRegenerate} 
            className="p-1 rounded hover:bg-gray-200"
            title="Tạo lại"
          >
            <RefreshCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={onCopy} 
            className="p-1 rounded hover:bg-gray-200"
            title="Sao chép"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <button 
            onClick={() => onShare('facebook')} 
            className="p-1 rounded hover:bg-gray-200"
            title="Chia sẻ Facebook"
          >
            <Facebook className="w-4 h-4 text-[#4267B2]" />
          </button>
          <button 
            onClick={() => onShare('twitter')} 
            className="p-1 rounded hover:bg-gray-200"
            title="Chia sẻ Twitter"
          >
            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
          </button>
        </div>
      </div>
      <div className="p-4 text-sm whitespace-pre-line max-h-80 overflow-y-auto">
        {content}
      </div>
      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Tối ưu cho: {channelName}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
          >
            <Share2 className="h-3 w-3 mr-1" /> Chia sẻ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
