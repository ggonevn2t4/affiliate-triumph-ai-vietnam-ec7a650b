
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, RotateCcw } from 'lucide-react';

interface HistoryItem {
  id: string;
  prompt: string;
  content: string;
  type: string;
  date: Date;
}

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentHistory: HistoryItem[];
  onLoadHistoryItem: (item: HistoryItem) => void;
  formatDate: (date: Date) => string;
}

const HistoryDialog = ({ 
  open, 
  onOpenChange, 
  contentHistory, 
  onLoadHistoryItem,
  formatDate 
}: HistoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lịch sử nội dung</DialogTitle>
          <DialogDescription>
            Xem và tải lại các nội dung đã tạo trước đây
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {contentHistory.length > 0 ? (
            contentHistory.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">
                      {item.prompt.length > 50 ? `${item.prompt.substring(0, 50)}...` : item.prompt}
                    </CardTitle>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <CardDescription>{item.type}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="bg-gray-50 rounded p-2 text-sm line-clamp-3">
                    {item.content}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => onLoadHistoryItem(item)}
                  >
                    <RotateCcw className="h-3 w-3 mr-2" />
                    Tải lại
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Chưa có nội dung nào được tạo
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDialog;
