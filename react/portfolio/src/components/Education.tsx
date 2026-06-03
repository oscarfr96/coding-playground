import { Award, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';

export default function Education() {
    const { t } = useLanguage();
    const { degrees, certifications } = t.education;

    return (
        <section
            id="education"
            className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both"
        >
            <SectionHeading>{t.education.title}</SectionHeading>

            {/* Estudios académicos */}
            <div className="space-y-5">
                {degrees.map((edu, index) => (
                    <div
                        key={index}
                        className="rounded-[var(--radius-lg)] border-2 border-border bg-surface p-6 transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-1 hover:rotate-[-0.4deg] hover:shadow-[6px_6px_0_0_var(--color-info-bright)] md:grid md:grid-cols-4 md:gap-8"
                    >
                        <div className="mb-2 pt-1 text-sm font-semibold text-info-strong md:col-span-1 md:mb-0">
                            {edu.period}
                        </div>
                        <div className="space-y-1 md:col-span-3">
                            <h3 className="font-display text-lg font-semibold text-ink">{edu.degree}</h3>
                            <h4 className="text-md text-ink-muted">{edu.institution}</h4>
                            {edu.note && <p className="pt-1 text-sm text-ink-subtle">{edu.note}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Certificaciones */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <Award className="h-5 w-5 text-accent-strong" />
                    {t.education.certificationsTitle}
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {certifications.map((cert, index) => {
                        const inner = (
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-medium leading-snug text-ink">{cert.title}</p>
                                    <p className="mt-1 text-xs text-ink-muted">
                                        {cert.issuer} · {cert.year}
                                    </p>
                                </div>
                                {cert.link && (
                                    <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-subtle transition-colors group-hover:text-accent-strong" />
                                )}
                            </div>
                        );

                        return cert.link ? (
                            <a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group rounded-[var(--radius)] border-2 border-border bg-surface p-4 transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-accent hover:shadow-[4px_4px_0_0_var(--color-accent)]"
                            >
                                {inner}
                            </a>
                        ) : (
                            <div
                                key={index}
                                className="rounded-[var(--radius)] border-2 border-border bg-surface p-4"
                            >
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
