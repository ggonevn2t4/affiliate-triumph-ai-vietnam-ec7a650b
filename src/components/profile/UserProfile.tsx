
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) {
        throw error;
      }

      toast.success('Thông tin hồ sơ đã được cập nhật');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Không thể cập nhật hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Vui lòng đăng nhập để xem hồ sơ.</div>;
  }

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Hồ sơ người dùng</h2>
      
      <div className="flex flex-col sm:flex-row gap-8 mb-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-brand-blue text-white text-xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" disabled={loading}>
            Thay đổi ảnh
          </Button>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled className="bg-gray-50" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">Tên</Label>
              <Input 
                id="first-name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            </div>
            
            <div>
              <Label htmlFor="last-name">Họ</Label>
              <Input 
                id="last-name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nhập họ của bạn"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={updateProfile} 
              disabled={loading} 
              className="btn-gradient"
            >
              {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
