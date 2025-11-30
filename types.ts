export type CategoryId = 'undergrad' | 'grad' | 'art';

export interface Option {
  label: string;
  value: number;
  dimensions: number[]; // [Academic, Language, English/Special, Plan/Budget, Potential]
}

export interface Question {
  id: string;
  label: string;
  options: Option[];
}

export interface FormConfig {
  undergrad: Question[];
  grad: Question[];
  art: Question[];
}

export interface AssessmentResult {
  tier: 'S' | 'A' | 'B' | 'C';
  schools: string[];
  comment: string;
  radarData: { subject: string; A: number; fullMark: number }[];
}

export type ViewState = 'HOME' | 'FORM' | 'LOADING' | 'RESULT';
