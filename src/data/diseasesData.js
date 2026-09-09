export const cropDiseasesDatabase = [
  {
    id: "dis-tomato-late-blight",
    crop: "Tomato (टमाटर)",
    diseaseNameEn: "Late Blight",
    diseaseNameHi: "पछेती झुलसा (लेट ब्लाइट)",
    pathogen: "Phytophthora infestans (Oomycete fungus)",
    confidence: 96.4,
    severity: "Critical",
    severityColor: "text-rose-600 bg-rose-50 border-rose-200",
    sampleImage: "/tomato-late-blight.svg",
    symptoms: {
      en: "Dark, water-soaked irregular spots on leaves that rapidly enlarge and turn purplish-brown. A pale white downy mold appears on the underside of leaves during humid mornings. Stems develop dark greasy lesions.",
      hi: "पत्तियों पर गहरे भूरे या काले रंग के जलसिक्त धब्बे जो तेजी से फैलते हैं। अधिक नमी वाले मौसम में पत्ती की निचली सतह पर सफेद फफूंद दिखाई देती है। तने पर काले चिकने घाव बन जाते हैं।"
    },
    organicRemedy: {
      en: "Spray Bordeaux mixture (1%) or Copper Hydroxide (2.5 g/L). Apply Trichoderma viride (10 g/L) to soil and foliage. Spray sour buttermilk (Chhachh) mixed with copper coin extract (20 ml/L) as a traditional bio-fungicide.",
      hi: "बोर्डो मिश्रण (1%) या कॉपर हाइड्रोक्साइड (2.5 ग्राम/लीटर) का छिड़काव करें। ट्राइकोडर्मा विरिडी (10 ग्राम/लीटर) का उपयोग करें। पुरानी खट्टी छाछ में तांबे का टुकड़ा रखकर तैयार घोल (20 मिली/लीटर) का छिड़काव करें।"
    },
    chemicalTreatment: {
      en: "Immediate spray of Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 3g/Liter of water, OR Dimethomorph 50% WP (Acrobat) @ 1.5g/Liter. Repeat after 7 days if weather remains rainy/foggy.",
      hi: "साइमोक्सानिल 8% + मैंकोजेब 64% WP @ 3 ग्राम/लीटर पानी, या डाइमेथोमॉर्फ 50% WP @ 1.5 ग्राम/लीटर का तुरंत छिड़काव करें। 7 दिन बाद दोबारा दोहराएं।"
    },
    prevention: {
      en: "Avoid overhead sprinkler irrigation to keep foliage dry. Maintain proper plant spacing (60x45 cm) for airflow. Remove and burn heavily infected foliage immediately.",
      hi: "पत्तियों पर पानी छिड़कने से बचें। पौधों के बीच 60x45 सेमी की दूरी रखें ताकि हवा का संचार हो। गंभीर रूप से ग्रसित पत्तियों को तोड़कर खेत से दूर जला दें।"
    }
  },
  {
    id: "dis-wheat-yellow-rust",
    crop: "Wheat (गेहूँ)",
    diseaseNameEn: "Yellow / Stripe Rust",
    diseaseNameHi: "पीला रतुआ / हल्दी रोग",
    pathogen: "Puccinia striiformis f. sp. tritici",
    confidence: 94.8,
    severity: "Critical",
    severityColor: "text-amber-600 bg-amber-50 border-amber-200",
    sampleImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Linear, bright-yellow to orange-yellow stripes or pustules arranged parallel along leaf veins. Pustules rupture, leaving a yellow turmeric-like powder on fingers when leaves are touched.",
      hi: "पत्तियों की नसों के समानांतर पीले रंग की धारियां या फुंसियां बन जाती हैं। छूने पर अंगुलियों पर हल्दी जैसा पीला पाउडर लग जाता है। प्रकाश संश्लेषण रुकने से दाने सिकुड़ जाते हैं।"
    },
    organicRemedy: {
      en: "Spray Neem Seed Kernel Extract (NSKE 5%) or 10% Cow Urine + fermented Asafoetida (Hing) solution. Dust agricultural sulfur @ 10 kg/acre during early morning.",
      hi: "नीम बीज अर्क (NSKE 5%) या 10% गोमूत्र और हींग के घोल का छिड़काव करें। सुबह ओस के समय गंधक (सल्फर पाउडर) 10 किग्रा/एकड़ की दर से भुरकाव करें।"
    },
    chemicalTreatment: {
      en: "Spray Propiconazole 25% EC (Tilt / Result) @ 1 ml per liter of water (200 ml in 200 liters water per acre). Spray should be directed towards upper canopy during calm weather.",
      hi: "प्रोपिकोनाजोल 25% EC (टिल्ट) 1 मिली प्रति लीटर पानी (200 मिली प्रति एकड़) की दर से 200 लीटर पानी में घोलकर छिड़कें।"
    },
    prevention: {
      en: "Sow rust-resistant varieties like HD-3226, PBW-725, or DBW-187. Monitor fields regularly in late December and January when temperatures drop and moisture increases.",
      hi: "रोग प्रतिरोधी किस्में जैसे HD-3226, PBW-725, DBW-187 बोएं। दिसंबर-जनवरी में ओस और ठंड के समय नियमित निगरानी रखें।"
    }
  },
  {
    id: "dis-potato-early-blight",
    crop: "Potato (आलू)",
    diseaseNameEn: "Early Blight",
    diseaseNameHi: "अगेती झुलसा",
    pathogen: "Alternaria solani",
    confidence: 97.1,
    severity: "Moderate",
    severityColor: "text-orange-600 bg-orange-50 border-orange-200",
    sampleImage: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Characteristic 'target-board' concentric rings on older lower leaves. Lesions are dark brown, circular to oval, often bounded by leaf veins with yellow chlorotic halos.",
      hi: "निचली पुरानी पत्तियों पर गोल या अंडाकार भूरे धब्बे जिन पर संकेंद्रित छल्ले (टारगेट बोर्ड जैसी आकृति) बनती है। धब्बों के चारों ओर पीला घेरा बन जाता है।"
    },
    organicRemedy: {
      en: "Foliar application of Pseudomonas fluorescens (2.5 kg/ha) or Bio-fungicide Bacillus subtilis @ 5g/L. Spray diluted cow dung slurry supernatant with wood ash.",
      hi: "स्यूडोमोनास फ्लोरेसेंस (2.5 किग्रा/हेक्टेयर) या बैसिलस सबटिलिस का छिड़काव करें। गाय के गोबर की खाद का निथरा हुआ पानी और लकड़ी की राख का घोल छिड़कें।"
    },
    chemicalTreatment: {
      en: "Spray Mancozeb 75% WP @ 2.5 g/L OR Chlorothalonil 75% WP (Kavach) @ 2 g/L of water. In advanced stages, use Azoxystrobin 23% SC @ 1 ml/L.",
      hi: "मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर या क्लोरोथैलोनिल 75% WP @ 2 ग्राम/लीटर पानी में घोलकर छिड़कें। गंभीर स्थिति में एजोक्सीस्ट्रोबिन 23% SC @ 1 मिली/लीटर डालें।"
    },
    prevention: {
      en: "Crop rotation with non-solanaceous crops (avoid planting after tomato or eggplant). Ensure adequate potassium and nitrogen nutrition without over-fertilization.",
      hi: "टमाटर या बैंगन के तुरंत बाद आलू न बोएं (फसल चक्र अपनाएं)। पोटाश का पर्याप्त प्रयोग करें जिससे पौधों की रोग प्रतिरोधक क्षमता बढ़े।"
    }
  },
  {
    id: "dis-rice-bacterial-blight",
    crop: "Rice / Paddy (धान)",
    diseaseNameEn: "Bacterial Leaf Blight (BLB)",
    diseaseNameHi: "जीवाणु झुलसा रोग (BLB)",
    pathogen: "Xanthomonas oryzae pv. oryzae",
    confidence: 93.7,
    severity: "Critical",
    severityColor: "text-red-600 bg-red-50 border-red-200",
    sampleImage: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Water-soaked streaks starting from leaf tips and margins, progressing into wavy, dull-white or grayish-yellow desiccated stripes. In early morning, amber bacterial ooze droplets form on leaves.",
      hi: "पत्ती के सिरे और किनारों से पानी से भीगे जैसे पीले-सफेद धारियां बनती हैं जो सूखकर भूरी हो जाती हैं। सुबह के समय पत्ती पर जीवाणु का पीला तरल रस (Ooze) दिखाई देता है।"
    },
    organicRemedy: {
      en: "Spray fresh cow dung filtrate (20 kg cow dung soaked in 100L water overnight and filtered) mixed with 50g asafoetida. Apply bio-agent Pseudomonas fluorescens @ 5 ml/L.",
      hi: "ताजे गोबर का पानी (20 किग्रा गोबर 100 लीटर पानी में घोलकर छाना हुआ) छिड़कें। बायो-एजेंट स्यूडोमोनास फ्लोरेसेंस (5 मिली/लीटर) का छिड़काव करें।"
    },
    chemicalTreatment: {
      en: "Spray Streptocycline (Streptomycin sulphate + Tetracycline) @ 6g + Copper Oxychloride (Blitox 50 WP) @ 500g in 200 liters of water per acre. Immediately stop all nitrogen top-dressing.",
      hi: "स्ट्रेप्टोसाइक्लिन 6 ग्राम + कॉपर ऑक्सीक्लोराइड 500 ग्राम प्रति 200 लीटर पानी में घोलकर प्रति एकड़ छिड़कें। यूरिया का प्रयोग तुरंत पूरी तरह बंद कर दें।"
    },
    prevention: {
      en: "Avoid excessive application of Urea/Nitrogen. Drain stagnant field water for 3-4 days to introduce soil aeration.",
      hi: "खेत से अतिरिक्त पानी 3-4 दिनों के लिए निकाल दें। यूरिया की अत्यधिक मात्रा न दें क्योंकि इससे रोग तेजी से भड़कता है।"
    }
  },
  {
    id: "dis-cotton-leaf-curl",
    crop: "Cotton (कपास)",
    diseaseNameEn: "Cotton Leaf Curl Virus (CLCuV)",
    diseaseNameHi: "कपास पत्ती मरोड़ विषाणु",
    pathogen: "Begomovirus (Transmitted by Whitefly - Bemisia tabaci)",
    confidence: 95.2,
    severity: "High",
    severityColor: "text-amber-700 bg-amber-50 border-amber-200",
    sampleImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Upward or downward cupping and curling of young leaves, thickening of veins, and formation of cup-shaped enations (leaf-like outgrowths) on the underside of leaves. Stunted plant growth.",
      hi: "पत्तियों का ऊपर या नीचे की ओर मुड़ना, नसों का मोटा और गहरा हरा होना, तथा पत्ती की निचली सतह पर कटोरी जैसी छोटी पत्तियां (एनेशन) निकलना। पौधा बौना रह जाता है।"
    },
    organicRemedy: {
      en: "Install yellow sticky traps (15 traps/acre) to trap whitefly vectors. Spray 5% Neem Seed Kernel Extract (NSKE) or Agniastra / Dashaparni Ark @ 25 ml/L every 10 days.",
      hi: "सफेद मक्खी को पकड़ने के लिए पीले चिपचिपे ट्रैप (15 प्रति एकड़) लगाएं। 5% नीम तेल या ब्रह्मास्त्र/दशपर्णी अर्क (25 मिली/लीटर) का नियमित छिड़काव करें।"
    },
    chemicalTreatment: {
      en: "Control whitefly vector immediately: Spray Diafenthiuron 50% WP (Pegasus) @ 1.2 g/L OR Afidopyropen 50 g/L (Sefina) @ 2 ml/L OR Pyriproxyfen 10% + Fenpropathrin 15% EC @ 2 ml/L.",
      hi: "सफेद मक्खी की रोकथाम हेतु: डायफेंथियूरॉन 50% WP @ 1.2 ग्राम/लीटर या एफिडोपायरोपेन (सेफिना) @ 2 मिली/लीटर पानी में छिड़कें।"
    },
    prevention: {
      en: "Eradicate weed hosts (such as Parthenium, Abutilon) around field borders. Plant border rows of maize or bajra to physically block insect migration.",
      hi: "खेत की मेड़ों से गाजर घास और खरपतवार नष्ट करें। खेत के चारों ओर मक्का या बाजरा की 2-3 कतारें लगाएं जो कीटों के लिए अवरोधक का काम करती हैं।"
    }
  },
  {
    id: "dis-healthy-crop",
    crop: "Tomato / Wheat (स्वस्थ फसल)",
    diseaseNameEn: "Healthy Crop Leaf",
    diseaseNameHi: "पूर्णतः स्वस्थ पत्ती",
    pathogen: "None (Optimal Cellular Chlorophyll)",
    confidence: 99.2,
    severity: "Healthy",
    severityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    sampleImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Vibrant deep green chlorophyll coloration, clean cellular margins, no fungal pustules, necrotic spots, or insect frass detected. High photosynthetic efficiency.",
      hi: "पत्ती पूरी तरह स्वस्थ, गहरा हरा रंग, कोई दाग-धब्बे, फफूंद या कीट नहीं। प्रकाश संश्लेषण एवं पौधे का विकास उत्तम अवस्था में है।"
    },
    organicRemedy: {
      en: "Continue routine preventive spray of Jeevamrutha or Panchagavya (30 ml/L) once every 15 days to maintain plant immune vigor and beneficial microbial flora.",
      hi: "पौधों की रोग प्रतिरोधक क्षमता बनाए रखने के लिए हर 15 दिन में जीवामृत या पंचगव्य (30 मिली/लीटर) का छिड़काव जारी रखें।"
    },
    chemicalTreatment: {
      en: "No chemical fungicides or insecticides required. Save chemical input costs and protect beneficial predatory insects like ladybird beetles and spiders.",
      hi: "किसी भी रासायनिक कीटनाशक की आवश्यकता नहीं है। लागत बचाएं और मित्र कीटों (लेडीबर्ड, मकड़ियों) का संरक्षण करें।"
    },
    prevention: {
      en: "Maintain balanced soil moisture and test soil N-P-K levels periodically using AgriMatter Fertilizer Calculator.",
      hi: "मृदा में उचित नमी बनाए रखें और संतुलित उर्वरक के लिए एग्रीमैटर कैलकुलेटर का उपयोग करें।"
    }
  }
];
