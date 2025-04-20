export interface ContentFormat {
  id: string;
  name: string;
}

export interface LanguageOption {
  id: string;
  name: string;
  code: string;
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
}

export interface LengthPreset {
  id: string;
  name: string;
  wordCount: number;
}

export interface PromptFormProps {
  productName: string; // Keep as productName for backward compatibility
  onProductNameChange: (value: string) => void;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  selectedTone: string;
  onToneChange: (tone: string) => void;
  wordLimit: number;
  onWordLimitChange: (limit: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  contentFormats: ContentFormat[];
  marketingChannels: ContentFormat[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  lengthPresets: LengthPreset[];
  selectedPreset: string;
  onPresetChange: (preset: string) => void;
}
