export interface SoilType {
  id: string;
  name: string;
  hindiName: string;
  texture: string;
  drainage: string;
  fertility: string;
  bestCrops: string[];
  description: string;
  richIn: string;
  deficientIn: string;
}

export interface ChemicalProperty {
  parameter: string;
  idealRange: string;
  unit: string;
  category: 'Macronutrient' | 'Secondary Nutrient' | 'Micronutrient' | 'Physical-Chemical';
  notes: string;
  hindiNotes: string;
}

export interface PHClassification {
  range: string;
  minPh: number;
  maxPh: number;
  classification: string;
  hindiClassification: string;
  suitableCrops: string[];
  management: string;
  hindiManagement: string;
}

export interface SoilDeficiency {
  deficiency: string;
  hindiDeficiency: string;
  symptoms: string;
  hindiSymptoms: string;
  correction: string;
  hindiCorrection: string;
  recommendedProducts: string[];
}

export const MAJOR_SOIL_TYPES: SoilType[] = [
  {
    id: 'alluvial',
    name: 'Alluvial Soil',
    hindiName: 'जलोढ़ मिट्टी (Alluvial Soil)',
    texture: 'Fine to medium, sandy loam to clay loam',
    drainage: 'Good',
    fertility: 'High',
    bestCrops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Jute', 'Oilseeds'],
    description: 'Formed by river deposits; highly fertile and light to work.',
    richIn: 'Potash, Lime, Phosphoric acid',
    deficientIn: 'Nitrogen, Humus'
  },
  {
    id: 'black',
    name: 'Black Soil (Regur)',
    hindiName: 'काली मिट्टी / रेगुर (Black Soil)',
    texture: 'Clayey, fine-grained',
    drainage: 'Poor (retains moisture for long periods)',
    fertility: 'High',
    bestCrops: ['Cotton', 'Soybean', 'Sugarcane', 'Sunflower', 'Groundnut', 'Wheat'],
    description: 'Self-ploughing clay soil with high swell-shrink capacity, ideal for dryland farming.',
    richIn: 'Lime, Iron, Magnesium, Carbonates, Alumina',
    deficientIn: 'Nitrogen, Phosphorus, Organic Matter'
  },
  {
    id: 'red',
    name: 'Red Soil',
    hindiName: 'लाल मिट्टी (Red Soil)',
    texture: 'Sandy to loamy',
    drainage: 'Moderate',
    fertility: 'Low to moderate',
    bestCrops: ['Groundnut', 'Millets (Ragi, Bajra)', 'Pulses', 'Potato', 'Tobacco', 'Oilseeds'],
    description: 'Developed over crystalline igneous rocks; red color due to wide diffusion of iron.',
    richIn: 'Iron, Potash',
    deficientIn: 'Nitrogen, Phosphorus, Humus, Lime'
  },
  {
    id: 'laterite',
    name: 'Laterite Soil',
    hindiName: 'लैटेराइट मिट्टी (Laterite Soil)',
    texture: 'Coarse, porous, gravelly',
    drainage: 'Good (heavily leached of nutrients)',
    fertility: 'Low',
    bestCrops: ['Tea', 'Coffee', 'Cashew', 'Rubber', 'Tapioca', 'Arecanut'],
    description: 'Formed under high temperature and heavy rainfall with alternate wet and dry periods.',
    richIn: 'Iron oxide, Aluminum oxides',
    deficientIn: 'Nitrogen, Potash, Lime, Organic Carbon'
  },
  {
    id: 'sandy',
    name: 'Sandy / Desert (Arid) Soil',
    hindiName: 'बलुई / मरुस्थलीय मिट्टी (Sandy Soil)',
    texture: 'Coarse, sandy',
    drainage: 'Excessive',
    fertility: 'Very low',
    bestCrops: ['Bajra (Pearl Millet)', 'Jowar', 'Guar', 'Moth Bean', 'Drought-resistant crops'],
    description: 'High salt content and low organic matter; requires micro-irrigation.',
    richIn: 'Soluble salts, Phosphate',
    deficientIn: 'Nitrogen, Organic Matter, Water Retention'
  },
  {
    id: 'mountain',
    name: 'Mountain / Forest Soil',
    hindiName: 'पर्वतीय / वनीय मिट्टी (Mountain Soil)',
    texture: 'Loamy, stony, heterogeneous',
    drainage: 'Variable (well-drained on slopes)',
    fertility: 'Moderate (rich in humus on upper slopes)',
    bestCrops: ['Tea', 'Coffee', 'Spices (Cardamom, Black Pepper)', 'Apples', 'Plums', 'Medicinal Plants'],
    description: 'Formed in forest regions with sufficient rainfall; organic rich surface layer.',
    richIn: 'Humus, Organic matter',
    deficientIn: 'Potash, Phosphorus, Lime'
  },
  {
    id: 'saline',
    name: 'Saline / Alkaline Soil',
    hindiName: 'लवणीय / क्षारीय मिट्टी (Saline Soil)',
    texture: 'Variable (often heavy clay or crusted)',
    drainage: 'Poor',
    fertility: 'Low (high salt accumulation)',
    bestCrops: ['Barley', 'Sugarbeet', 'Salt-tolerant Paddy', 'Mustard (with reclamation)'],
    description: 'Contains high proportions of sodium, potassium, and magnesium salts rendering it infertile.',
    richIn: 'Sodium, Chloride, Sulphates',
    deficientIn: 'Nitrogen, Calcium, Permeability'
  },
  {
    id: 'peaty',
    name: 'Peaty / Marshy Soil',
    hindiName: 'पीठ व दलदली मिट्टी (Peaty Soil)',
    texture: 'Organic, heavy, dark clay',
    drainage: 'Poor (waterlogged)',
    fertility: 'High organic matter, low available nutrients',
    bestCrops: ['Rice (Paddy with drainage management)', 'Jute'],
    description: 'Occurs in humid regions with accumulation of large amounts of organic matter.',
    richIn: 'Organic Matter (up to 40-50%), Humus',
    deficientIn: 'Potash, Phosphate, Aeration'
  }
];

