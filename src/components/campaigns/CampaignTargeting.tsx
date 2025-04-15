
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CampaignTargetingProps {
  campaignId: string;
}

const CampaignTargeting = ({ campaignId }: CampaignTargetingProps) => {
  const [targeting, setTargeting] = useState({
    demographics: {},
    location: {},
    interests: {},
    behavior: {}
  });

  const handleSave = async () => {
    const { error } = await supabase
      .from('campaign_targeting')
      .insert({
        campaign_id: campaignId,
        demographic_filters: targeting.demographics,
        location_filters: targeting.location,
        interest_filters: targeting.interests,
        behavior_filters: targeting.behavior
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save targeting settings.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Targeting settings saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Campaign Targeting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Targeting Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignTargeting;
