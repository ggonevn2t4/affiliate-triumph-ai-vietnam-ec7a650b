
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Share2, Facebook, Twitter, Linkedin, Instagram, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SocialShareWidgetProps {
  content: string;
  url?: string;
  title?: string;
}

const SocialShareWidget: React.FC<SocialShareWidgetProps> = ({ 
  content, 
  url = window.location.href,
  title = "Nội dung Affiliate Marketing" 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleShare = (platform: string) => {
    const truncatedContent = content.length > 280 
      ? content.substring(0, 277) + '...' 
      : content;
    
    const encodedContent = encodeURIComponent(truncatedContent);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedContent}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedContent}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedContent}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedContent}%0A%0A${encodedUrl}`;
        break;
      default:
        return;
    }
    
    // Open a popup window for social sharing
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    toast({
      title: "Chia sẻ thành công",
      description: `Nội dung đã được chia sẻ lên ${platform}`,
    });
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    toast({
      title: "Đã sao chép",
      description: "Nội dung đã được sao chép vào clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <Share2 className="w-4 h-4 mr-1" /> Chia sẻ nội dung
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-xs" 
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" /> Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" /> Sao chép liên kết
            </>
          )}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[#4267B2] hover:bg-[#365899] text-white border-[#4267B2]"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="h-4 w-4 mr-1" /> Facebook
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white border-[#1DA1F2]"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="h-4 w-4 mr-1" /> Twitter
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[#0A66C2] hover:bg-[#0958a7] text-white border-[#0A66C2]"
          onClick={() => handleShare('linkedin')}
        >
          <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[#E1306C] hover:bg-[#d0285d] text-white border-[#E1306C]"
          onClick={() => handleShare('instagram')}
        >
          <Instagram className="h-4 w-4 mr-1" /> Instagram
        </Button>
      </div>
      
      <Alert className="mt-3 bg-blue-50 border-blue-200">
        <AlertDescription className="text-xs text-blue-800">
          Chia sẻ nội dung của bạn trên các nền tảng xã hội để tiếp cận nhiều khách hàng tiềm năng hơn và tăng cơ hội chuyển đổi.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SocialShareWidget;
