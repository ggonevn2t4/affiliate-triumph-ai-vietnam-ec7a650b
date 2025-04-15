
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Plus, X, Save, Calendar, MessageSquare, Instagram, Facebook, Twitter, Linkedin, Youtube, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface ScheduledPost {
  id: string;
  content: string;
  date: Date;
  time: string;
  platforms: string[];
  type: string;
  status: 'scheduled' | 'draft' | 'posted';
}

const initialPosts: ScheduledPost[] = [
  {
    id: '1',
    content: 'Bạn đã biết về xu hướng #DigitalMarketing mới nhất chưa? Khám phá ngay tại link dưới đây!',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '09:00',
    platforms: ['facebook', 'instagram'],
    type: 'promotion',
    status: 'scheduled'
  },
  {
    id: '2',
    content: 'Top 5 chiến lược Affiliate Marketing hiệu quả nhất năm 2024 - Bài viết mới trên blog của chúng tôi',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: '15:30',
    platforms: ['facebook', 'linkedin', 'twitter'],
    type: 'blog',
    status: 'draft'
  }
];

const SocialMediaPlanner = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>(initialPosts);
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [newPost, setNewPost] = useState<Partial<ScheduledPost>>({
    content: '',
    date: new Date(),
    time: '09:00',
    platforms: ['facebook'],
    type: 'promotion',
    status: 'scheduled'
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  
  const handleAddPost = () => {
    if (!newPost.content) {
      toast.error('Vui lòng nhập nội dung bài đăng');
      return;
    }
    
    const post: ScheduledPost = {
      id: Date.now().toString(),
      content: newPost.content || '',
      date: newPost.date || new Date(),
      time: newPost.time || '09:00',
      platforms: newPost.platforms || ['facebook'],
      type: newPost.type || 'promotion',
      status: newPost.status as 'scheduled' | 'draft' | 'posted' || 'scheduled'
    };
    
    setPosts([...posts, post]);
    setNewPost({
      content: '',
      date: new Date(),
      time: '09:00',
      platforms: ['facebook'],
      type: 'promotion',
      status: 'scheduled'
    });
    setShowNewPostForm(false);
    toast.success('Đã thêm bài đăng mới vào lịch');
  };
  
  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success('Đã xóa bài đăng');
  };
  
  const handleUpdateStatus = (id: string, status: 'scheduled' | 'draft' | 'posted') => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status } : post
    ));
    toast.success(`Đã cập nhật trạng thái bài đăng thành ${
      status === 'scheduled' ? 'Đã lên lịch' : 
      status === 'draft' ? 'Bản nháp' : 'Đã đăng'
    }`);
  };
  
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'posted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-brand-purple" />
          Lên lịch đăng bài mạng xã hội
        </CardTitle>
        <CardDescription>
          Tạo và lên lịch đăng bài cho nhiều nền tảng mạng xã hội
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Lịch đăng bài
              </TabsTrigger>
              <TabsTrigger value="list">
                <MessageSquare className="h-4 w-4 mr-2" />
                Danh sách bài đăng
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            className="ml-4"
            onClick={() => setShowNewPostForm(!showNewPostForm)}
          >
            {showNewPostForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {showNewPostForm ? 'Hủy' : 'Tạo mới'}
          </Button>
        </div>
        
        {showNewPostForm && (
          <Card className="p-4 border border-dashed border-gray-300 bg-gray-50">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày đăng</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newPost.date ? format(newPost.date, 'dd/MM/yyyy') : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newPost.date}
                        onSelect={(date) => setNewPost({ ...newPost, date: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Thời gian</label>
                  <Select 
                    value={newPost.time} 
                    onValueChange={(time) => setNewPost({ ...newPost, time })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <SelectItem key={`morning-${i}`} value={`${i + 9}:00`}>{`${i + 9}:00`}</SelectItem>
                      ))}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <SelectItem key={`afternoon-${i}`} value={`${i + 9}:30`}>{`${i + 9}:30`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nội dung</label>
                <Textarea
                  placeholder="Nhập nội dung bài đăng của bạn"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nền tảng</label>
                  <div className="flex flex-wrap gap-2">
                    {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map(platform => (
                      <Badge 
                        key={platform}
                        variant={newPost.platforms?.includes(platform) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const platforms = newPost.platforms || [];
                          setNewPost({ 
                            ...newPost, 
                            platforms: platforms.includes(platform)
                              ? platforms.filter(p => p !== platform)
                              : [...platforms, platform]
                          });
                        }}
                      >
                        {getPlatformIcon(platform)}
                        <span className="ml-1 capitalize">{platform}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Loại bài đăng</label>
                  <Select 
                    value={newPost.type} 
                    onValueChange={(type) => setNewPost({ ...newPost, type })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại bài đăng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Quảng cáo</SelectItem>
                      <SelectItem value="blog">Bài viết Blog</SelectItem>
                      <SelectItem value="product">Sản phẩm</SelectItem>
                      <SelectItem value="news">Tin tức</SelectItem>
                      <SelectItem value="event">Sự kiện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button variant="outline" className="mr-2" onClick={() => setShowNewPostForm(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddPost}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu bài đăng
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        <TabsContent value="calendar" className="mt-4">
          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-50 border-b">
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, i) => (
                  <div key={i} className="p-2 text-center text-sm font-medium border-r last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              {Array.from({ length: 5 }).map((_, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() + dayIndex + weekIndex * 7);
                    
                    const postsForDay = posts.filter(post => 
                      post.date.getDate() === date.getDate() &&
                      post.date.getMonth() === date.getMonth() &&
                      post.date.getFullYear() === date.getFullYear()
                    );
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`min-h-[100px] p-1 border-r last:border-r-0 ${
                          date.toDateString() === new Date().toDateString() 
                            ? 'bg-blue-50' 
                            : ''
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-1">{date.getDate()}</div>
                        <div className="space-y-1">
                          {postsForDay.map(post => (
                            <div 
                              key={post.id} 
                              className={`text-xs p-1 rounded truncate ${
                                post.type === 'promotion' ? 'bg-purple-100' :
                                post.type === 'blog' ? 'bg-green-100' :
                                post.type === 'product' ? 'bg-blue-100' :
                                post.type === 'news' ? 'bg-yellow-100' :
                                'bg-gray-100'
                              }`}
                              title={post.content}
                            >
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span>{post.time}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {post.platforms.map(platform => (
                                  <span key={platform} className="inline-block">
                                    {getPlatformIcon(platform)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex">
                    <div className={`w-2 ${
                      post.type === 'promotion' ? 'bg-purple-500' :
                      post.type === 'blog' ? 'bg-green-500' :
                      post.type === 'product' ? 'bg-blue-500' :
                      post.type === 'news' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                            {post.status === 'scheduled' ? 'Đã lên lịch' : 
                             post.status === 'draft' ? 'Bản nháp' : 'Đã đăng'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(post.date, 'dd/MM/yyyy')} - {post.time}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUpdateStatus(post.id, 'posted')}
                            className="h-8 px-2"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-500 capitalize">
                          {post.type === 'promotion' ? 'Quảng cáo' :
                           post.type === 'blog' ? 'Bài viết blog' :
                           post.type === 'product' ? 'Sản phẩm' :
                           post.type === 'news' ? 'Tin tức' :
                           post.type === 'event' ? 'Sự kiện' : post.type}
                        </div>
                        <div className="flex items-center space-x-1">
                          {post.platforms.map(platform => (
                            <Badge key={platform} variant="outline" className="flex items-center space-x-1">
                              {getPlatformIcon(platform)}
                              <span className="capitalize text-xs">{platform}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Chưa có bài đăng nào. Hãy tạo bài đăng mới!
              </div>
            )}
          </div>
        </TabsContent>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Nhập lịch từ Google Calendar
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tạo chiến dịch mới
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SocialMediaPlanner;
