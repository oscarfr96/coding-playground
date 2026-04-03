import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
    const { t } = useLanguage();

    const projects = [
        {
            title: t.projects.textSage.title,
            description: t.projects.textSage.description,
            tags: ['React', '.NET Core', 'Whisper ASR', 'Docker', 'Azure', 'Tailwind CSS'],
            link: 'https://ts-audio-transcriber.vercel.app/login/demo',
        },
        {
            title: t.projects.weddingInvitation.title,
            description: t.projects.weddingInvitation.description,
            tags: ['React', 'TypeScript', 'Firebase', 'Vercel'],
            link: 'https://wedding-inv-web-sigma.vercel.app/',
        },
        {
            title: t.projects.kotlinApp.title,
            description: t.projects.kotlinApp.description,
            tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Figma'],
            link: 'https://www.figma.com/proto/bQE5XgmDtznhc4BPNYZwle/TaskManager-App?node-id=1-3&t=EOuRub4dCntK06FZ-1&starting-point-node-id=1%3A3',
            github: 'https://github.com/oscarfr96/coding-playground/tree/master/playground/kotlin-to-do-app',
        },
        {
            title: t.projects.portfolio.title,
            description: t.projects.portfolio.description,
            tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4'],
        },
    ];

    return (
        <section id="projects" className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
            <h2 className="text-2xl font-bold tracking-tight text-apple-dark">{t.projects.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => {
                    const inner = (
                        <>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-apple-dark group-hover:text-black transition-colors">
                                    {project.title}
                                </h3>
                                {project.link && (
                                    <ArrowUpRight className="w-5 h-5 text-apple-gray group-hover:text-apple-dark transition-colors flex-shrink-0" />
                                )}
                            </div>
                            <p className="text-apple-gray leading-relaxed mb-6 text-sm">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-apple-border/10 text-xs font-medium text-apple-dark/80 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-xs text-apple-gray hover:text-apple-dark transition-colors"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                    <span>Source code</span>
                                </a>
                            )}
                        </>
                    );

                    if (project.link) {
                        return (
                            <a
                                key={project.title}
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative p-8 rounded-2xl border border-apple-border/40 bg-white/50 hover:bg-white/80 transition-all hover:shadow-sm block"
                            >
                                {inner}
                            </a>
                        );
                    }

                    return (
                        <div key={project.title} className="group relative p-8 rounded-2xl border border-apple-border/40 bg-white/50 hover:bg-white/80 transition-all hover:shadow-sm">
                            {inner}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
