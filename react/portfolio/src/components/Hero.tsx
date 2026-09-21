import { ArrowDown, MapPin } from 'lucide-react';
import profileImg from '../assets/oscar-cutout.png';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section aria-labelledby="hero-heading" className="grid items-center gap-12 py-6 sm:py-10 md:grid-cols-[1.45fr_1fr] md:gap-10 lg:gap-16">
            <div>
                <p className="mb-5 text-lg font-medium text-ink-muted">
                    {t.hero.greeting} <span className="text-ink">{t.hero.name}.</span>
                </p>

                <h1 id="hero-heading" className="text-balance font-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-tight text-ink">
                    {t.hero.tagline}{' '}
                    <span className="block text-info-strong">{t.hero.taglineAccent}</span>
                </h1>

                <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                    {t.hero.bio}
                </p>

                <a
                    href="#projects"
                    className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-press"
                >
                    {t.hero.projectsBtn}
                    <ArrowDown aria-hidden="true" className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5" />
                </a>
            </div>

            <figure className="mx-auto w-full max-w-72 sm:max-w-80 md:max-w-none">
                <div className="relative isolate overflow-hidden rounded-b-[42%]">
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[85%] rounded-t-[48%] bg-info-soft" />
                    <img
                        src={profileImg}
                        alt={t.hero.name}
                        width={661}
                        height={720}
                        fetchPriority="high"
                        className="block h-auto w-full"
                    />
                </div>
                <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
                    <span>{t.hero.role}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-info-strong" />
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                        {t.hero.location}
                    </span>
                </figcaption>
            </figure>
        </section>
    );
}
