
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SocialShareWidgetProps {
  content: string;
  title: string;
}

const SocialShareWidget = ({ content, title }: SocialShareWidgetProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const shareUrl = window.location.href;
  const truncatedContent = content.length > 280 ? content.substring(0, 277) + '...' : content;
  
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(truncatedContent)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(truncatedContent)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(truncatedContent)}&title=${encodeURIComponent(title)}`;
        break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success('Đã sao chép liên kết vào clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        {isCopied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Đã sao chép
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Sao chép liên kết
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialShareWidget;
