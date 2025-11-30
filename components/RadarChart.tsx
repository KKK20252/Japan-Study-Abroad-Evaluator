import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface Props {
  data: { subject: string; A: number; fullMark: number }[];
}

export const RadarChartComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[260px] bg-white rounded-b-2xl -mt-4 pt-4 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#f0f0f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#333', fontSize: 11, fontFamily: 'Noto Serif SC' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Competitiveness"
            dataKey="A"
            stroke="#E84A5F"
            strokeWidth={2}
            fill="#E84A5F"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
