
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GeneratorHeader from './components/GeneratorHeader';
import PromptForm from './components/PromptForm';
import GenerationResult from './components/GenerationResult';
import ApiKeyDialog from './ApiKeyDialog';
import { useContentGenerator } from './hooks/useContentGenerator';
import type { ContentFormat } from './types/content';

const contentFormats: ContentFormat[] = [
  { id: 'blog', name: 'Bài viết blog' },
  { id: 'social', name: 'Mạng xã hội' },
  { id: 'email', name: 'Email marketing' },
  { id: 'product', name: 'Mô tả sản phẩm' },
];

const marketingChannels: ContentFormat[] = [
  { id: 'general', name: 'Tổng quát' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'zalo', name: 'Zalo' },
];

const OptimusAlphaGenerator = () => {
  const {
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
  } = useContentGenerator(contentFormats);

  return (
    <Card className="w-full shadow-md">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <GeneratorHeader />
          <ApiKeyDialog />
        </div>
        
        <PromptForm
          productName={prompt}
          onProductNameChange={setPrompt}
          selectedFormat={contentType}
          onFormatChange={setContentType}
          selectedChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          selectedTone={selectedTone}
          onToneChange={setSelectedTone}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          lengthPresets={lengthPresets}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          wordLimit={wordLimit}
          onWordLimitChange={setWordLimit}
          onGenerate={handleGenerate}
          isGenerating={isLoading}
          contentFormats={contentFormats}
          marketingChannels={marketingChannels}
        />

        <GenerationResult
          content={generatedContent}
          error={error}
          selectedChannel={selectedChannel}
          marketingChannels={marketingChannels}
          onRegenerate={handleGenerate}
          onCopy={handleCopy}
          onShareSocial={handleShareSocial}
        />
      </CardContent>
    </Card>
  );
};

export default OptimusAlphaGenerator;
