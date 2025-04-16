
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CampaignTargetingProps {
  campaignId: string;
}

interface DemographicsData {
  ageRange: string;
  gender: string;
}

interface LocationData {
  country: string;
  cities: string[];
}

interface InterestsData {
  categories: string[];
}

interface BehaviorData {
  buyingHistory: string[];
}

interface TargetingData {
  demographics: DemographicsData;
  location: LocationData;
  interests: InterestsData;
  behavior: BehaviorData;
}

const CampaignTargeting = ({ campaignId }: CampaignTargetingProps) => {
  const [loading, setLoading] = useState(false);
  const [targeting, setTargeting] = useState<TargetingData>({
    demographics: {
      ageRange: '18-65',
      gender: 'all'
    },
    location: {
      country: 'Vietnam',
      cities: []
    },
    interests: {
      categories: []
    },
    behavior: {
      buyingHistory: []
    }
  });

  useEffect(() => {
    const fetchTargeting = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('campaign_targeting')
        .select('*')
        .eq('campaign_id', campaignId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not load targeting settings.",
          });
        }
        setLoading(false);
        return;
      }

      if (data) {
        // Safely handle the JSON data from the database with defaults if values are missing
        const newTargeting: TargetingData = {
          demographics: {
            ageRange: '18-65',
            gender: 'all',
            ...(typeof data.demographic_filters === 'object' ? data.demographic_filters : {})
          },
          location: {
            country: 'Vietnam',
            cities: [],
            ...(typeof data.location_filters === 'object' ? data.location_filters : {})
          },
          interests: {
            categories: [],
            ...(typeof data.interest_filters === 'object' ? data.interest_filters : {})
          },
          behavior: {
            buyingHistory: [],
            ...(typeof data.behavior_filters === 'object' ? data.behavior_filters : {})
          }
        };
        
        setTargeting(newTargeting);
      }
      setLoading(false);
    };

    if (campaignId) {
      fetchTargeting();
    }
  }, [campaignId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Fix: The upsert method expects an array of objects for batch operations
      const { error } = await supabase
        .from('campaign_targeting')
        .upsert([{
          campaign_id: campaignId,
          demographic_filters: targeting.demographics,
          location_filters: targeting.location,
          interest_filters: targeting.interests,
          behavior_filters: targeting.behavior
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Targeting settings saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save targeting settings.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (category: keyof TargetingData, field: string, value: string) => {
    setTargeting(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
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
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Demographics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="ageRange" className="text-xs">Age Range</label>
                <Input 
                  id="ageRange"
                  value={targeting.demographics.ageRange}
                  onChange={(e) => handleInputChange('demographics', 'ageRange', e.target.value)}
                  placeholder="18-65"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="text-xs">Gender</label>
                <Input 
                  id="gender"
                  value={targeting.demographics.gender}
                  onChange={(e) => handleInputChange('demographics', 'gender', e.target.value)}
                  placeholder="all, male, female"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Location</h3>
            <div className="space-y-2">
              <label htmlFor="country" className="text-xs">Country</label>
              <Input 
                id="country"
                value={targeting.location.country}
                onChange={(e) => handleInputChange('location', 'country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full" disabled={loading}>
          {loading ? 'Saving...' : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Targeting Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignTargeting;
