
export interface ContentFormat {
  id: string;
  name: string;
}

export interface ToneOption {
  id: string;
  name: string;
  description: string;
}

export interface PromptFormProps {
  productName: string;
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
}
