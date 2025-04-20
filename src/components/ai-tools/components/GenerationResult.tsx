
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { ContentFormat } from '../types/content';

interface GenerationResultProps {
  content: string;
  error: string | null;
  selectedChannel: string;
  marketingChannels: ContentFormat[];
  onRegenerate: () => void;
  onCopy: () => void;
  onShareSocial: (platform: string) => void;
}

const GenerationResult: React.FC<GenerationResultProps> = ({
  content,
  error,
  selectedChannel,
  marketingChannels,
  onRegenerate,
  onCopy,
  onShareSocial
}) => {
  if (error) {
    return (
      <div className="mt-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
        <p className="text-amber-800 text-sm">{error}</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-medium">Nội dung đã tạo</span>
      </div>
      <div className="p-4 text-sm whitespace-pre-line max-h-80 overflow-y-auto">
        {content}
      </div>
      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Tối ưu cho: {marketingChannels.find(c => c.id === selectedChannel)?.name}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onShareSocial('facebook')}
          >
            <Share2 className="h-3 w-3 mr-1" /> Chia sẻ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerationResult;
