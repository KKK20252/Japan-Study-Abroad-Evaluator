import React, { useState } from 'react';
import { CategoryId, ViewState, AssessmentResult } from './types';
import { RADAR_LABELS } from './constants';
import { Hero } from './components/Hero';
import { AssessmentForm } from './components/AssessmentForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultView } from './components/ResultView';
import { assessProfile } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [category, setCategory] = useState<CategoryId>('undergrad');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleCategorySelect = (cat: CategoryId) => {
    setCategory(cat);
    setView('FORM');
  };

  const handleFormSubmit = async (answers: Record<string, string>, totalScore: number, radarScores: number[]) => {
    setView('LOADING');

    // Calculate Tier locally based on hard logic
    let tier: 'S' | 'A' | 'B' | 'C' = 'B';
    if (category === 'art') {
      if (totalScore >= 9) tier = 'S';
      else if (totalScore >= 6) tier = 'A';
      else tier = 'C';
    } else {
      if (totalScore >= 15) tier = 'S';
      else if (totalScore >= 12) tier = 'A';
      else if (totalScore >= 8) tier = 'B';
      else tier = 'C';
    }

    // Prepare chart data structure
    const labels = RADAR_LABELS[category];
    const radarData = labels.map((label, idx) => ({
      subject: label,
      A: radarScores[idx],
      fullMark: 100
    }));

    try {
      // Call AI for qualitative feedback
      const aiResponse = await assessProfile(category, answers, tier);
      
      setResult({
        tier,
        schools: aiResponse.schools,
        comment: aiResponse.comment,
        radarData
      });
      setView('RESULT');
    } catch (error) {
      console.error("Analysis failed", error);
      // Even if AI fails (should cover by mock in service), ensure we don't hang
      setView('HOME');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#fdfbf7]">
      <div className="w-full max-w-[500px] min-h-screen flex flex-col bg-[#fdfbf7] relative shadow-2xl shadow-slate-200">
        
        {/* Navbar */}
        <div className="px-5 py-4 flex justify-between items-center bg-[#fdfbf7]/90 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
          <div className="font-serif-sc font-bold text-lg flex items-center gap-2 text-[#2C3E50]">
            <span className="text-2xl text-[#E84A5F]">⛩</span> 留学進学研究所
          </div>
          <div className="text-xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => alert("DeepSeek Key is not used here. This app uses Gemini via environment variables.")}>
            ⚙️
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {view === 'HOME' && <Hero onSelectCategory={handleCategorySelect} />}
          {view === 'FORM' && (
            <AssessmentForm 
              category={category} 
              onSubmit={handleFormSubmit} 
              onBack={() => setView('HOME')} 
            />
          )}
          {view === 'LOADING' && <LoadingScreen />}
          {view === 'RESULT' && result && (
            <ResultView result={result} onReset={() => setView('HOME')} />
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
