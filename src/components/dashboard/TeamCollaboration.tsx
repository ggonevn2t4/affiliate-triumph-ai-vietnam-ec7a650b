
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  user_id: string;
  role: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const TeamCollaboration = ({ teamId }: { teamId: string }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      // First query the team_members table without the profiles join
      const { data, error } = await supabase
        .from('team_members')
        .select('id, user_id, role')
        .eq('team_id', teamId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách thành viên.",
        });
        return;
      }

      // Now fetch profiles separately and join them manually
      if (data && data.length > 0) {
        const userIds = data.map(member => member.user_id);
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .in('id', userIds);

        if (profilesError) {
          toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Không thể tải thông tin hồ sơ người dùng.",
          });
        }

        // Create a lookup map for faster access
        const profilesMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            profilesMap.set(profile.id, profile);
          });
        }

        // Join the data manually
        const membersWithProfiles = data.map(member => ({
          ...member,
          profiles: profilesMap.get(member.user_id) || { first_name: null, last_name: null }
        }));

        setMembers(membersWithProfiles);
      } else {
        setMembers([]); // No members found
      }
    };

    fetchTeamMembers();
  }, [teamId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Thành viên nhóm
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Thêm thành viên
          </Button>
          <div className="space-y-2">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>
                  {member.profiles?.first_name || 'User'} {member.profiles?.last_name || ''}
                </span>
                <span className="text-sm text-gray-500 capitalize">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCollaboration;
