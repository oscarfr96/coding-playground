import { useState } from 'react';
import type { ReactNode } from 'react';
import { en, es } from './translations';
import { LanguageContext } from './language-context';
import type { Language } from './language-context';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
    };

    const t = language === 'en' ? en : es;

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
