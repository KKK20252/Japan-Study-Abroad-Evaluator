import React, { useState } from 'react';
import { CategoryId, Question, Option } from '../types';
import { FORM_CONFIG } from '../constants';

interface AssessmentFormProps {
  category: CategoryId;
  onSubmit: (answers: Record<string, string>, totalScore: number, radarScores: number[]) => void;
  onBack: () => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ category, onSubmit, onBack }) => {
  const questions: Question[] = FORM_CONFIG[category];
  const [selections, setSelections] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelections(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all questions are answered
    if (Object.keys(selections).length < questions.length) {
      alert("请回答所有问题");
      return;
    }

    let totalScore = 0;
    // [Academic, Language, English/Special, Plan/Budget, Potential]
    const radarScores = [0, 0, 0, 0, 0];
    const answerTexts: Record<string, string> = {};

    questions.forEach(q => {
      const selectedIdx = selections[q.id];
      const selectedOption: Option = q.options[selectedIdx];
      
      answerTexts[q.label] = selectedOption.label;
      totalScore += selectedOption.value;
      
      selectedOption.dimensions.forEach((val, i) => {
        radarScores[i] += val;
      });
    });

    // Normalize radar scores to 0-100 roughly
    const normalizedRadar = radarScores.map(s => Math.min(s * 16 + 20, 100));

    onSubmit(answerTexts, totalScore, normalizedRadar);
  };

  return (
    <div className="flex flex-col h-full animate-slide-up px-5 py-6">
      <div className="text-center mb-8">
        <h2 className="font-serif-sc text-2xl font-bold text-slate-800 mb-2">完善评估档案</h2>
        <p className="text-slate-400 text-sm">为了确保结果准确，请如实填写以下信息</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg flex-1 overflow-y-auto max-h-[70vh]">
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-6 last:mb-2">
            <label className="block font-semibold text-slate-700 text-sm mb-3">
              {idx + 1}. {q.label}
            </label>
            <div className="relative">
              <select
                className="w-full p-4 text-sm bg-slate-50 border-2 border-slate-100 rounded-xl appearance-none outline-none focus:border-blue-900 transition-colors text-slate-700"
                value={selections[q.id] ?? ''}
                onChange={(e) => handleSelect(q.id, parseInt(e.target.value))}
              >
                <option value="" disabled>请选择...</option>
                {q.options.map((opt, optIdx) => (
                  <option key={optIdx} value={optIdx}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full mt-6 py-4 bg-[#2C3E50] text-white rounded-xl font-bold font-serif-sc text-lg shadow-xl shadow-slate-200 active:scale-95 transition-transform"
        >
          开始智能分析
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-400 text-sm hover:text-slate-600 transition-colors"
        >
          返回重新选择
        </button>
      </div>
    </div>
  );
};
