
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, ShoppingBag, Settings, Users, TrendingUp, LayoutTemplate } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample template data
const templates = [
  {
    id: 1,
    name: "Shopee Flash Sale",
    description: "Mẫu chiến dịch cho các đợt Flash Sale trên Shopee",
    category: "ecommerce",
    platform: "shopee",
    settings: {
      campaignType: "flash_sale",
      autoPostSchedule: true,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  },
  {
    id: 2,
    name: "Lazada Mega Sale",
    description: "Tối ưu cho các chương trình khuyến mãi lớn trên Lazada",
    category: "ecommerce",
    platform: "lazada",
    settings: {
      campaignType: "mega_sale",
      autoPostSchedule: true,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  },
  {
    id: 3,
    name: "Blog Review Sản Phẩm",
    description: "Mẫu cho các bài đánh giá sản phẩm trên blog cá nhân",
    category: "content",
    platform: "blog",
    settings: {
      campaignType: "product_review",
      autoPostSchedule: false,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  },
  {
    id: 4,
    name: "TikTok Shop",
    description: "Tối ưu cho chiến dịch affiliate thông qua TikTok Shop",
    category: "social",
    platform: "tiktok",
    settings: {
      campaignType: "social_shop",
      autoPostSchedule: true,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  },
  {
    id: 5,
    name: "YouTube Review",
    description: "Chiến dịch affiliate thông qua video review YouTube",
    category: "content",
    platform: "youtube",
    settings: {
      campaignType: "video_review",
      autoPostSchedule: false,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  },
  {
    id: 6,
    name: "Facebook Shop",
    description: "Chiến dịch thông qua Facebook Shop và Marketplace",
    category: "social",
    platform: "facebook",
    settings: {
      campaignType: "social_shop",
      autoPostSchedule: true,
      contentSuggestions: true,
      trackingPixelEnabled: true
    }
  }
];

const platforms = [
  { value: "all", label: "Tất cả nền tảng" },
  { value: "shopee", label: "Shopee" },
  { value: "lazada", label: "Lazada" },
  { value: "tiki", label: "Tiki" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "blog", label: "Blog" },
];

interface CampaignTemplatesProps {
  onSelectTemplate: (templateId: number) => void;
}

const CampaignTemplates = ({ onSelectTemplate }: CampaignTemplatesProps) => {
  const [platform, setPlatform] = useState("all");
  const [open, setOpen] = useState(false);
  
  // Filter templates based on selected platform
  const filteredTemplates = platform === "all" 
    ? templates 
    : templates.filter(template => template.platform === platform);

  const renderPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'shopee':
      case 'lazada':
      case 'tiki':
        return <ShoppingBag className="h-4 w-4 mr-2" />;
      case 'facebook':
      case 'tiktok':
        return <Users className="h-4 w-4 mr-2" />;
      case 'youtube':
      case 'blog':
        return <TrendingUp className="h-4 w-4 mr-2" />;
      default:
        return <LayoutTemplate className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Mẫu chiến dịch</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {platform === "all" 
                ? "Tất cả nền tảng" 
                : platforms.find((p) => p.value === platform)?.label}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Tìm nền tảng..." />
              <CommandEmpty>Không tìm thấy nền tảng</CommandEmpty>
              <CommandGroup>
                {platforms.map((p) => (
                  <CommandItem
                    key={p.value}
                    value={p.value}
                    onSelect={(currentValue) => {
                      setPlatform(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        platform === p.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {p.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-end">
          <TabsList className="grid w-[160px] grid-cols-2">
            <TabsTrigger value="grid">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </TabsTrigger>
            <TabsTrigger value="list">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:border-brand-blue/60 hover:shadow-md transition-all cursor-pointer" onClick={() => onSelectTemplate(template.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center mb-2">
                    {renderPlatformIcon(template.platform)}
                    <span className="text-sm font-medium text-gray-500 capitalize">{template.platform}</span>
                  </div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 flex justify-end">
                  <Button>Chọn mẫu này</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:border-brand-blue/60 hover:shadow-md transition-all cursor-pointer" onClick={() => onSelectTemplate(template.id)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        {renderPlatformIcon(template.platform)}
                        <h3 className="text-lg font-semibold">{template.name}</h3>
                        <span className="ml-2 text-xs font-medium text-gray-500 rounded-full px-2 py-0.5 bg-gray-100 capitalize">{template.platform}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                    </div>
                    <Button>Chọn mẫu</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignTemplates;
