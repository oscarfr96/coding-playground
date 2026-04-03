import { Github, FileText, Globe } from 'lucide-react';
import React from 'react';
import logoImg from '../assets/logo-oscarfraile.png';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-apple-border/40">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src={logoImg} alt="Óscar Fraile" className="h-8 object-contain" />
                    </a>

                    <nav className="flex items-center gap-3 sm:gap-4">
                        <a
                            href={t.header.cvFile}
                            download
                            className="group flex items-center gap-2 text-sm font-medium text-apple-dark/80 hover:text-apple-dark transition-colors px-3 py-2 rounded-full hover:bg-apple-border/20"
                        >
                            <FileText className="w-4 h-4" />
                            <span className="hidden sm:inline">{t.header.downloadCV}</span>
                        </a>

                        <a
                            href="https://github.com/oscarfr96"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:flex items-center gap-2 text-sm font-medium text-apple-dark bg-apple-border/20 hover:bg-apple-border/40 transition-colors px-4 py-2 rounded-full"
                        >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 text-xs font-semibold text-apple-gray hover:text-apple-dark px-2 py-1.5 rounded-md hover:bg-apple-border/20 transition-all border border-transparent hover:border-apple-border/40"
                            aria-label="Toggle language"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{language.toUpperCase()}</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto px-6 w-full">
                {children}
            </main>

            <footer className="py-12 border-t border-apple-border/40 mt-24">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-apple-gray">
                    <p>{t.footer.copyright}</p>
                    <a href="mailto:oscar.fm.96@gmail.com" className="hover:text-apple-dark transition-colors">
                        oscar.fm.96@gmail.com
                    </a>
                </div>
            </footer>
        </div>
    );
}
