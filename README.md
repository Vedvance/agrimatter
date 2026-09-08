# Agrimatter - Mobile-First Agricultural Decision-Support System

**Agrimatter** is a full-stack, mobile-first agricultural web application designed to help small and marginal farmers in India receive localized, simple farming advice based on location, weather, soil type, season, crop, and crop growth stage.

---

## 🌟 Key Features

1. **Dual Language Support (English & हिंदी)**:
   - Full English and Hindi translation dictionary with an instant header switcher.
   - Farmer-friendly terminology ("Namaste, Ramesh ji", "Kal baarish ki sambhavna hai...").

2. **Localized Weather Advisories (Open-Meteo Integration)**:
   - Real-time weather, 7-day daily forecast, hourly breakdown, and field spraying warnings.

3. **Crop Advisor**:
   - Rule-based suitability recommendations matching soil texture (Loam, Clay, Sandy, Black, Red, Alluvial), irrigation availability, and cropping season (Kharif, Rabi, Zaid).

4. **Soil Health Evaluator**:
   - Diagnostic analysis for pH levels, Nitrogen (N), Phosphorus (P), and Potassium (K) with organic amendment guidelines.

5. **Stage-Wise Fertilizer Guide**:
   - Crop growth stage advice (Sowing, Vegetative, Flowering, Harvesting) with organic alternatives and **compulsory safety disclaimers**.

6. **Kisan AI Voice & Text Assistant**:
   - Multilingual Q&A assistant with suggested queries and interactive microphone UI.

7. **Farmer Onboarding & Profile**:
   - Simple wizard to capture land size (acres), village location, irrigation type, and active crops.

8. **Admin Portal**:
   - Control master crop records, advisory rules, and system statistics.

---

## 🛠 Tech Stack

- **Frontend Framework**: Next.js (App Router, React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom agricultural palette (Green, Soil Brown, Harvest Yellow, Sky Blue)
- **Icons**: Lucide React
- **Backend**: Next.js API Routes (`/api/weather`, `/api/crop-recommendations`, `/api/soil-advice`, `/api/fertilizer-advice`, `/api/assistant`)
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) policies

---

## 🗄 Database Schema (Supabase PostgreSQL)

The complete SQL schema with Row Level Security (RLS) policies and seed data is located at `supabase/schema.sql`.

### Tables Created:
- `profiles`: `id`, `full_name`, `phone`, `language`, `state`, `district`, `village`, `created_at`
- `farms`: `id`, `user_id`, `land_size`, `irrigation_type`, `latitude`, `longitude`, `soil_type`
- `crops`: `id`, `name`, `season`, `suitable_soils`, `irrigation_need`, `sowing_months`, `description`
- `farmer_crops`: `id`, `farm_id`, `crop_id`, `crop_stage`, `sowing_date`
- `soil_reports`: `id`, `farm_id`, `ph`, `nitrogen`, `phosphorus`, `potassium`, `report_date`
- `crop_advisories`: `id`, `crop_id`, `crop_stage`, `weather_condition`, `advice_english`, `advice_hindi`
- `weather_alerts`: `id`, `farm_id`, `alert_type`, `alert_date`, `message`
- `assistant_conversations`: `id`, `user_id`, `question`, `answer`, `language`, `created_at`

Seed data included for: **Rice, Wheat, Maize, Mustard, Soybean, and Tomato**.

---

## 🚀 Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Type Check
```bash
npm run build
```

---

## ⚠️ Mandatory Safety Disclaimer
> "This is general guidance. For exact fertilizer doses, consult a soil test report or local agriculture officer."
