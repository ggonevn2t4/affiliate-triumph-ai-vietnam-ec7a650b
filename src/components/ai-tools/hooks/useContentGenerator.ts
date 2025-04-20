
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import useContentGeneration from '@/hooks/use-content-generation';
import { useContentHistory } from './useContentHistory';
import type { ContentFormat, LengthPreset } from '../types/content';

export const lengthPresets: LengthPreset[] = [
  { id: 'short', name: 'Ngắn gọn', wordCount: 150 },
  { id: 'medium', name: 'Vừa phải', wordCount: 300 },
  { id: 'long', name: 'Chi tiết', wordCount: 600 }
];

export const useContentGenerator = (contentFormats: ContentFormat[]) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedLanguage, setSelectedLanguage] = useState('vi');
  const [selectedStyle, setSelectedStyle] = useState('formal');
  const [selectedPreset, setSelectedPreset] = useState('medium');
  const [wordLimit, setWordLimit] = useState(300);
  const [error, setError] = useState<string | null>(null);
  
  const { isLoading, generateCompletion } = useContentGeneration();
  const { contentHistory, addToHistory } = useContentHistory();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập từ khóa để sinh",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedType = contentFormats.find(type => type.id === contentType)?.name || 'Bài viết';
      const currentWordLimit = lengthPresets.find(preset => preset.id === selectedPreset)?.wordCount || wordLimit;
      
      const content = await generateCompletion([
        {
          role: 'system',
          content: `Bạn là trợ lý AI chuyên về Affiliate Marketing cho người Việt Nam.
          Hãy tạo ${selectedType} chất lượng cao bằng tiếng ${selectedLanguage === 'vi' ? 'Việt' : 'Anh'}
          với giọng điệu ${selectedTone}, phong cách ${selectedStyle},
          có tính thuyết phục và tối ưu cho SEO. 
          Giới hạn độ dài khoảng ${currentWordLimit} từ dựa trên từ khóa: ${prompt}.`
        },
        {
          role: 'user',
          content: prompt
        }
      ], contentType);

      if (content) {
        setGeneratedContent(content);
        addToHistory({
          prompt,
          content,
          type: contentType
        });
        toast({
          title: "Thành công",
          description: "Nội dung đã được tạo thành công!"
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setError("Đã xảy ra lỗi khi tạo nội dung. Vui lòng thử lại sau.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Thành công",
      description: "Đã sao chép nội dung vào clipboard"
    });
  };

  const handleShareSocial = (platform: string) => {
    if (!generatedContent) return;
    
    const encodedText = encodeURIComponent(generatedContent.substring(0, 280));
    const shareUrl = platform === 'facebook' 
      ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`
      : `https://twitter.com/intent/tweet?text=${encodedText}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    toast({
      title: "Chia sẻ thành công",
      description: `Nội dung đã được chia sẻ lên ${platform}`
    });
  };

  return {
    prompt,
    setPrompt,
    generatedContent,
    contentType,
    setContentType,
    selectedChannel,
    setSelectedChannel,
    selectedTone,
    setSelectedTone,
    selectedLanguage,
    setSelectedLanguage,
    selectedStyle,
    setSelectedStyle,
    selectedPreset,
    setSelectedPreset,
    lengthPresets,
    wordLimit,
    setWordLimit,
    error,
    isLoading,
    handleGenerate,
    handleCopy,
    handleShareSocial
  };
};