export const CHEMICAL_PROPERTIES: ChemicalProperty[] = [
  {
    parameter: 'pH (Soil Reaction)',
    idealRange: '6.0 – 7.5',
    unit: 'pH scale (0-14)',
    category: 'Physical-Chemical',
    notes: 'Determines nutrient availability. Most field crops prefer slightly acidic to neutral soil.',
    hindiNotes: 'पोषक तत्वों की उपलब्धता तय करता है। अधिकांश फसलें 6.0 से 7.5 pH पसंद करती हैं।'
  },
  {
    parameter: 'Electrical Conductivity (EC)',
    idealRange: '< 1.0',
    unit: 'dS/m (deciSiemens/m)',
    category: 'Physical-Chemical',
    notes: 'Measures total soluble salts. EC > 1.0 dS/m indicates salinity stress affecting seed germination.',
    hindiNotes: 'घुलनशील लवणों की मात्रा बताता है। 1.0 dS/m से अधिक मान पौधों के विकास में बाधा डालता है।'
  },
  {
    parameter: 'Organic Carbon (OC)',
    idealRange: '0.50% – 0.75%',
    unit: '% weight',
    category: 'Physical-Chemical',
    notes: 'Primary indicator of soil fertility, microbial activity, and structure. >0.75% is high.',
    hindiNotes: 'मिट्टी की उर्वरता और जैविक गतिविधि का मुख्य सूचक। 0.75% से अधिक सर्वोत्तम है।'
  },
  {
    parameter: 'Available Nitrogen (N)',
    idealRange: '280 – 560',
    unit: 'kg/ha',
    category: 'Macronutrient',
    notes: 'Low <280 kg/ha, Medium 280-560 kg/ha, High >560 kg/ha. Essential for vegetative growth.',
    hindiNotes: 'कम <280, मध्यम 280-560, उच्च >560 किग्रा/हे। वानस्पतिक वृद्धि के लिए आवश्यक।'
  },
  {
    parameter: 'Available Phosphorus (P)',
    idealRange: '10 – 25',
    unit: 'kg/ha',
    category: 'Macronutrient',
    notes: 'Low <10 kg/ha, Medium 10-25 kg/ha, High >25 kg/ha. Critical for root establishment & flowering.',
    hindiNotes: 'कम <10, मध्यम 10-25, उच्च >25 किग्रा/हे। जड़ों के विकास व फूल बनने में सहायक।'
  },
  {
    parameter: 'Available Potassium (K)',
    idealRange: '110 – 280',
    unit: 'kg/ha',
    category: 'Macronutrient',
    notes: 'Low <110 kg/ha, Medium 110-280 kg/ha, High >280 kg/ha. Enhances stalk strength & disease immunity.',
    hindiNotes: 'कम <110, मध्यम 110-280, उच्च >280 किग्रा/हे। तने को मजबूती और बीमारियों से सुरक्षा देता है।'
  },
  {
    parameter: 'Available Sulphur (S)',
    idealRange: '10 – 20',
    unit: 'ppm (mg/kg)',
    category: 'Secondary Nutrient',
    notes: 'Essential for oil synthesis in oilseeds (mustard, groundnut) and protein formation in pulses.',
    hindiNotes: 'तिलहन (सरसों, मूंगफली) में तेल की मात्रा और दलहन में प्रोटीन वृद्धि के लिए अति आवश्यक।'
  },
  {
    parameter: 'Zinc (Zn)',
    idealRange: '0.6 minimum',
    unit: 'ppm (mg/kg)',
    category: 'Micronutrient',
    notes: 'Widespread deficiency in Indian soils. Essential for enzyme activation and internode elongation.',
    hindiNotes: 'भारतीय मिट्टियों में सबसे आम कमी। पत्तियों के आकार व पौधों की लंबाई हेतु आवश्यक।'
  },
  {
    parameter: 'Iron (Fe)',
    idealRange: '4.5 minimum',
    unit: 'ppm (mg/kg)',
    category: 'Micronutrient',
    notes: 'Deficiency causes interveinal chlorosis (yellowing of younger leaves while veins remain green).',
    hindiNotes: 'कमी होने पर नई पत्तियां पीली पड़ जाती हैं (आयरन क्लोरोसिस)।'
  },
  {
    parameter: 'Boron (B)',
    idealRange: '0.5 – 1.0',
    unit: 'ppm (mg/kg)',
    category: 'Micronutrient',
    notes: 'Vital for pollen germination, fruit set, sugar translocation, and cell wall development.',
    hindiNotes: 'परागण, फल बनने और कोशिका भित्ति के निर्माण के लिए आवश्यक।'
  }
];

