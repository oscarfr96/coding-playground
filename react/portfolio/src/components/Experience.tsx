import { useLanguage } from '../context/LanguageContext';
import HighlightText from './HighlightText';
import SectionHeading from './SectionHeading';

const EDUCARIA_KEYWORDS = [
    'Alexia', '2M+', '.NET Core', 'Hexagonal Architecture', 'Clean Architecture', 'SOLID', 'DDD', 'CQRS',
    'Identity Server', 'Redis', 'Docker', 'Kubernetes', 'Rancher', 'xUnit', 'Gherkin', 'Claude Code', 'MCP', 'Spec-Driven Development', 'RAG',
    'microservices-based system', 'AI-assisted development',
    'microservicios', 'asistido por IA',
];

const NTT_DATA_KEYWORDS = [
    'Repsol', '.NET Framework 4.8', 'VB.NET', 'Angular',
    'point-of-sale', 'agile teams',
    'punto de venta', 'equipos ágiles',
];

export default function Experience() {
    const { t } = useLanguage();

    const experiences = [
        {
            title: t.experience.educaria.title,
            company: t.experience.educaria.company,
            period: t.experience.educaria.period,
            summary: t.experience.educaria.summary,
            points: t.experience.educaria.points,
            technologies: ['C#', '.NET Core', 'Entity Framework Core', 'OData', 'Identity Server', 'React', 'TypeScript', 'Ionic', 'SQL Server', 'Redis', 'Azure', 'Docker', 'Kubernetes', 'Rancher', 'GraphQL', 'xUnit', 'Claude Code'],
            keywords: EDUCARIA_KEYWORDS,
        },
        {
            title: t.experience.nttData.title,
            company: t.experience.nttData.company,
            period: t.experience.nttData.period,
            summary: t.experience.nttData.summary,
            points: t.experience.nttData.points,
            technologies: ['.NET Framework 4.8', 'VB.NET', 'Angular', 'Node.js', 'SQL Server', 'PostgreSQL', 'Azure DevOps'],
            keywords: NTT_DATA_KEYWORDS,
        }
    ];

    return (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            <SectionHeading>{t.experience.title}</SectionHeading>

            <div className="space-y-5">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="rounded-[var(--radius-lg)] border-2 border-border bg-surface p-6 transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-1 hover:rotate-[-0.4deg] hover:shadow-[6px_6px_0_0_var(--color-info-bright)] md:grid md:grid-cols-4 md:gap-8"
                    >
                        <div className="mb-2 pt-1 text-sm font-semibold text-info-strong md:col-span-1 md:mb-0">
                            {exp.period}
                        </div>

                        <div className="space-y-3 md:col-span-3">
                            <div>
                                <h3 className="font-display text-lg font-semibold text-ink">{exp.title}</h3>
                                <h4 className="text-md text-ink-muted">{exp.company}</h4>
                            </div>
                            <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                                <HighlightText text={exp.summary} keywords={exp.keywords} />
                            </p>
                            <ul className="space-y-1.5">
                                {exp.points.map((point, i) => (
                                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted md:text-base">
                                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                        <span><HighlightText text={point} keywords={exp.keywords} /></span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {exp.technologies.map(tech => (
                                    <span key={tech} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
