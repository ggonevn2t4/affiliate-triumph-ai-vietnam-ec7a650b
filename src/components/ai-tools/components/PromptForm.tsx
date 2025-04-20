import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader, Sparkles } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PromptFormProps, ToneOption, LengthPreset } from '../types/content';

const toneOptions: ToneOption[] = [
  { id: 'professional', name: 'Chuyên nghiệp', description: 'Giọng điệu trang trọng và chính thống' },
  { id: 'casual', name: 'Thân thiện', description: 'Giọng điệu gần gũi và dễ tiếp cận' },
  { id: 'enthusiastic', name: 'Nhiệt tình', description: 'Giọng điệu năng động và hào hứng' },
  { id: 'persuasive', name: 'Thuyết phục', description: 'Giọng điệu có tính thuyết phục cao' },
];

const styleOptions = [
  { id: 'formal', name: 'Trang trọng', description: 'Phong cách chính thức, nghiêm túc' },
  { id: 'casual', name: 'Thông thường', description: 'Phong cách đời thường, tự nhiên' },
  { id: 'creative', name: 'Sáng tạo', description: 'Phong cách độc đáo, thu hút' },
];

const languageOptions = [
  { id: 'vi', name: 'Tiếng Việt', code: 'vi' },
  { id: 'en', name: 'Tiếng Anh', code: 'en' },
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
  selectedLanguage,
  onLanguageChange,
  selectedStyle,
  onStyleChange,
  lengthPresets,
  selectedPreset,
  onPresetChange,
  onGenerate,
  isGenerating,
  contentFormats,
  marketingChannels,
}: PromptFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Từ khóa</Label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          placeholder="Nhập từ khóa để tạo nội dung"
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</Label>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Độ dài</Label>
          <Select value={selectedPreset} onValueChange={onPresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn độ dài" />
            </SelectTrigger>
            <SelectContent>
              {lengthPresets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  {preset.name} ({preset.wordCount} từ)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        <Label className="block text-sm font-medium text-gray-700 mb-1">Phong cách viết</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              className={`px-3 py-2 border rounded-md text-sm transition-all
                ${selectedStyle === style.id
                  ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              title={style.description}
            >
              {style.name}
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
