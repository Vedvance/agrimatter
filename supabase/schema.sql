-- Agrimatter Supabase Schema with Safe Re-run Policies & Seed Data

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE,
    language TEXT DEFAULT 'hi' CHECK (language IN ('en', 'hi')),
    state TEXT,
    district TEXT,
    village TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Farms Table
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    land_size NUMERIC(6, 2) NOT NULL DEFAULT 1.0,
    irrigation_type TEXT NOT NULL CHECK (irrigation_type IN ('Rainfed', 'Borewell', 'Canal', 'Drip', 'Sprinkler')),
    latitude NUMERIC(9, 6) DEFAULT 28.6139,
    longitude NUMERIC(9, 6) DEFAULT 77.2090,
    soil_type TEXT NOT NULL CHECK (soil_type IN ('Clay', 'Loam', 'Sandy', 'Black', 'Red', 'Alluvial')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Crops Table
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    season TEXT NOT NULL CHECK (season IN ('Kharif', 'Rabi', 'Zaid', 'All-season')),
    suitable_soils TEXT[] NOT NULL,
    irrigation_need TEXT NOT NULL CHECK (irrigation_need IN ('Low', 'Medium', 'High')),
    sowing_months TEXT[] NOT NULL,
    description TEXT
);

-- 4. Farmer Crops Table
CREATE TABLE IF NOT EXISTS public.farmer_crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
    crop_stage TEXT NOT NULL CHECK (crop_stage IN ('Sowing', 'Vegetative', 'Flowering', 'Harvesting')),
    sowing_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Soil Reports Table
CREATE TABLE IF NOT EXISTS public.soil_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    ph NUMERIC(4, 2) CHECK (ph >= 0 AND ph <= 14),
    nitrogen NUMERIC(6, 2),
    phosphorus NUMERIC(6, 2),
    potassium NUMERIC(6, 2),
    report_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Crop Advisories Table
CREATE TABLE IF NOT EXISTS public.crop_advisories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
    crop_stage TEXT NOT NULL CHECK (crop_stage IN ('Sowing', 'Vegetative', 'Flowering', 'Harvesting')),
    weather_condition TEXT DEFAULT 'Normal',
    advice_english TEXT NOT NULL,
    advice_hindi TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Weather Alerts Table
CREATE TABLE IF NOT EXISTS public.weather_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('Rain', 'Frost', 'Heatwave', 'HighWind', 'Normal')),
    alert_date TIMESTAMPTZ DEFAULT NOW(),
    message TEXT NOT NULL
);

-- 8. Assistant Conversations Table
CREATE TABLE IF NOT EXISTS public.assistant_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    language TEXT DEFAULT 'hi' CHECK (language IN ('en', 'hi')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmer_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_conversations ENABLE ROW LEVEL SECURITY;

-- Drop Existing Policies to allow idempotent re-execution
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Farmers can view own farms" ON public.farms;
DROP POLICY IF EXISTS "Farmers can manage own farms" ON public.farms;
DROP POLICY IF EXISTS "Anyone can view global crops list" ON public.crops;
DROP POLICY IF EXISTS "Farmers can access own crop records" ON public.farmer_crops;
DROP POLICY IF EXISTS "Farmers can access own soil reports" ON public.soil_reports;
DROP POLICY IF EXISTS "Anyone can view crop advisories" ON public.crop_advisories;
DROP POLICY IF EXISTS "Farmers can view own weather alerts" ON public.weather_alerts;
DROP POLICY IF EXISTS "Farmers can access own assistant conversations" ON public.assistant_conversations;

-- Re-create Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Farmers can view own farms" ON public.farms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Farmers can manage own farms" ON public.farms FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view global crops list" ON public.crops FOR SELECT USING (true);
CREATE POLICY "Farmers can access own crop records" ON public.farmer_crops FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Farmers can access own soil reports" ON public.soil_reports FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Anyone can view crop advisories" ON public.crop_advisories FOR SELECT USING (true);
CREATE POLICY "Farmers can view own weather alerts" ON public.weather_alerts FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Farmers can access own assistant conversations" ON public.assistant_conversations FOR ALL USING (auth.uid() = user_id);

-- Seed Data for Crops
INSERT INTO public.crops (name, season, suitable_soils, irrigation_need, sowing_months, description) VALUES
('Rice', 'Kharif', ARRAY['Clay', 'Loam', 'Alluvial'], 'High', ARRAY['June', 'July'], 'Paddy crop requiring high standing water and humid monsoon weather.'),
('Wheat', 'Rabi', ARRAY['Loam', 'Clay', 'Alluvial'], 'Medium', ARRAY['October', 'November'], 'Staple cereal crop grown in cool winter climate across North India.'),
('Maize', 'Kharif', ARRAY['Loam', 'Black', 'Sandy'], 'Medium', ARRAY['June', 'July'], 'Versatile crop used for grain and fodder, performs best in well-drained loams.'),
('Mustard', 'Rabi', ARRAY['Loam', 'Sandy', 'Alluvial'], 'Low', ARRAY['October', 'November'], 'Major oilseed crop in Rabi season with low irrigation requirements.'),
('Soybean', 'Kharif', ARRAY['Black', 'Loam'], 'Medium', ARRAY['June', 'July'], 'Rich protein oilseed suited for heavy black soils of central India.'),
('Tomato', 'All-season', ARRAY['Loam', 'Red', 'Black'], 'High', ARRAY['August', 'September', 'January'], 'Popular commercial vegetable crop grown under drip irrigation.')
ON CONFLICT (name) DO NOTHING;
