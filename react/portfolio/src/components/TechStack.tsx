import { Layers, Server, Database, Cloud, Bot, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';

interface CardStyle {
    bg: string;
    border: string;
    icon: string;
    shadow: string;
}

const STYLES: Record<string, CardStyle> = {
    sky: { bg: 'bg-info-soft', border: 'border-info-bright', icon: 'text-info-strong', shadow: 'hover:shadow-[6px_6px_0_0_var(--color-info-bright)]' },
    pink: { bg: 'bg-accent-soft', border: 'border-accent', icon: 'text-accent-strong', shadow: 'hover:shadow-[6px_6px_0_0_var(--color-accent)]' },
    mint: { bg: 'bg-success-soft', border: 'border-success-bright', icon: 'text-success', shadow: 'hover:shadow-[6px_6px_0_0_var(--color-success-bright)]' },
    yellow: { bg: 'bg-highlight-soft', border: 'border-highlight', icon: 'text-highlight-strong', shadow: 'hover:shadow-[6px_6px_0_0_var(--color-highlight)]' },
    coral: { bg: 'bg-danger-soft', border: 'border-danger', icon: 'text-danger', shadow: 'hover:shadow-[6px_6px_0_0_var(--color-danger)]' },
};

export default function TechStack() {
    const { t } = useLanguage();

    const stack = [
        { category: t.techStack.frontend, icon: Layers, style: STYLES.sky, skills: ['React', 'TypeScript', 'Angular', 'Ionic', 'JavaScript', 'Tailwind CSS'] },
        { category: t.techStack.backend, icon: Server, style: STYLES.pink, skills: ['.NET Core', '.NET Framework 4.8', 'C#', 'Python', 'Entity Framework Core', 'OData', 'GraphQL', 'Identity Server', 'Node.js'] },
        { category: t.techStack.architecture, icon: Cloud, style: STYLES.mint, skills: ['Docker', 'Kubernetes', 'Rancher', 'Azure', 'Google Cloud', 'Vercel', 'Azure DevOps', 'GitHub Actions', 'Jenkins', 'Microservices', 'CI/CD'] },
        { category: t.techStack.databases, icon: Database, style: STYLES.yellow, skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase'] },
        { category: t.techStack.ai, icon: Bot, style: STYLES.coral, skills: ['Claude Code', 'GitHub Copilot', 'MCP', 'LLM APIs', 'Prompt Engineering', 'RAG', 'AI Agents', 'Notion'] },
        { category: t.techStack.testing, icon: FlaskConical, style: STYLES.sky, skills: ['xUnit', 'Moq', 'BDD · Gherkin', 'SonarQube'] },
    ];

    return (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <SectionHeading>{t.techStack.title}</SectionHeading>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stack.map((group, i) => {
                    const Icon = group.icon;
                    const s = group.style;
                    const rotate = i % 2 === 0 ? 'hover:rotate-[-0.5deg]' : 'hover:rotate-[0.5deg]';
                    return (
                        <div
                            key={group.category}
                            className={`rounded-[var(--radius-lg)] border-2 p-6 transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-1 ${s.bg} ${s.border} ${s.shadow} ${rotate}`}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className={`grid size-10 place-items-center rounded-full border-2 border-current bg-surface/70 ${s.icon}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-ink">{group.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span key={skill} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
