
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Target, Users, Save, Trash2, Edit, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const savedSegments = [
  { 
    id: 1, 
    name: 'Người dùng trẻ quan tâm công nghệ', 
    filters: {
      age: '18-24',
      interests: ['Công nghệ', 'Smartphone', 'Gaming'],
      location: 'Hồ Chí Minh',
      gender: 'All'
    },
    count: 4350
  },
  { 
    id: 2, 
    name: 'Phụ huynh quan tâm giáo dục', 
    filters: {
      age: '30-45',
      interests: ['Giáo dục', 'Sách', 'Phát triển trẻ em'],
      location: 'Hà Nội',
      gender: 'All'
    },
    count: 3120
  },
  { 
    id: 3, 
    name: 'Người mua sắm thời trang nữ', 
    filters: {
      age: '25-35',
      interests: ['Thời trang', 'Làm đẹp', 'Phụ kiện'],
      location: 'Toàn quốc',
      gender: 'Female'
    },
    count: 6820
  }
];

const AudienceSegmentation = () => {
  const [segmentName, setSegmentName] = useState('');
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [selectedInterests, setSelectedInterests] = useState(['Công nghệ']);
  const [location, setLocation] = useState('all');
  const [gender, setGender] = useState('all');
  const [includeReturningCustomers, setIncludeReturningCustomers] = useState(true);
  
  const handleSaveSegment = () => {
    if (!segmentName) {
      toast.error("Vui lòng nhập tên phân khúc");
      return;
    }
    
    toast.success("Đã lưu phân khúc khán giả thành công!");
    setSegmentName('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="segment-name">Tên phân khúc</Label>
            <Input 
              id="segment-name" 
              placeholder="Ví dụ: Người dùng trẻ quan tâm công nghệ" 
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Độ tuổi</Label>
            <div className="pt-4 pb-2">
              <Slider 
                value={ageRange} 
                min={13} 
                max={80} 
                step={1} 
                onValueChange={setAgeRange} 
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{ageRange[0]} tuổi</span>
              <span>{ageRange[1]} tuổi</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="interests">Sở thích & Mối quan tâm</Label>
            <Select>
              <SelectTrigger id="interests">
                <SelectValue placeholder="Chọn sở thích" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Công nghệ</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="health">Sức khỏe</SelectItem>
                <SelectItem value="education">Giáo dục</SelectItem>
                <SelectItem value="travel">Du lịch</SelectItem>
                <SelectItem value="food">Ẩm thực</SelectItem>
                <SelectItem value="sports">Thể thao</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedInterests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <button className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <span className="text-xs">×</span>
                  </button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6">
                <Plus className="h-3 w-3 mr-1" />
                Thêm
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="location">Vị trí</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Chọn vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toàn quốc</SelectItem>
                <SelectItem value="hn">Hà Nội</SelectItem>
                <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                <SelectItem value="dn">Đà Nẵng</SelectItem>
                <SelectItem value="ct">Cần Thơ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="gender">Giới tính</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="returning-customers" 
              checked={includeReturningCustomers}
              onCheckedChange={setIncludeReturningCustomers}
            />
            <Label htmlFor="returning-customers">Bao gồm khách hàng đã mua trước đây</Label>
          </div>
          
          <Button onClick={handleSaveSegment} className="w-full bg-brand-blue hover:bg-brand-blue/90">
            <Save className="h-4 w-4 mr-2" />
            Lưu phân khúc
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Target className="h-5 w-5 mr-2 text-brand-blue" />
            Phân khúc đã lưu
          </h3>
          
          {savedSegments.map((segment) => (
            <Card key={segment.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{segment.name}</h4>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        {segment.count.toLocaleString()} người dùng
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Độ tuổi:</span> {segment.filters.age}
                    </div>
                    <div>
                      <span className="text-gray-500">Vị trí:</span> {segment.filters.location}
                    </div>
                    <div>
                      <span className="text-gray-500">Giới tính:</span> {segment.filters.gender}
                    </div>
                    <div>
                      <span className="text-gray-500">Sở thích:</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {segment.filters.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceSegmentation;
