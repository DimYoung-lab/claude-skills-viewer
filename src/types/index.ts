export interface Skill {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  path?: string;
}

export interface UsageRecord {
  count: number;
  lastUsed: string;
}

export interface UsageStats {
  [skillId: string]: UsageRecord;
}

export type Language = 'zh' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