export const PH_CLASSIFICATIONS: PHClassification[] = [
  {
    range: '< 5.5',
    minPh: 3.0,
    maxPh: 5.4,
    classification: 'Strongly Acidic',
    hindiClassification: 'अत्यधिक अम्लीय (Strongly Acidic)',
    suitableCrops: ['Tea', 'Potato', 'Pineapple', 'Sweet Potato', 'Blueberry', 'Cassava'],
    management: 'Apply Agricultural Lime (Calcium Carbonate) @ 200-300 kg/acre or Dolomite lime. Avoid ammonium fertilizers.',
    hindiManagement: '200-300 किग्रा/एकड़ कृषि चूना (लाइम) या डोलोमाइट मिलाएं। अमोनियम आधारित उर्वरकों से बचें।'
  },
  {
    range: '5.5 – 6.5',
    minPh: 5.5,
    maxPh: 6.4,
    classification: 'Slightly Acidic',
    hindiClassification: 'हल्की अम्लीय (Slightly Acidic)',
    suitableCrops: ['Rice (Paddy)', 'Maize', 'Groundnut', 'Soybean', 'Tomato', 'Citrus', 'Sugarcane'],
    management: 'Favorable for most tropical crops. Add well-rotted FYM/compost to maintain organic buffer capacity.',
    hindiManagement: 'अधिकतर फसलों के लिए अनुकूल। गोबर की खाद (FYM) डालकर मिट्टी की उर्वरता बनाए रखें।'
  },
  {
    range: '6.5 – 7.5',
    minPh: 6.5,
    maxPh: 7.5,
    classification: 'Neutral (Optimal)',
    hindiClassification: 'उदासीन / सर्वोत्तम (Neutral)',
    suitableCrops: ['Wheat', 'Paddy', 'Pulses (Gram, Pigeonpea)', 'Mustard', 'Vegetables (Onion, Garlic)', 'Cotton', 'Banana'],
    management: 'Maximum nutrient availability zone. Practice regular green manuring and crop rotation.',
    hindiManagement: 'पोषक तत्वों की अधिकतम उपलब्धता का क्षेत्र। फसल चक्र और हरी खाद का नियमित प्रयोग करें।'
  },
  {
    range: '7.5 – 8.5',
    minPh: 7.6,
    maxPh: 8.5,
    classification: 'Slightly Alkaline',
    hindiClassification: 'हल्की क्षारीय (Slightly Alkaline)',
    suitableCrops: ['Barley', 'Cotton', 'Sugarcane', 'Sugarbeet', 'Safflower', 'Guar'],
    management: 'Micronutrient availability (Zn, Fe) reduces. Apply Pyrites or Gypsum @ 100-150 kg/acre with organic manure.',
    hindiManagement: 'सूक्ष्म पोषक तत्वों (Zn, Fe) की उपलब्धता घटती है। पाइराइट या 100-150 किग्रा/एकड़ जिप्सम प्रयोग करें।'
  },
  {
    range: '> 8.5',
    minPh: 8.6,
    maxPh: 11.0,
    classification: 'Strongly Alkaline / Saline-Sodic',
    hindiClassification: 'अत्यधिक क्षारीय / ऊसर (Strongly Alkaline)',
    suitableCrops: ['Barley (tolerant)', 'Dhaincha (Green Manure)', 'Karnal Grass', 'Sugarbeet (under reclamation)'],
    management: 'High sodium content causes soil crusting. Apply Gypsum based on Gypsum Requirement (GR) test, followed by heavy leaching and Dhaincha incorporation.',
    hindiManagement: 'मिट्टी की ऊपरी परत सख्त होती है। जिप्सम (Gypsum) डालकर पानी भरकर लवणों की निक्षालन (leaching) करें।'
  }
];

