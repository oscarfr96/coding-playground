import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectMeta {
    id: 'gredio' | 'portfolio';
    cardTags: string[];
    allTags: string[];
    link?: string;
}

const PROJECTS: ProjectMeta[] = [
    {
        id: 'gredio',
        cardTags: ['Python', 'FastAPI', 'PyTorch', 'React'],
        allTags: ['Python', 'FastAPI', 'PyTorch', 'Google Cloud Run', 'Firestore', 'Compute Engine (GPU)', 'React', 'TypeScript', 'Vite', 'Vercel'],
        link: 'https://gredio-landing-page.vercel.app/',
    },
    {
        id: 'portfolio',
        cardTags: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
        allTags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4'],
    },
];

function Tag({ label, muted }: { label: string; muted?: boolean }) {
    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            muted
                ? 'bg-apple-border/8 text-apple-dark/50'
                : 'bg-apple-border/10 text-apple-dark/80'
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
                <h2 className="text-2xl font-bold tracking-tight text-apple-dark border-l-[3px] border-brand-lavender pl-3">
                    {t.projects.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECTS.map((project) => {
                        const pt = t.projects[project.id];
                        return (
                            <button
                                key={project.id}
                                onClick={() => setOpen(project)}
                                className="group text-left p-6 rounded-2xl border border-apple-border/40 bg-white/50 hover:bg-white/80 transition-all hover:shadow-[0_-3px_0_0_#8892C9,0_1px_3px_0_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="text-lg font-semibold text-apple-dark group-hover:text-black transition-colors leading-tight">
                                        {pt.title}
                                    </h3>
                                    <ArrowUpRight className="w-4 h-4 text-apple-gray/50 group-hover:text-brand-lavender transition-colors flex-shrink-0 mt-0.5" />
                                </div>
                                <p className="text-sm text-apple-gray mb-4 leading-snug">
                                    {pt.tagline}
                                </p>
                                <div className="flex items-end justify-between gap-3 mt-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.cardTags.map((tag) => <Tag key={tag} label={tag} />)}
                                    </div>
                                    <span className="text-xs font-medium text-brand-lavender whitespace-nowrap group-hover:underline flex-shrink-0">
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setOpen(null)}
                    >
                        <div
                            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-apple-border/30 animate-in zoom-in-95 fade-in duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 px-7 pt-7 pb-5 border-b border-apple-border/20">
                                <div>
                                    <h3 className="text-xl font-bold text-apple-dark">{pt.title}</h3>
                                    <p className="text-sm text-apple-gray mt-0.5">{pt.tagline}</p>
                                </div>
                                <button
                                    onClick={() => setOpen(null)}
                                    className="p-1.5 rounded-lg text-apple-gray/60 hover:text-apple-dark hover:bg-apple-border/10 transition-colors flex-shrink-0"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-7 py-6 space-y-5">
                                {/* About */}
                                <div>
                                    <p className="text-xs font-semibold text-brand-lavender uppercase tracking-wider mb-2">
                                        {t.projects.modalAbout}
                                    </p>
                                    <p className="text-sm text-apple-gray leading-relaxed">{pt.about}</p>
                                </div>

                                {/* My role */}
                                <div>
                                    <p className="text-xs font-semibold text-brand-lavender uppercase tracking-wider mb-2">
                                        {t.projects.modalRole}
                                    </p>
                                    <p className="text-sm text-apple-gray leading-relaxed">{pt.myRole}</p>
                                </div>

                                {/* Highlights */}
                                {pt.highlights && (
                                    <div className="p-3.5 rounded-xl bg-apple-border/5 border border-apple-border/20">
                                        <p className="text-xs text-apple-gray/70 leading-relaxed">{pt.highlights}</p>
                                    </div>
                                )}

                                {/* Full tech stack */}
                                <div>
                                    <p className="text-xs font-semibold text-brand-lavender uppercase tracking-wider mb-2">
                                        {t.projects.modalStack}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {open.allTags.map((tag) => <Tag key={tag} label={tag} muted />)}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            {open.link && (
                                <div className="px-7 pb-7">
                                    <a
                                        href={open.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-lavender text-white text-sm font-medium hover:opacity-90 transition-opacity"
                                    >
                                        {t.projects.modalDemo}
                                        <ArrowUpRight className="w-3.5 h-3.5" />
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
