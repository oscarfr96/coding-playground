import { ArrowDown, Github, MapPin } from 'lucide-react';
import profileImg from '../assets/oscar-cutout.png';
import { useLanguage } from '../context/LanguageContext';
import HighlightText from './HighlightText';

const BIO_KEYWORDS = [
    // EN
    'Product-minded', 'scalable systems', 'AI',
    // ES
    'mentalidad de producto', 'sistemas seguros y escalables', 'IA',
];

const CHIP_TONES = [
    'bg-accent-soft text-accent-strong border-accent',
    'bg-info-soft text-info-strong border-info-bright',
    'bg-success-soft text-success border-success-bright',
    'bg-highlight-soft text-highlight-strong border-highlight',
];

export default function Hero() {
    const { t, language } = useLanguage();

    const specialties =
        language === 'es'
            ? ['Arquitectura de software', 'Sistemas distribuidos', 'DevOps · CI/CD', 'IA · LLMs']
            : ['Software Architecture', 'Distributed Systems', 'DevOps · CI/CD', 'AI · LLMs'];

    return (
        <section className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Tarjeta-carnet: una sola pegatina horizontal */}
            <div className="group relative mx-auto max-w-3xl -rotate-[0.5deg] rounded-[var(--radius-xl)] border-2 border-border-strong bg-surface p-6 shadow-[8px_8px_0_0_var(--color-info-bright)] transition-transform duration-300 ease-out hover:rotate-0 sm:p-8">
                {/* "Agujero" del carnet, guiño de credencial */}
                <span className="absolute left-1/2 top-3 h-1.5 w-10 -translate-x-1/2 rounded-full bg-border-strong" />

                {/* Identidad: foto + nombre/rol/tagline */}
                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                    <img
                        src={profileImg}
                        alt={t.hero.name}
                        className="h-28 w-28 shrink-0 -rotate-3 rounded-[var(--radius-lg)] border-2 border-surface bg-info-soft object-cover object-top shadow-[4px_4px_0_0_var(--color-accent)] transition-transform duration-300 ease-out group-hover:rotate-0 sm:h-32 sm:w-32"
                    />

                    <div className="min-w-0">
                        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                            {t.hero.name}
                        </h1>

                        <p className="mt-1.5 font-mono text-sm font-medium text-info-strong">
                            {t.hero.role}
                        </p>

                        <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-ink-subtle">
                            <MapPin className="h-3.5 w-3.5" />
                            {t.hero.location}
                        </p>

                        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
                            <HighlightText text={t.hero.tagline} keywords={BIO_KEYWORDS} />
                        </p>
                    </div>
                </div>

                {/* Perforación del carnet */}
                <div className="my-6 border-t-2 border-dashed border-border-strong" />

                {/* Pastillas de especialidad + CTAs */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        {specialties.map((label, i) => (
                            <span
                                key={label}
                                className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${CHIP_TONES[i % CHIP_TONES.length]}`}
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-sm shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-press"
                        >
                            {t.hero.projectsBtn}
                            <ArrowDown className="h-4 w-4" />
                        </a>
                        <a
                            href="https://github.com/oscarfr96"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-surface-muted"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
