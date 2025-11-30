import React from 'react';
import { CategoryId } from '../types';

interface HeroProps {
  onSelectCategory: (cat: CategoryId) => void;
}

const RoleCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}> = ({ icon, title, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-4"
  >
    <div className="text-4xl w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-serif-sc text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in px-5 py-8">
      <div className="text-center mb-10 mt-6">
        <span className="inline-block bg-[#E84A5F] text-white px-4 py-1 rounded-full text-xs font-medium tracking-widest mb-4 shadow-md">
          2025 AI 择校模型
        </span>
        <h1 className="font-serif-sc text-4xl leading-tight text-slate-800 mb-3">
          日本名校<br />录取概率测评
        </h1>
        <p className="text-slate-500 text-sm">
          基于 Gemini 2.5 Flash · 700+ 院校数据
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-md mx-auto">
        <RoleCard
          icon="🏫"
          title="学部 (高中生)"
          subtitle="目标：考取日本本科"
          onClick={() => onSelectCategory('undergrad')}
        />
        <RoleCard
          icon="🎓"
          title="大学院 (大学生)"
          subtitle="目标：考取修士/博士"
          onClick={() => onSelectCategory('grad')}
        />
        <RoleCard
          icon="🎨"
          title="艺术类考生"
          subtitle="目标：美院/音大"
          onClick={() => onSelectCategory('art')}
        />
      </div>
    </div>
  );
};
