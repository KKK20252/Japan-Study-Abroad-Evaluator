import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-5 animate-fade-in">
      <div className="w-12 h-12 border-4 border-[#2C3E50] border-b-transparent rounded-full animate-spin mb-6"></div>
      <h3 className="font-serif-sc text-xl font-bold text-slate-800 mb-2">AI 正在计算...</h3>
      <p className="text-slate-400 text-sm">构建五维能力模型</p>
    </div>
  );
};
