import { useLanguage } from '../context/LanguageContext';
import HighlightText from './HighlightText';

// Technical terms are the same in EN and ES; include both where phrasing differs
const EDUCARIA_KEYWORDS = [
    'Alexia', '2M+', '.NET Core', 'Clean Architecture', 'SOLID', 'DDD', 'CQRS',
    'Docker', 'Kubernetes', 'Claude Code', 'MCP',
    // EN
    'microservices-based system', 'AI-assisted development',
    // ES
    'microservicios', 'asistido por IA',
];

const NTT_DATA_KEYWORDS = [
    'Repsol', '.NET Framework 4.8', 'VB.NET',
    // EN
    'point-of-sale', 'agile teams',
    // ES
    'punto de venta', 'equipos ágiles',
];

export default function Experience() {
    const { t } = useLanguage();

    const experiences = [
        {
            title: t.experience.educaria.title,
            company: t.experience.educaria.company,
            period: t.experience.educaria.period,
            description: t.experience.educaria.description,
            technologies: ['.NET Core 7', 'React', 'TypeScript', 'Ionic', 'SQL Server', 'Azure', 'Docker', 'Kubernetes', 'GraphQL', 'Claude Code'],
            keywords: EDUCARIA_KEYWORDS,
        },
        {
            title: t.experience.nttData.title,
            company: t.experience.nttData.company,
            period: t.experience.nttData.period,
            description: t.experience.nttData.description,
            technologies: ['.NET Framework 4.8', 'VB.NET', 'Angular', 'Node.js', 'SQL Server', 'PostgreSQL', 'Azure DevOps'],
            keywords: NTT_DATA_KEYWORDS,
        }
    ];

    return (
        <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            <h2 className="text-2xl font-bold tracking-tight text-apple-dark">{t.experience.title}</h2>

            <div className="space-y-12 pl-4 md:pl-0 border-l-2 md:border-l-0 border-apple-border/30">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative md:grid md:grid-cols-4 gap-8 group">
                        <div className="absolute w-3 h-3 bg-white border-2 border-apple-gray rounded-full -left-[23px] md:hidden top-1.5 group-hover:border-apple-dark transition-colors" />

                        <div className="md:col-span-1 mb-2 md:mb-0 text-sm text-apple-gray font-medium pt-1">
                            {exp.period}
                        </div>

                        <div className="md:col-span-3 space-y-3">
                            <div>
                                <h3 className="text-lg font-semibold text-apple-dark">{exp.title}</h3>
                                <h4 className="text-md text-apple-dark/70">{exp.company}</h4>
                            </div>
                            <p className="text-apple-gray leading-relaxed text-sm md:text-base">
                                <HighlightText text={exp.description} keywords={exp.keywords} />
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {exp.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-apple-border/10 text-xs font-medium text-apple-dark/80 rounded-full">
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
