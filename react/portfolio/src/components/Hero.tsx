import { Mail, MapPin, ArrowDown } from 'lucide-react';
import profileImg from '../assets/profile.png';
import { useLanguage } from '../context/LanguageContext';
import HighlightText from './HighlightText';

const BIO_KEYWORDS = [
    // EN
    'Backend-focused', 'distributed systems', 'scalable APIs', '.NET Core',
    'microservices architecture', 'containerized deployments', 'AI-assisted development',
    'Claude Code agents', 'MCP workflows',
    // ES
    'enfoque en backend', 'sistemas distribuidos', 'APIs escalables',
    'arquitectura de microservicios', 'despliegues con contenedores',
    'desarrollo asistido por IA', 'agentes de Claude Code', 'flujos MCP',
];

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 w-full">

                {/* Left Column: Text and Intro */}
                <div className="flex-1 space-y-6 md:space-y-8">
                    {/* Header with inline relative avatar for mobile */}
                    <div className="flex items-center justify-between gap-4 md:block">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-apple-dark text-balance leading-tight">
                            {t.hero.greeting} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-apple-dark to-apple-gray/60">Óscar.</span>
                        </h1>

                        {/* Mobile Avatar (Hidden on Desktop) */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 md:hidden">
                            <div className="absolute top-0 -left-2 w-20 h-20 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                            <div className="absolute top-0 -right-2 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
                            <div className="absolute -bottom-2 left-2 w-20 h-20 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-sm">
                                <img src={profileImg} alt="Óscar Fraile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-apple-gray font-light max-w-2xl text-balance leading-relaxed">
                        <HighlightText text={t.hero.bio} keywords={BIO_KEYWORDS} />
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-apple-gray">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{t.hero.location}</span>
                        </div>
                        <a href="mailto:oscar.fm.96@gmail.com" className="flex items-center gap-2 hover:text-apple-dark transition-colors">
                            <Mail className="w-4 h-4" />
                            <span>oscar.fm.96@gmail.com</span>
                        </a>
                    </div>

                    <div className="pt-8">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-full font-medium shadow-sm hover:shadow-md hover:bg-brand-green/90 transition-all hover:-translate-y-0.5"
                        >
                            {t.hero.projectsBtn}
                            <ArrowDown className="w-4 h-4 animate-bounce" />
                        </a>
                    </div>
                </div>

                {/* Right Column: Desktop Avatar (Hidden on Mobile) */}
                <div className="hidden md:flex justify-end items-center md:w-1/3 lg:w-2/5">
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">
                        {/* Larger background color blobs for animation */}
                        <div className="absolute top-0 -left-6 w-56 h-56 lg:w-72 lg:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                        <div className="absolute top-0 -right-6 w-56 h-56 lg:w-72 lg:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute -bottom-8 left-8 w-56 h-56 lg:w-72 lg:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '4s' }}></div>

                        {/* Profile Image container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-700 hover:scale-[1.02]">
                            <img
                                src={profileImg}
                                alt="Óscar Fraile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
