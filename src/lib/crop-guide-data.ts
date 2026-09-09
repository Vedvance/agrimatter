export interface MajorCropCategory {
  id: string;
  category: string;
  hindiCategory: string;
  examples: string[];
  description: string;
  hindiDescription: string;
}

export interface CropGrowingData {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial' | 'Year-round';
  soilPh: string;
  soilType: string;
  tempRange: string;
  waterReq: string;
  waterReqMm: string;
  durationDays: string;
  avgYieldTonnesHa: string;
  harvestIndicator: string;
  hindiHarvestIndicator: string;
  npkKgHa: { n: number; p: number; k: number };
  pests: string[];
  diseases: string[];
}

export interface CropRotationRule {
  practice: string;
  hindiPractice: string;
  example: string;
  hindiExample: string;
  benefit: string;
  hindiBenefit: string;
  category: 'Rotation' | 'Companion' | 'Avoid';
}

export const CROP_CATEGORIES: MajorCropCategory[] = [
  {
    id: 'cereals',
    category: 'Cereals',
    hindiCategory: 'अनाज (Cereals)',
    examples: ['Rice (धान)', 'Wheat (गेहूँ)', 'Maize (मक्का)', 'Barley (जौ)', 'Sorghum (ज्वार)', 'Pearl Millet (बाजरा)', 'Finger Millet (रागी)'],
    description: 'Staple food crops providing primary dietary carbohydrates and energy.',
    hindiDescription: 'मुख्य खाद्य फसलें जो प्राथमिक कार्बोहाइड्रेट और ऊर्जा प्रदान करती हैं।'
  },
  {
    id: 'pulses',
    category: 'Pulses (Legumes)',
    hindiCategory: 'दलहन (Pulses)',
    examples: ['Chickpea / Gram (चना)', 'Pigeon Pea / Arhar (अरहर)', 'Lentil (मसूर)', 'Black Gram (उड़द)', 'Green Gram (मूंग)'],
    description: 'Protein-rich leguminous crops that fix atmospheric nitrogen to enrich soil.',
    hindiDescription: 'प्रोटीन से भरपूर फसलें जो वायुमंडलीय नाइट्रोजन को मिट्टी में स्थिर (Fixation) करती हैं।'
  },
  {
    id: 'oilseeds',
    category: 'Oilseeds',
    hindiCategory: 'तिलहन (Oilseeds)',
    examples: ['Groundnut (मूंगफली)', 'Mustard (सरसों)', 'Soybean (सोयाबीन)', 'Sunflower (सूरजमुखी)', 'Sesame (तिल)', 'Castor (अरंडी)'],
    description: 'Crops grown for vegetable oil extraction and proteinaceous oilcake fodder.',
    hindiDescription: 'खाद्य तेल निष्कर्षण और खल (पशु आहार) हेतु उगाई जाने वाली फसलें।'
  },
  {
    id: 'cash',
    category: 'Cash Crops',
    hindiCategory: 'नकदी फसलें (Cash Crops)',
    examples: ['Cotton (कपास)', 'Sugarcane (गन्ना)', 'Jute (जूट)', 'Tobacco (तंबाकू)'],
    description: 'Commercial crops cultivated primarily for sale and industrial raw materials.',
    hindiDescription: 'वाणिज्यिक फसलें जिन्हें सीधे बिक्री व औद्योगिक कच्चे माल हेतु उगाया जाता है।'
  },
  {
    id: 'fruits',
    category: 'Fruits',
    hindiCategory: 'फल (Fruits)',
    examples: ['Mango (आम)', 'Banana (केला)', 'Citrus (नेबू/संतरा)', 'Grapes (अंगूर)', 'Apple (सेब)', 'Papaya (पपीता)'],
    description: 'Perennial & horticultural crops rich in vitamins, minerals, and dietary fiber.',
    hindiDescription: 'विटामिन, खनिज और आहार फाइबर से भरपूर बागवानी फसलें।'
  },
  {
    id: 'vegetables',
    category: 'Vegetables',
    hindiCategory: 'सब्जियां (Vegetables)',
    examples: ['Tomato (टमाटर)', 'Potato (आलू)', 'Onion (प्याज)', 'Brinjal (बैंगन)', 'Cabbage (पत्तागोभी)', 'Cauliflower (फूलगोभी)', 'Okra (भिंडी)'],
    description: 'Short-duration horticultural crops grown for fresh dietary consumption.',
    hindiDescription: 'ताजे भोजन के लिए उगाई जाने वाली कम अवधि की बागवानी फसलें।'
  },
  {
    id: 'spices',
    category: 'Spices',
    hindiCategory: 'मसाले (Spices)',
    examples: ['Turmeric (हल्दी)', 'Chili (मिर्च)', 'Coriander (धनिया)', 'Cumin (जीरा)', 'Ginger (अदरक)', 'Cardamom (इलायची)'],
    description: 'High-value aromatic crops used for flavoring, seasoning, and medicinal purposes.',
    hindiDescription: 'सुगंधित एवं औषधीय मूल्य वाली उच्च लाभांश वाली फसलें।'
  },
  {
    id: 'plantation',
    category: 'Plantation Crops',
    hindiCategory: 'रोपण फसलें (Plantation Crops)',
    examples: ['Tea (चाय)', 'Coffee (कॉफी)', 'Rubber (रबर)', 'Coconut (नारियल)', 'Cashew (काजू)'],
    description: 'Large-scale estate crops usually grown in tropical regions for continuous harvest.',
    hindiDescription: 'व्यापक स्तर पर उगाई जाने वाली बारहमासी बागान फसलें।'
  },
  {
    id: 'fodder',
    category: 'Fodder Crops',
    hindiCategory: 'चारा फसलें (Fodder Crops)',
    examples: ['Alfalfa / Lucerne (रिजका)', 'Berseem (बरसीम)', 'Maize Fodder (चारा मक्का)', 'Sorghum Fodder (चरी)'],
    description: 'High-biomass forage crops grown as nutrition for dairy and livestock.',
    hindiDescription: 'पशुधन के पोषण और दुग्ध उत्पादन हेतु उगाई जाने वाली हरा चारा फसलें।'
  }
];

