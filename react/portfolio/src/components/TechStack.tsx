import { Layers, Server, Database, Cloud, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TechStack() {
    const { t } = useLanguage();

    const stack = [
        {
            category: t.techStack.frontend,
            icon: Layers,
            skills: ['React', 'TypeScript', 'Angular', 'Ionic', 'JavaScript', 'Tailwind CSS']
        },
        {
            category: t.techStack.backend,
            icon: Server,
            skills: ['.NET Core 7', '.NET Framework 4.8', 'C#', 'Node.js', 'ASP.NET Core']
        },
        {
            category: t.techStack.architecture,
            icon: Cloud,
            skills: ['Docker', 'Kubernetes', 'Azure', 'Azure DevOps', 'GitHub Actions', 'Jenkins', 'Microservices', 'CI/CD']
        },
        {
            category: t.techStack.databases,
            icon: Database,
            skills: ['SQL Server', 'MongoDB', 'Firebase', 'PostgreSQL']
        },
        {
            category: t.techStack.ai,
            icon: Bot,
            skills: ['Claude Code', 'GitHub Copilot', 'MCP', 'LLM APIs', 'Prompt Engineering', 'RAG', 'AI Agents']
        }
    ];

    return (
        <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <h2 className="text-2xl font-bold tracking-tight text-apple-dark">{t.techStack.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stack.map((group) => {
                    const Icon = group.icon;
                    return (
                        <div key={group.category} className="p-6 rounded-2xl border border-apple-border/40 bg-white/50 hover:bg-white/80 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-apple-border/20 rounded-lg text-apple-dark">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-apple-dark">{group.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-white border border-apple-border/50 text-xs font-medium text-apple-gray rounded-full">
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