export const SOIL_DEFICIENCIES: SoilDeficiency[] = [
  {
    deficiency: 'Nitrogen (N)',
    hindiDeficiency: 'नाइट्रोजन (N) की कमी',
    symptoms: 'Stunted growth, pale light-green to yellowing of older lower leaves (Chlorosis) starting from tip.',
    hindiSymptoms: 'पौधों की वृद्धि रुकना, पुरानी (निचली) पत्तियों का नोक से पीला पड़ना।',
    correction: 'Apply Neem-coated Urea, DAP, FYM (Farm Yard Manure) @ 5 tons/acre, grow leguminous green manure (Sesbania/Dhaincha).',
    hindiCorrection: 'नीम लेपित यूरिया, डीएपी, गोबर की खाद (5 टन/एकड़) या ढैंचा हरी खाद का प्रयोग करें।',
    recommendedProducts: ['Neem Coated Urea', 'FYM / Vermicompost', 'Azotobacter Biofertilizer']
  },
  {
    deficiency: 'Phosphorus (P)',
    hindiDeficiency: 'फास्फोरस (P) की कमी',
    symptoms: 'Purplish or reddish discoloration on leaf margins and stems, stunted root system, delayed flowering.',
    hindiSymptoms: 'पत्तियों के किनारों और तनों पर बैंगनी या लाल रंग आना, जड़ों का कम विकास, देर से फूल आना।',
    correction: 'Incorporate Single Super Phosphate (SSP) or DAP placement at sowing time near root zone; apply PSB (Phosphorus Solubilizing Bacteria).',
    hindiCorrection: 'बुआई के समय जड़ों के पास सिंगल सुपर फास्फेट (SSP) या डीएपी का प्रयोग करें; पीएसबी कल्चर मिलाएं।',
    recommendedProducts: ['Single Super Phosphate (SSP)', 'DAP (18-46-0)', 'PSB Bio-culture']
  },
  {
    deficiency: 'Potassium (K)',
    hindiDeficiency: 'पोटाश (K) की कमी',
    symptoms: 'Marginal leaf scorch or browning (tip burn) of outer leaf edges, weak lodging-prone stems.',
    hindiSymptoms: 'पत्तियों के बाहरी किनारों का भूरा होकर जलने जैसा दिखना, कमजोर तना और फसल का गिरना (Lodging)।',
    correction: 'Apply Muriate of Potash (MOP / Potassium Chloride) @ 25-40 kg/acre or Sulphate of Potash (SOP).',
    hindiCorrection: 'म्यूरेट ऑफ पोटाश (MOP) 25-40 किग्रा/एकड़ या सल्फेट ऑफ पोटाश (SOP) का प्रयोग करें।',
    recommendedProducts: ['Muriate of Potash (MOP)', 'Sulphate of Potash (SOP)', 'NPK 0-0-50']
  },
  {
    deficiency: 'Zinc (Zn)',
    hindiDeficiency: 'जिंक (Zn) की कमी',
    symptoms: 'Interveinal chlorosis (Khaira disease in Paddy), white budget/bronzing in maize, reset growth of leaves.',
    hindiSymptoms: 'धान में खैरा रोग (पत्तियों पर भूरे धब्बे), मक्के में सफेद कली (White bud), छोटी पत्तियां।',
    correction: 'Foliar spray of Zinc Sulphate (0.5%) + 0.25% Lime water, or soil application of Zinc Sulphate @ 10 kg/acre.',
    hindiCorrection: 'जिंक सल्फेट (0.5%) + 0.25% चूने के पानी का स्प्रे करें या 10 किग्रा/एकड़ जिंक सल्फेट मिट्टी में डालें।',
    recommendedProducts: ['Zinc Sulphate 21%', 'Zinc Sulphate Monohydrate 33%', 'Chelated Zinc (EDTA)']
  },
  {
    deficiency: 'Organic Matter (Low OC < 0.5%)',
    hindiDeficiency: 'जैविक कार्बन की कमी (OC < 0.5%)',
    symptoms: 'Hard crusted soil, low water retention, frequent drought stress, poor fertilizer response.',
    hindiSymptoms: 'मिट्टी की ऊपरी परत का कड़ा होना, पानी रोकने की क्षमता कम होना, पौधों का जल्दी कुम्हलाना।',
    correction: 'Apply Farmyard Manure (FYM 5-8 t/acre), Vermicompost, practice crop residue retention, and bio-char application.',
    hindiCorrection: 'गोबर की खाद (5-8 टन/एकड़), वर्मीकंपोस्ट डालें, पराली न जलाएं और फसल अवशेषों को मिट्टी में मिलाएं।',
    recommendedProducts: ['Vermicompost', 'FYM / Poultry Manure', 'Bio-decomposer']
  },
  {
    deficiency: 'Acidic Soil (pH < 5.5)',
    hindiDeficiency: 'अम्लीय मिट्टी (pH < 5.5)',
    symptoms: 'Aluminum & Manganese toxicity, stunted root growth, phosphorus fixation, poor nitrogen fixation in legumes.',
    hindiSymptoms: 'एल्यूमीनियम विषाक्तता, जड़ों की वृद्धि रुकना, फास्फोरस का लॉक होना।',
    correction: 'Broadcasting Agricultural Lime (CaCO3) @ 200-300 kg/acre 2-3 weeks before sowing; use Rock Phosphate instead of DAP.',
    hindiCorrection: 'बुआई से 2-3 सप्ताह पहले 200-300 किग्रा/एकड़ कृषि चूना (लाइम) का छिड़काव करें।',
    recommendedProducts: ['Agricultural Liming Agent', 'Dolomite Powder', 'Rock Phosphate']
  },
  {
    deficiency: 'Alkaline / Saline Soil (pH > 8.0 / EC > 1.0)',
    hindiDeficiency: 'क्षारीय / लवणीय मिट्टी (pH > 8.0 / EC > 1.0)',
    symptoms: 'White salt crust on soil surface, poor seed germination, seedling tip burn, moisture stress despite wet soil.',
    hindiSymptoms: 'मिट्टी की सतह पर सफेद लवण की परत जमना, बीजों का अंकुरण न होना, पौधों का जलना।',
    correction: 'Apply Gypsum (Calcium Sulphate) @ 200-500 kg/acre, provide subsurface drainage, flood with fresh water to leach out salts.',
    hindiCorrection: 'जिप्सम 200-500 किग्रा/एकड़ डालें, खेत में साफ पानी भरकर जल निकासी (Drainage) करें ताकि लवण बह जाएं।',
    recommendedProducts: ['Agricultural Gypsum (90% purity)', 'Elemental Sulphur', 'Dhaincha Bio-mass']
  }
];

