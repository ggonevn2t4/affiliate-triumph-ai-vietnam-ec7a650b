
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader, Sparkles } from 'lucide-react';

interface ContentFormat {
  id: string;
  name: string;
}

interface PromptFormProps {
  productName: string;
  onProductNameChange: (value: string) => void;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  contentFormats: ContentFormat[];
  marketingChannels: ContentFormat[];
}

const PromptForm = ({
  productName,
  onProductNameChange,
  selectedFormat,
  onFormatChange,
  selectedChannel,
  onChannelChange,
  onGenerate,
  isGenerating,
  contentFormats,
  marketingChannels
}: PromptFormProps) => {
  return (
    <>
      <Tabs defaultValue="basic" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Cơ bản</TabsTrigger>
          <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 pt-4">
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
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
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
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
            <p className="text-sm text-blue-800">
              Tính năng nâng cao giúp tối ưu nội dung cho từng kênh marketing cụ thể, bao gồm độ dài, giọng điệu và cấu trúc phù hợp nhất.
            </p>
          </div>
        </TabsContent>
      </Tabs>
        
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
    </>
  );
};

export default PromptForm;