export const CROP_GROWING_DATA: CropGrowingData[] = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    hindiName: 'धान / चावल (Rice)',
    category: 'Cereals',
    season: 'Kharif',
    soilPh: '5.5 – 6.5',
    soilType: 'Clayey, Alluvial',
    tempRange: '20°C – 35°C',
    waterReq: 'High',
    waterReqMm: '1000 – 1500 mm',
    durationDays: '100 – 150 days',
    avgYieldTonnesHa: '2.5 – 4.0 t/ha (10 – 16 q/acre)',
    harvestIndicator: 'Golden-yellow grains, 80–85% panicle maturity',
    hindiHarvestIndicator: 'बालियों का 80-85% सुनहरा पीला होना',
    npkKgHa: { n: 110, p: 55, k: 50 },
    pests: ['Stem borer (तना छेदक)', 'Leaf folder (पत्ती लपेटक)', 'Brown planthopper (भूरा भूंग)'],
    diseases: ['Paddy Blast (झुलसा রোগ)', 'Bacterial Leaf Blight (जीवाणु झुलसा)', 'Sheath Blight']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    hindiName: 'गेहूँ (Wheat)',
    category: 'Cereals',
    season: 'Rabi',
    soilPh: '6.0 – 7.5',
    soilType: 'Loamy, Alluvial',
    tempRange: '10°C – 25°C',
    waterReq: 'Moderate',
    waterReqMm: '450 – 650 mm',
    durationDays: '100 – 150 days',
    avgYieldTonnesHa: '3.0 – 4.5 t/ha (12 – 18 q/acre)',
    harvestIndicator: 'Golden straw color, hard grain (moisture <14%)',
    hindiHarvestIndicator: 'सुखी सुनहरी पत्तियां व सख्त दाना (नमी <14%)',
    npkKgHa: { n: 110, p: 55, k: 45 },
    pests: ['Aphids (माहू / चेपा)', 'Termites (दीमक)'],
    diseases: ['Yellow / Brown Rust (रतुआ)', 'Powdery Mildew (चूर्णी फफूंद)']
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    hindiName: 'मक्का (Maize)',
    category: 'Cereals',
    season: 'Kharif',
    soilPh: '5.5 – 7.5',
    soilType: 'Well-drained Loamy',
    tempRange: '18°C – 27°C',
    waterReq: 'Moderate',
    waterReqMm: '500 – 800 mm',
    durationDays: '80 – 110 days',
    avgYieldTonnesHa: '2.5 – 6.0 t/ha (10 – 24 q/acre)',
    harvestIndicator: 'Husk turning brownish-dry, black layer at kernel base',
    hindiHarvestIndicator: 'भुट्टे का छिलका भूरा व सुखा होना',
    npkKgHa: { n: 135, p: 65, k: 45 },
    pests: ['Fall Armyworm (फॉल आर्मीवॉर्म)', 'Stem borer'],
    diseases: ['Turcicum Leaf Blight', 'Maydis Leaf Blight']
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    hindiName: 'गन्ना (Sugarcane)',
    category: 'Cash Crops',
    season: 'Perennial',
    soilPh: '6.5 – 7.5',
    soilType: 'Deep Loamy, Alluvial',
    tempRange: '20°C – 35°C',
    waterReq: 'Very High',
    waterReqMm: '1500 – 2500 mm',
    durationDays: '300 – 365 days',
    avgYieldTonnesHa: '70 – 100 t/ha (280 – 400 q/acre)',
    harvestIndicator: 'Metallic sound on tapping, Hand Refractometer Brix 18–22%',
    hindiHarvestIndicator: 'तने का कड़ा होना व ब्रिक्स (शर्करा) 18-22%',
    npkKgHa: { n: 275, p: 90, k: 110 },
    pests: ['Early Shoot Borer', 'Top Borer', 'Pyrilla (पायरीला)'],
    diseases: ['Red Rot (लाल सड़न)', 'Smut (कंडुआ)']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    hindiName: 'कपास (Cotton)',
    category: 'Cash Crops',
    season: 'Kharif',
    soilPh: '6.0 – 8.0',
    soilType: 'Black Soil (Regur)',
    tempRange: '21°C – 30°C',
    waterReq: 'Moderate',
    waterReqMm: '600 – 1200 mm',
    durationDays: '150 – 180 days',
    avgYieldTonnesHa: '0.4 – 0.6 t lint/ha (4 – 6 q lint/acre)',
    harvestIndicator: 'Bolls fully burst open, lint fluffy and dry',
    hindiHarvestIndicator: 'टिंडों (Bolls) का पूरी तरह खिलना',
    npkKgHa: { n: 125, p: 55, k: 55 },
    pests: ['Pink Bollworm (गुलाबी सुंडी)', 'Whitefly (सफेद मक्खी)', 'Jassids'],
    diseases: ['Fusarium Wilt', 'Cotton Leaf Curl Virus (CLCuV)']
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    hindiName: 'मूंगफली (Groundnut)',
    category: 'Oilseeds',
    season: 'Kharif',
    soilPh: '6.0 – 6.5',
    soilType: 'Sandy Loam',
    tempRange: '20°C – 30°C',
    waterReq: 'Moderate',
    waterReqMm: '500 – 750 mm',
    durationDays: '100 – 130 days',
    avgYieldTonnesHa: '1.8 – 2.5 t/ha (7 – 10 q/acre)',
    harvestIndicator: 'Yellowing of foliage, inner pod shell dark brown/black',
    hindiHarvestIndicator: 'पत्तियों का पीला पड़ना व फली के अंदर काला निशान',
    npkKgHa: { n: 22, p: 45, k: 45 },
    pests: ['Red Hairy Caterpillar', 'Aphids', 'White Grub'],
    diseases: ['Tikka Disease (पत्ती धब्बा)', 'Stem Rot']
  },
  {
    id: 'soybean',
    name: 'Soybean',
    hindiName: 'सोयाबीन (Soybean)',
    category: 'Oilseeds',
    season: 'Kharif',
    soilPh: '6.0 – 7.5',
    soilType: 'Loamy, Black Soil',
    tempRange: '20°C – 30°C',
    waterReq: 'Moderate',
    waterReqMm: '450 – 700 mm',
    durationDays: '90 – 120 days',
    avgYieldTonnesHa: '2.0 – 3.0 t/ha (8 – 12 q/acre)',
    harvestIndicator: 'Leaves turn yellow and drop off, pods rattling sound',
    hindiHarvestIndicator: 'पत्तियों का झड़ना व फलियों से खड़खड़ की आवाज',
    npkKgHa: { n: 25, p: 70, k: 45 },
    pests: ['Girdle Beetle', 'Tobacco Caterpillar'],
    diseases: ['Yellow Mosaic Virus', 'Charcoal Rot']
  },
  {
    id: 'mustard',
    name: 'Mustard (Rapeseed)',
    hindiName: 'सरसों (Mustard)',
    category: 'Oilseeds',
    season: 'Rabi',
    soilPh: '6.0 – 7.5',
    soilType: 'Loamy to Sandy Loam',
    tempRange: '10°C – 25°C',
    waterReq: 'Low',
    waterReqMm: '300 – 400 mm',
    durationDays: '100 – 150 days',
    avgYieldTonnesHa: '1.5 – 2.2 t/ha (6 – 9 q/acre)',
    harvestIndicator: 'Pods turn yellowish-brown, seeds hard and dark',
    hindiHarvestIndicator: 'फलियां पीली-भूरी होना व दाना सख्त होना',
    npkKgHa: { n: 80, p: 40, k: 40 },
    pests: ['Mustard Aphids (चेपा)', 'Sawfly'],
    diseases: ['Alternaria Blight', 'White Rust']
  },
  {
    id: 'chickpea',
    name: 'Chickpea (Gram / Chana)',
    hindiName: 'चना (Chickpea)',
    category: 'Pulses',
    season: 'Rabi',
    soilPh: '6.0 – 7.5',
    soilType: 'Loamy, Black Soil',
    tempRange: '10°C – 25°C',
    waterReq: 'Low',
    waterReqMm: '300 – 400 mm',
    durationDays: '90 – 120 days',
    avgYieldTonnesHa: '1.5 – 2.5 t/ha (6 – 10 q/acre)',
    harvestIndicator: 'Plants dry out, leaves shed, pods turn brownish',
    hindiHarvestIndicator: 'पौधों का सूखना व फलियों का भूरा होना',
    npkKgHa: { n: 20, p: 50, k: 20 },
    pests: ['Gram Pod Borer (फली छेदक)', 'Cutworm'],
    diseases: ['Wilt (उकठा रोग)', 'Ascochyta Blight']
  },
  {
    id: 'potato',
    name: 'Potato',
    hindiName: 'आलू (Potato)',
    category: 'Vegetables',
    season: 'Rabi',
    soilPh: '5.0 – 6.5',
    soilType: 'Sandy Loam',
    tempRange: '15°C – 20°C',
    waterReq: 'Moderate',
    waterReqMm: '500 – 700 mm',
    durationDays: '90 – 120 days',
    avgYieldTonnesHa: '20 – 25 t/ha (80 – 100 q/acre)',
    harvestIndicator: 'Top foliage yellowing, skin of tuber hardens',
    hindiHarvestIndicator: 'बेलों (फोलिएज) का पीला पड़कर सूखना',
    npkKgHa: { n: 135, p: 70, k: 110 },
    pests: ['Potato Aphids', 'Cutworm', 'Potato Tuber Moth'],
    diseases: ['Late Blight (पिछैता झुलसा)', 'Early Blight', 'Black Scurf']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    hindiName: 'टमाटर (Tomato)',
    category: 'Vegetables',
    season: 'Year-round',
    soilPh: '6.0 – 6.8',
    soilType: 'Loamy, Well-drained',
    tempRange: '20°C – 27°C',
    waterReq: 'Moderate',
    waterReqMm: '400 – 600 mm',
    durationDays: '90 – 120 days',
    avgYieldTonnesHa: '25 – 45 t/ha (100 – 180 q/acre)',
    harvestIndicator: 'Breaker stage to firm red ripe stage depending on market distance',
    hindiHarvestIndicator: 'फलों का लाल रंग पकड़ना (Breaker stage)',
    npkKgHa: { n: 110, p: 70, k: 80 },
    pests: ['Fruit Borer (फल छेदक)', 'Whitefly', 'Leaf Miner'],
    diseases: ['Early / Late Blight', 'Tomato Leaf Curl Virus (ToLCV)']
  },
  {
    id: 'onion',
    name: 'Onion',
    hindiName: 'प्याज (Onion)',
    category: 'Vegetables',
    season: 'Rabi',
    soilPh: '6.0 – 7.0',
    soilType: 'Friable Loam',
    tempRange: '13°C – 24°C',
    waterReq: 'Moderate',
    waterReqMm: '350 – 550 mm',
    durationDays: '100 – 150 days',
    avgYieldTonnesHa: '18 – 25 t/ha (70 – 100 q/acre)',
    harvestIndicator: '50% neck fall (tops collapse naturally)',
    hindiHarvestIndicator: '50% पौधों की गर्दन गिरना (Neck fall)',
    npkKgHa: { n: 100, p: 50, k: 50 },
    pests: ['Thrips (थ्रिप्स)', 'Onion Maggot'],
    diseases: ['Purple Blotch (बैंगनी धब्बा)', 'Downy Mildew']
  },
  {
    id: 'tea',
    name: 'Tea',
    hindiName: 'चाय (Tea)',
    category: 'Plantation Crops',
    season: 'Perennial',
    soilPh: '4.5 – 5.5',
    soilType: 'Acidic Laterite, Hill slopes',
    tempRange: '18°C – 30°C',
    waterReq: 'High',
    waterReqMm: '1500 – 2500 mm',
    durationDays: 'Perennial (Plucking every 7-10 days)',
    avgYieldTonnesHa: '1.8 – 2.5 t made tea/ha',
    harvestIndicator: 'Two leaves and a bud stage',
    hindiHarvestIndicator: 'दो पत्ती एवं एक कली (Two leaves & a bud)',
    npkKgHa: { n: 150, p: 50, k: 100 },
    pests: ['Tea Mosquito Bug', 'Red Spider Mite'],
    diseases: ['Blister Blight', 'Black Rot']
  },
  {
    id: 'coffee',
    name: 'Coffee',
    hindiName: 'कॉफी (Coffee)',
    category: 'Plantation Crops',
    season: 'Perennial',
    soilPh: '5.0 – 6.5',
    soilType: 'Well-drained Deep Loam',
    tempRange: '15°C – 28°C',
    waterReq: 'High',
    waterReqMm: '1500 – 2000 mm',
    durationDays: 'Perennial (Annual berry picking)',
    avgYieldTonnesHa: '0.8 – 1.2 t clean coffee/ha',
    harvestIndicator: 'Berries turn dark red/crimson ripe',
    hindiHarvestIndicator: 'चेरी का गहरा लाल रंग में पकना',
    npkKgHa: { n: 140, p: 90, k: 140 },
    pests: ['Coffee Berry Borer', 'White Stem Borer'],
    diseases: ['Coffee Leaf Rust (Hemileia vastatrix)', 'Black Rot']
  }
];

