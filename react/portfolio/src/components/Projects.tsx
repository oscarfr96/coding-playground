import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';
import HighlightText from './HighlightText';

interface ProjectMeta {
    id: 'gredio' | 'portfolio';
    cardTags: string[];
    allTags: string[];
    keywords: string[];
    link?: string;
}

const PROJECTS: ProjectMeta[] = [
    {
        id: 'gredio',
        cardTags: ['Python', 'FastAPI', 'PyTorch', 'React'],
        allTags: ['Python', 'FastAPI', 'PyTorch', 'Google Cloud Run', 'Compute Engine (GPU)', 'Firestore', 'Cloud Storage', 'Docker', 'React', 'TypeScript', 'Vite', 'Vercel'],
        keywords: [
            // EN
            'speaker diarization', 'EEND model', 'Whisper-style audio encoder', 'bidirectional GRU', 'whole platform',
            // ES
            'diarización de hablantes', 'modelo EEND', 'encoder de audio estilo Whisper', 'GRU bidireccional', 'toda la plataforma',
        ],
        link: 'https://gredio-landing-page.vercel.app/',
    },
    {
        id: 'portfolio',
        cardTags: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
        allTags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4'],
        keywords: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
    },
];

function Tag({ label, muted }: { label: string; muted?: boolean }) {
    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            muted ? 'bg-surface-muted text-ink-subtle' : 'bg-surface-muted text-ink-muted'
        }`}>
            {label}
        </span>
    );
}

export default function Projects() {
    const { t } = useLanguage();
    const [open, setOpen] = useState<ProjectMeta | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            <section
                id="projects"
                className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both"
            >
                <SectionHeading>{t.projects.title}</SectionHeading>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {PROJECTS.map((project, i) => {
                        const pt = t.projects[project.id];
                        const rotate = i % 2 === 0 ? 'hover:rotate-[-0.5deg]' : 'hover:rotate-[0.5deg]';
                        return (
                            <button
                                key={project.id}
                                onClick={() => setOpen(project)}
                                className={`group rounded-[var(--radius-lg)] border-2 border-border bg-surface p-6 text-left transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-accent hover:shadow-[6px_6px_0_0_var(--color-accent)] focus-visible:outline-none ${rotate}`}
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                                        {pt.title}
                                    </h3>
                                    <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-subtle transition-colors group-hover:text-accent-strong" />
                                </div>
                                <p className="mb-4 text-sm leading-snug text-ink-muted">
                                    {pt.tagline}
                                </p>
                                <div className="mt-4 flex items-end justify-between gap-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.cardTags.map((tag) => <Tag key={tag} label={tag} />)}
                                    </div>
                                    <span className="flex-shrink-0 whitespace-nowrap text-xs font-semibold text-accent-strong group-hover:underline">
                                        {t.projects.seeMore}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {open && (() => {
                const pt = t.projects[open.id];
                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setOpen(null)}
                    >
                        <div
                            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[var(--radius-lg)] border-2 border-border bg-surface shadow-2xl animate-in zoom-in-95 fade-in duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-4 border-b border-border px-7 pb-5 pt-7">
                                <div>
                                    <h3 className="font-display text-xl font-bold text-ink">{pt.title}</h3>
                                    <p className="mt-0.5 text-sm text-ink-muted">{pt.tagline}</p>
                                </div>
                                <button
                                    onClick={() => setOpen(null)}
                                    className="flex-shrink-0 rounded-full p-1.5 text-ink-subtle transition-colors hover:bg-surface-muted hover:text-ink"
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-5 px-7 py-6">
                                {/* Stats de impacto */}
                                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                    {pt.stats.map((stat) => (
                                        <div
                                            key={stat.figure + stat.label}
                                            className="rounded-[var(--radius)] border-2 border-border bg-surface-muted px-3 py-2.5 text-center"
                                        >
                                            <p className="font-display text-base font-bold leading-none text-accent-strong">
                                                {stat.figure}
                                            </p>
                                            <p className="mt-1 text-[11px] leading-tight text-ink-subtle">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Intro */}
                                <p className="text-sm leading-relaxed text-ink-muted">
                                    <HighlightText text={pt.about} keywords={open.keywords} />
                                </p>

                                {/* Lo que construí */}
                                <ul className="space-y-1.5">
                                    {pt.built.map((item, i) => (
                                        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Stack */}
                                <div>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
                                        {t.projects.modalStack}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {open.allTags.map((tag) => <Tag key={tag} label={tag} muted />)}
                                    </div>
                                </div>
                            </div>

                            {open.link && (
                                <div className="px-7 pb-7">
                                    <a
                                        href={open.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-all hover:-translate-y-0.5 hover:bg-accent-press"
                                    >
                                        {t.projects.modalDemo}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}
        </>
    );
}
