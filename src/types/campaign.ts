
import { Json } from '@/integrations/supabase/types';

export interface DemographicsData {
  ageRange: string;
  gender: string;
}

export interface LocationData {
  country: string;
  cities: string[];
}

export interface InterestsData {
  categories: string[];
}

export interface BehaviorData {
  buyingHistory: string[];
}

export interface TargetingData {
  demographics: DemographicsData;
  location: LocationData;
  interests: InterestsData;
  behavior: BehaviorData;
}

export interface CampaignTargetingRecord {
  campaign_id: string;
  demographic_filters: Json;
  location_filters: Json;
  interest_filters: Json;
  behavior_filters: Json;
  created_at?: string;
  updated_at?: string;
  id?: string;
}