export const CROP_ROTATION_RULES: CropRotationRule[] = [
  {
    practice: 'Cereal – Legume Rotation',
    hindiPractice: 'अनाज – दलहन फसल चक्र',
    example: 'Rice → Chickpea, Maize → Soybean, Wheat → Green Gram',
    hindiExample: 'धान → चना, मक्का → सोयाबीन, गेहूँ → मूंग',
    benefit: 'Legumes fix atmospheric nitrogen, breaking cereal disease cycles and rebuilding organic fertility.',
    hindiBenefit: 'दलहन फसलें नाइट्रोजन फिक्स करती हैं, जिससे अगली फसल के लिए उर्रवरक की बचत होती है।',
    category: 'Rotation'
  },
  {
    practice: 'Deep – Shallow Root Rotation',
    hindiPractice: 'गहरी – उथली जड़ फसल चक्र',
    example: 'Cotton (deep root) → Wheat (shallow root), Sugarcane → Mustard',
    hindiExample: 'कपास (गहरी जड़) → गेहूँ (उथली जड़)',
    benefit: 'Draws nutrients from different soil horizons, preventing hardpan compaction.',
    hindiBenefit: 'विभिन्न गहराई की मिट्टी से पोषक तत्व मिलते हैं और मिट्टी सख्त नहीं होती।',
    category: 'Rotation'
  },
  {
    practice: 'Companion Planting (Intercropping)',
    hindiPractice: 'सह-खेती / सह-फसली (Companion Planting)',
    example: 'Maize + Beans + Squash ("Three Sisters"), Tomato + Basil, Sugarcane + Potato',
    hindiExample: 'मक्का + बीन्स + कद्दू ("थ्री सिस्टर्स"), गन्ना + आलू',
    benefit: 'Mutual shading, natural insect deterrence, and maximized vertical space utilization.',
    hindiBenefit: 'कीट नियंत्रण, नमी संरक्षण और कम जगह में दोगुनी उपज।',
    category: 'Companion'
  },
  {
    practice: 'Avoid Monoculture in Same Family',
    hindiPractice: 'एक ही कुल की फसलों का दोह्राव न करें',
    example: 'Do NOT plant Solanaceous crops (Tomato → Potato → Brinjal) consecutively',
    hindiExample: 'सोलेनेसी कुल (टमाटर → आलू → बैंगन) को लगातार न लगाएं',
    benefit: 'Prevents massive soil-borne fungal spore and nematode pest population buildup.',
    hindiBenefit: 'मिट्टी जनित बीमारियों और कीटों के प्रकोप को रोकता है।',
    category: 'Avoid'
  }
];