export const PHYSICAL_PROPERTIES = [
  {
    property: 'Texture',
    hindiName: 'संरचना (Texture)',
    description: 'Proportion of Sand (0.05-2mm), Silt (0.002-0.05mm), and Clay (<0.002mm) particles.',
    ideal: 'Loam or Sandy Clay Loam',
    impact: 'Determines water retention, infiltration rate, aeration, and workability.'
  },
  {
    property: 'Structure',
    hindiName: 'बनावट (Structure)',
    description: 'Arrangement of soil particles into aggregates (granular, blocky, platy, or prismatic).',
    ideal: 'Granular / Crumb structure',
    impact: 'Granular structure allows optimal root penetration and air exchange.'
  },
  {
    property: 'Bulk Density',
    hindiName: 'स्थानिक घनत्व (Bulk Density)',
    description: 'Dry mass of soil divided by total soil volume.',
    ideal: '1.1 – 1.6 g/cm³',
    impact: 'Bulk density > 1.6 g/cm³ restricts root elongation and decreases soil aeration.'
  },
  {
    property: 'Porosity',
    hindiName: 'सरंध्रता (Porosity)',
    description: 'Percentage of total soil volume occupied by pore space (air + water).',
    ideal: '40% – 60%',
    impact: '50% porosity (25% air, 25% water) is ideal for agricultural crops.'
  },
  {
    property: 'Water Holding Capacity (WHC)',
    hindiName: 'जल धारण क्षमता (WHC)',
    description: 'Amount of water held by soil against gravitational drainage.',
    ideal: 'Loam (Moderate-High), Clay (High)',
    impact: 'Sandy soil has low WHC (frequent irrigation needed); Clay has high WHC.'
  }
];

