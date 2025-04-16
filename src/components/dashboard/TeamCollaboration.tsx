
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      user_id: user?.id || "demo-user",
      role: "owner",
      profiles: {
        first_name: "Thành",
        last_name: "An"
      }
    },
    {
      id: "2",
      user_id: "demo-user-2",
      role: "member",
      profiles: {
        first_name: "Minh",
        last_name: "Tâm"
      }
    }
  ]);

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
