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
            {/* Cabecera flotante redondeada (isla pastel). */}
            <header className="sticky top-3 z-50 px-3">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border-2 border-border bg-surface/80 px-3 py-2 backdrop-blur-md shadow-[0_14px_30px_-20px_rgba(60,40,20,0.4)]">
                    <a href="#" className="flex items-center pl-1.5 transition-opacity hover:opacity-80">
                        <img src={logoImg} alt="Óscar Fraile" className="h-7 object-contain" />
                    </a>

                    <nav className="flex items-center gap-1.5 sm:gap-2">
                        <a
                            href={t.header.cvFile}
                            download
                            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                        >
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">{t.header.downloadCV}</span>
                        </a>

                        <a
                            href="https://github.com/oscarfr96"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-accent-strong sm:flex"
                        >
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                        </a>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                            aria-label="Toggle language"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            <span>{language.toUpperCase()}</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="mx-auto w-full max-w-5xl flex-1 px-6">
                {children}
            </main>

            <footer className="mt-24 border-t border-border py-12">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink-muted md:flex-row">
                    <p>{t.footer.copyright}</p>
                    <a href="mailto:oscar.fm.96@gmail.com" className="transition-colors hover:text-accent-strong">
                        oscar.fm.96@gmail.com
                    </a>
                </div>
            </footer>
        </div>
    );
}
