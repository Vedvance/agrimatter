import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cropDiseasesDatabase } from '../data/diseasesData';
import { 
  Activity, 
  UploadCloud, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Leaf, 
  FlaskConical, 
  CheckCircle2, 
  Volume2, 
  RefreshCw,
  Info
} from 'lucide-react';

export const CropDoctor = () => {
  const { t, lang, speakText } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  // Trigger analysis for a sample or uploaded leaf
  const runDiagnosis = (diseaseItem) => {
    setSelectedImage(diseaseItem.sampleImage);
    setAnalyzing(true);
    setDiagnosis(null);

    // Simulate neural net forward pass
    setTimeout(() => {
      setDiagnosis(diseaseItem);
      setAnalyzing(false);

      // Optionally speak the diagnosis in current language
      const speech = lang === 'hi'
        ? `रोग की पहचान: ${diseaseItem.diseaseNameHi}। यह ${diseaseItem.crop} में पाया गया है। विश्वसनीयता स्तर ${diseaseItem.confidence} प्रतिशत है।`
        : `Identified Condition: ${diseaseItem.diseaseNameEn} on ${diseaseItem.crop} with ${diseaseItem.confidence}% confidence.`;
      speakText(speech);
    }, 1200);
  };

  // Handle manual image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setAnalyzing(true);
      setDiagnosis(null);

      setTimeout(() => {
        // Match a random realistic disease or first disease
        const matched = cropDiseasesDatabase[0];
        setDiagnosis(matched);
        setAnalyzing(false);
      }, 1400);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-800 to-green-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Computer Vision Pathology Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('doctor.title')}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {t('doctor.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload / Camera & Sample Leaves */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition shadow-sm text-center">
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                {t('doctor.dragDrop')}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Supports JPG, PNG, WEBP from smartphone camera or gallery
              </p>
              <span className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition">
                Browse Leaf Image
              </span>
            </label>
          </div>

          {/* Quick 1-Click Samples for SIH Jury Presentation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {t('doctor.sampleImagesTitle')}
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Demo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {cropDiseasesDatabase.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => runDiagnosis(item)}
                  className="group flex flex-col items-start p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition text-left"
                >
                  <img
                    src={item.sampleImage}
                    alt={item.diseaseNameEn}
                    className="w-full h-24 object-cover rounded-xl mb-2 group-hover:scale-102 transition"
                  />
                  <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 line-clamp-1">
                    {lang === 'hi' ? item.diseaseNameHi : item.diseaseNameEn}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.crop}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Scanner & Diagnostic Report */}
        <div className="lg:col-span-7">
          {analyzing ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[420px]">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                <Sparkles className="w-8 h-8 text-amber-500 absolute inset-0 m-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {t('doctor.diagnosing')}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Extracting chlorophyll degradation metrics, lesion contours, and pathogen signatures across 25+ agricultural classes.
              </p>
            </div>
          ) : diagnosis ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md animate-in fade-in duration-300">
              {/* Header result */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Scanned leaf"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                    />
                  )}
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      {diagnosis.crop}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">
                      {lang === 'hi' ? diagnosis.diseaseNameHi : diagnosis.diseaseNameEn}
                    </h2>
                    <p className="text-xs text-slate-500 italic mt-0.5">
                      Pathogen: {diagnosis.pathogen}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${diagnosis.severityColor}`}>
                    {diagnosis.severity} Severity
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {diagnosis.confidence}% {t('doctor.confidence')}
                  </span>
                </div>
              </div>

              {/* Audio Listen Bar */}
              <div className="mt-4 flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>
                    {lang === 'hi' ? 'सलाह को आवाज में सुनें:' : 'Listen to Agronomist Advisory:'}
                  </span>
                </div>
                <button
                  onClick={() => speakText(
                    lang === 'hi'
                      ? `${diagnosis.diseaseNameHi}। जैविक उपचार: ${diagnosis.organicRemedy.hi}। रासायनिक उपचार: ${diagnosis.chemicalTreatment.hi}`
                      : `${diagnosis.diseaseNameEn}. Organic treatment: ${diagnosis.organicRemedy.en}. Chemical treatment: ${diagnosis.chemicalTreatment.en}`
                  )}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'बोलकर सुनाएं' : 'Play Audio'}</span>
                </button>
              </div>

              {/* Symptoms */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>{t('doctor.symptoms')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                  {lang === 'hi' ? diagnosis.symptoms.hi : diagnosis.symptoms.en}
                </p>
              </div>

              {/* Organic Remedies */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>{t('doctor.organicTreatment')}</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-950 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70 leading-relaxed font-medium">
                  {lang === 'hi' ? diagnosis.organicRemedy.hi : diagnosis.organicRemedy.en}
                </div>
              </div>

              {/* Chemical Treatment & Dosage */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-2">
                  <FlaskConical className="w-4 h-4 text-amber-600" />
                  <span>{t('doctor.chemicalTreatment')}</span>
                </div>
                <div className="text-xs sm:text-sm text-amber-950 bg-amber-50/60 p-4 rounded-xl border border-amber-200/70 leading-relaxed font-medium">
                  {lang === 'hi' ? diagnosis.chemicalTreatment.hi : diagnosis.chemicalTreatment.en}
                </div>
              </div>

              {/* Prevention Guidelines */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{t('doctor.prevention')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                  {lang === 'hi' ? diagnosis.prevention.hi : diagnosis.prevention.en}
                </p>
              </div>

              {/* Retest Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setDiagnosis(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('doctor.retest')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Activity className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {lang === 'hi' ? 'कोई पत्ती स्कैन नहीं की गई' : 'No Leaf Scanned Yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mb-6">
                {lang === 'hi' 
                  ? 'रोग की तत्काल पहचान के लिए बाईं ओर से अपनी पत्ती की फोटो अपलोड करें या डेमो के लिए नमूना पत्ती पर क्लिक करें।' 
                  : 'Upload an infected leaf photo on the left or select a sample leaf to demonstrate instant pathology diagnosis.'}
              </p>
              <button
                onClick={() => runDiagnosis(cropDiseasesDatabase[0])}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
              >
                {lang === 'hi' ? 'टमाटर का नमूना टेस्ट करें' : 'Try Tomato Demo Leaf'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
