# 🌾 AgriMatter (कृषि सेतु)
### Smart India Hackathon (SIH) Prototype - Agricultural Innovation Ecosystem

**AgriMatter** is an AI-powered, human-centered web platform built for Indian farmers to solve critical agricultural challenges: eliminating predatory middlemen, cooperative equipment pooling, mitigating crop losses via leaf pathology AI, democratizing APMC Mandi prices with MSP intelligence, and providing voice-first multilingual accessibility for rural users.

---

## 🚀 Key Feature Modules

### 1. 👥 Kisan Samuday - Nearby Farmers & Equipment Sharing
- **Radius Search (5–50 km)**: Interactive slider to discover fellow farmers in adjacent villages.
- **Farmer Profile Cards**: Displays landholding size, soil types, active crops, FPO affiliations, and peer ratings.
- **Machinery Rental Co-op**: Shared pooling of high-capital machinery (Tractors, Drones, Happy Seeders, Laser Land Levelers, Rotavators) at affordable hourly rates to cut individual farming costs.
- **Direct Connect**: 1-click WhatsApp messaging and direct calling without intermediaries.
- **Farmer Self-Registration**: Allows farmers to publish their own profile and list idle machinery for extra income.

### 2. 🔬 AI Crop Doctor & Leaf Pathology Scanner
- **Computer Vision Diagnosis**: Analyzes leaves for 25+ Indian crop diseases (Late Blight, Yellow Rust, Bacterial Blight, Leaf Curl, etc.).
- **Dual-Track Treatment**:
  - **Organic & Bio-Remedies**: Jeevamrutha, Neem oil, Trichoderma viride formulas (Zero chemical residue).
  - **Scientific Chemical Prescriptions**: Exact chemical names (Mancozeb, Propiconazole, Streptocycline) with safe dosage per liter.
- **1-Click Live Demo**: Preloaded with authentic sample leaves (Tomato, Wheat, Potato, Healthy crop) for seamless jury presentations.
- **Agronomist Audio Readout**: Reads diagnosis and cure instructions aloud in Hindi or English.

### 3. 📈 APMC Mandi Intelligence & MSP Tracker
- **Real-Time Mandi Rates**: Live modal, minimum, and maximum prices synced across states.
- **MSP Margin Analysis**: Compares current mandi price with Government Minimum Support Price (MSP) and generates warning alerts if farmers are being underpaid.
- **15-Day Momentum**: Forecasts whether prices are rising, falling, or stable to guide selling decisions.

### 4. 🛒 Agri Bazaar - Direct Farm-to-Buyer Marketplace
- **Zero Commission**: Farmers sell directly to bulk wholesalers, restaurants, and retail consumers.
- **Crop Listings**: Filterable by Grains, Pulses, Vegetables, Fruits with harvest readiness date.
- **Direct WhatsApp Deals**: Instant chat with pre-filled inquiry message.

### 5. 🌦️ Hyperlocal Weather & Agro-Advisory
- **7-Day Meteorological Forecast**: Precipitation probability, humidity, and wind speed.
- **Actionable Farming Advisories**: Automated agronomic rules (e.g., *"Heavy rain in 48h - hold off on urea & pesticide spray"*).

### 6. 🏛️ Government Schemes & Subsidies Matcher
- **Central & State Schemes**: PM-KISAN, PM Fasal Bima Yojana (PMFBY), PM KUSUM Solar Pump, Kisan Credit Card (KCC), and Soil Health Card.
- **Instant Eligibility Calculator**: 3-question matcher verifying immediate subsidy qualification.

### 7. ⚖️ Smart Soil N-P-K Fertilizer Calculator
- **Balanced Nutrition**: Calculates exact bags of Urea, DAP, and MOP required based on acreage and crop type.
- **Financial Savings**: Estimates cost savings from preventing unscientific over-fertilization (saving ₹1,800 - ₹3,200 per acre).

### 8. 🎙️ Voice Assistant (AI Krishi Mitra) & Multilingual UI
- **Hands-Free Speech Navigation**: Native Web Speech API speech-to-text and text-to-speech.
- **Bilingual Interface**: Seamless 1-click toggling between **English** and **हिन्दी (Hindi)**.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Vite)
- **Styling & Design System**: Tailwind CSS with custom agricultural earth-tone palette
- **Icons**: Lucide React
- **Voice & Speech**: Browser Native Web Speech API (SpeechRecognition & SpeechSynthesisUtterance)
- **Celebrations**: Canvas Confetti

---

## 🏃 How to Run the Project Locally

1. Open PowerShell or Terminal and navigate to the project folder:
   ```bash
   cd C:\Users\VANSHIKA\.gemini\antigravity\scratch\agrimatter
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:3000
   ```

4. To build for production deployment:
   ```bash
   npm run build
   ```