export const BIOLOGICAL_PROPERTIES = [
  {
    property: 'Microbial Biomass Carbon',
    hindiName: 'सूक्ष्मजीवी बायोमास कार्बन',
    description: 'Living component of soil organic matter (bacteria, fungi, actinomycetes).',
    ideal: '> 200 mg/kg soil',
    significance: 'Key driver of nutrient cycling and organic matter decomposition.'
  },
  {
    property: 'Earthworm Population',
    hindiName: 'केंचुआ जनसंख्या (Earthworm Count)',
    description: 'Number of active earthworms per square meter of surface soil.',
    ideal: '> 5 – 10 earthworms / m²',
    significance: 'Creates macro-pores, improves infiltration, produces nutrient-rich worm castings.'
  },
  {
    property: 'Soil Enzyme Activity',
    hindiName: 'मृदा एंजाइम गतिविधि (Dehydrogenase, Urease)',
    description: 'Activity of enzymes synthesized by soil microbes.',
    ideal: 'High Dehydrogenase & Urease activity',
    significance: 'Reflects biological fertility and rate of nitrogen/phosphorus release.'
  }
];

export const SOIL_HEALTH_CARD_INFO = {
  title: 'Soil Health Card (SHC) 12 Key Parameters',
  hindiTitle: 'मृदा स्वास्थ्य कार्ड (Soil Health Card) के 12 मुख्य मानक',
  parameters: [
    'pH (Soil Reaction)',
    'Electrical Conductivity (EC)',
    'Organic Carbon (OC)',
    'Available Nitrogen (N)',
    'Available Phosphorus (P)',
    'Available Potassium (K)',
    'Available Sulphur (S)',
    'Available Zinc (Zn)',
    'Available Iron (Fe)',
    'Available Copper (Cu)',
    'Available Manganese (Mn)',
    'Available Boron (B)'
  ],
  testingFrequency: 'Every 2 – 3 years (or once every cropping cycle for intensive multi-cropping)',
  samplingSteps: [
    {
      step: 1,
      title: 'Sampling Depth',
      details: 'Collect soil samples from 0-15 cm (6 inches) depth for shallow/field crops, and 0-30 cm for deep-rooted fruit trees.'
    },
    {
      step: 2,
      title: 'Zig-Zag Method',
      details: 'Take 10 to 15 sub-samples from different spots across the field in a V-shaped cut, avoiding field borders, dung heaps, and shade.'
    },
    {
      step: 3,
      title: 'Mixing & Quartering',
      details: 'Mix all sub-samples thoroughly on a clean plastic sheet. Divide into 4 quarters, discard opposite two, and repeat until ~500g composite sample remains.'
    },
    {
      step: 4,
      title: 'Drying & Tagging',
      details: 'Air-dry the sample in shade (do not heat). Pack in a clean cloth/polythene bag, label with farmer name, survey number, and crop history.'
    }
  ],
  authorities: [
    { name: 'ICAR - NBSS&LUP', description: 'National Bureau of Soil Survey and Land Use Planning (India)' },
    { name: 'State Dept of Agriculture Labs', description: 'District Level Soil Testing Laboratories (Krishi Vigyan Kendra - KVK)' },
    { name: 'USDA - NRCS Soil Survey', description: 'United States Department of Agriculture Natural Resources Conservation Service' }
  ]
};
