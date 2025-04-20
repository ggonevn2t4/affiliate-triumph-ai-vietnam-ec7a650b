
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const GeneratorHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
        Công cụ tạo nội dung AI
      </CardTitle>
    </div>
  );
};

export default GeneratorHeader;
