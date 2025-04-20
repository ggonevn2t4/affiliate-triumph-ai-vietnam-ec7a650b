
import { useState, useEffect } from 'react';

export interface ContentHistoryItem {
  id: string;
  prompt: string;
  content: string;
  type: string;
  date: Date;
}

export const useContentHistory = () => {
  const [contentHistory, setContentHistory] = useState<ContentHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const mockHistory = [
          {
            id: '1',
            prompt: 'Viết bài review về iPhone 15 Pro',
            content: 'iPhone 15 Pro là một sản phẩm đột phá với chip A17 Pro...',
            type: 'blog',
            date: new Date(2023, 3, 10)
          },
          {
            id: '2',
            prompt: 'Viết email khuyến mãi Black Friday',
            content: 'SALE SỐC BLACK FRIDAY - Giảm giá đến 50% cho tất cả sản phẩm...',
            type: 'email',
            date: new Date(2023, 3, 5)
          }
        ];
        setContentHistory(mockHistory);
      } catch (error) {
        console.error('Error fetching content history:', error);
      }
    };

    fetchHistory();
  }, []);

  const addToHistory = (item: Omit<ContentHistoryItem, 'id' | 'date'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date()
    };
    setContentHistory(prev => [newItem, ...prev]);
  };

  return {
    contentHistory,
    addToHistory
  };
};
