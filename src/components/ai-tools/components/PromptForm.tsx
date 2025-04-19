
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader, Sparkles } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import type { PromptFormProps, ToneOption } from '../types/content';

const toneOptions: ToneOption[] = [
  { id: 'professional', name: 'Chuyên nghiệp', description: 'Giọng điệu trang trọng và chính thống' },
  { id: 'casual', name: 'Thân thiện', description: 'Giọng điệu gần gũi và dễ tiếp cận' },
  { id: 'enthusiastic', name: 'Nhiệt tình', description: 'Giọng điệu năng động và hào hứng' },
  { id: 'persuasive', name: 'Thuyết phục', description: 'Giọng điệu có tính thuyết phục cao' },
];

const PromptForm = ({
  productName,
  onProductNameChange,
  selectedFormat,
  onFormatChange,
  selectedChannel,
  onChannelChange,
  selectedTone,
  onToneChange,
  wordLimit,
  onWordLimitChange,
  onGenerate,
  isGenerating,
  contentFormats,
  marketingChannels,
}: PromptFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</Label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          placeholder="Nhập tên sản phẩm để tạo nội dung"
          className="w-full"
        />
      </div>
      
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Định dạng nội dung</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {contentFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => onFormatChange(format.id)}
              className={`px-3 py-2 border rounded-md text-sm transition-all
                ${selectedFormat === format.id
                  ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              {format.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Giọng điệu</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone.id}
              onClick={() => onToneChange(tone.id)}
              className={`px-3 py-2 border rounded-md text-sm transition-all
                ${selectedTone === tone.id
                  ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              title={tone.description}
            >
              {tone.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Tối ưu cho kênh marketing</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {marketingChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelChange(channel.id)}
              className={`px-3 py-2 border rounded-md text-sm transition-all
                ${selectedChannel === channel.id
                  ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              {channel.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Giới hạn từ: {wordLimit}
        </Label>
        <Slider
          value={[wordLimit]}
          onValueChange={(value) => onWordLimitChange(value[0])}
          min={50}
          max={1000}
          step={50}
          className="py-4"
        />
      </div>

      <Button 
        onClick={onGenerate}
        disabled={!productName || isGenerating}
        className="btn-gradient w-full"
      >
        {isGenerating ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Đang tạo...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Tạo nội dung
          </>
        )}
      </Button>
    </div>
  );
};

export default PromptForm;
