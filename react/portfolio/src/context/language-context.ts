import { createContext } from 'react';
import type { Translations } from './translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    t: Translations;
    toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
