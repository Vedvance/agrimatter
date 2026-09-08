import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In-Memory / LocalStorage Mock Data Provider for standalone running without live Supabase
export const MOCK_PROFILE = {
  id: 'demo-farmer-id',
  full_name: 'Ramesh Kumar',
  phone: '9876543210',
  language: 'hi' as const,
  state: 'Punjab',
  district: 'Ludhiana',
  village: 'Samrala',
  created_at: new Date().toISOString()
};

export const MOCK_FARM = {
  id: 'demo-farm-id',
  user_id: 'demo-farmer-id',
  land_size: 2.5,
  irrigation_type: 'Borewell' as const,
  latitude: 30.9010,
  longitude: 75.8573,
  soil_type: 'Loam' as const
};

export const MOCK_CROPS = [
  {
    id: 'crop-1',
    name: 'Rice',
    season: 'Kharif' as const,
    suitable_soils: ['Clay', 'Loam', 'Alluvial'],
    irrigation_need: 'High' as const,
    sowing_months: ['June', 'July'],
    description: 'Paddy crop requiring high standing water and humid monsoon weather.'
  },
  {
    id: 'crop-2',
    name: 'Wheat',
    season: 'Rabi' as const,
    suitable_soils: ['Loam', 'Clay', 'Alluvial'],
    irrigation_need: 'Medium' as const,
    sowing_months: ['October', 'November'],
    description: 'Staple cereal crop grown in cool winter climate across North India.'
  },
  {
    id: 'crop-3',
    name: 'Maize',
    season: 'Kharif' as const,
    suitable_soils: ['Loam', 'Black', 'Sandy'],
    irrigation_need: 'Medium' as const,
    sowing_months: ['June', 'July'],
    description: 'Versatile crop used for grain and fodder, performs best in well-drained loams.'
  },
  {
    id: 'crop-4',
    name: 'Mustard',
    season: 'Rabi' as const,
    suitable_soils: ['Loam', 'Sandy', 'Alluvial'],
    irrigation_need: 'Low' as const,
    sowing_months: ['October', 'November'],
    description: 'Major oilseed crop in Rabi season with low irrigation requirements.'
  },
  {
    id: 'crop-5',
    name: 'Soybean',
    season: 'Kharif' as const,
    suitable_soils: ['Black', 'Loam'],
    irrigation_need: 'Medium' as const,
    sowing_months: ['June', 'July'],
    description: 'Rich protein oilseed suited for heavy black soils of central India.'
  },
  {
    id: 'crop-6',
    name: 'Tomato',
    season: 'All-season' as const,
    suitable_soils: ['Loam', 'Red', 'Black'],
    irrigation_need: 'High' as const,
    sowing_months: ['August', 'September', 'January'],
    description: 'Popular commercial vegetable crop grown under drip irrigation.'
  }
];

export const MOCK_FARMER_CROP = {
  id: 'farmer-crop-1',
  farm_id: 'demo-farm-id',
  crop_id: 'crop-2',
  crop_stage: 'Vegetative' as const,
  sowing_date: '2025-11-15',
  crop_name: 'Wheat'
};
