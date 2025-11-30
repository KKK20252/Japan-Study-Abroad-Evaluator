import React from 'react';
import { AssessmentResult } from '../types';
import { RadarChartComponent } from './RadarChart';

interface ResultViewProps {
  result: AssessmentResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const getTierColor = (tier: string) => {
    if (tier === 'S') return 'text-[#F1C40F] drop-shadow-[0_0_15px_rgba(241,196,15,0.6)]';
    if (tier === 'A') return 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]';
    return 'text-slate-200';
  };

  const getPercentile = (tier: string) => {
    switch (tier) {
      case 'S': return '超越了 98% 的同期申请者';
      case 'A': return '超越了 85% 的同期申请者';
      case 'B': return '超越了 60% 的同期申请者';
      default: return '仍有较大提升空间';
    }
  };

  return (
    <div className="flex flex-col animate-slide-up px-5 py-6 pb-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        {/* Header with Tier */}
        <div className="bg-[#2C3E50] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:10px_10px]"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1 rounded-full text-white text-xs mb-4">
              综合胜任力评级
            </div>
            <div className={`font-serif-sc text-7xl font-extrabold leading-none mb-3 ${getTierColor(result.tier)}`}>
              {result.tier}
            </div>
            <p className="text-white/90 text-sm font-light">
              {getPercentile(result.tier)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <RadarChartComponent data={result.radarData} />

        {/* Analysis Content */}
        <div className="p-6 pt-2">
          {/* Schools */}
          <div className="mb-6">
            <h3 className="flex items-center justify-between font-serif-sc font-bold text-lg text-slate-800 mb-4 border-l-4 border-[#E84A5F] pl-3">
              <span>🎯 AI 推荐申请范围</span>
              <span className="text-xs font-normal text-slate-400">匹配度 Top3</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.schools.map((school, i) => (
                <span key={i} className="bg-[#F0F4F8] text-slate-700 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200">
                  {school}
                </span>
              ))}
            </div>
          </div>

          {/* AI Comment */}
          <div>
            <h3 className="font-serif-sc font-bold text-lg text-slate-800 mb-4 border-l-4 border-[#E84A5F] pl-3">
              📝 专家深度点评
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border-l-2 border-slate-200 text-sm leading-relaxed text-slate-600 text-justify">
              {result.comment}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => alert('已预约！咨询顾问将稍后联系您。')}
        className="w-full py-4 bg-[#E84A5F] text-white rounded-xl font-bold font-serif-sc text-lg shadow-lg active:scale-95 transition-transform mb-4"
      >
        获取完整选校报告 (PDF)
      </button>

      <button
        onClick={onReset}
        className="text-slate-400 text-sm hover:text-slate-600 transition-colors text-center w-full"
      >
        返回首页重新测评
      </button>
    </div>
  );
};
