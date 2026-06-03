/** Separador ondulado juguetón. El color se hereda de `text-*` en className. */
export default function WavyDivider({ className }: { className?: string }) {
    const width = 1200;
    const wl = 44;
    const amp = 6;
    const mid = 10;

    let d = `M0 ${mid}`;
    for (let x = 0; x < width; x += wl) {
        d += ` Q ${x + wl / 4} ${mid - amp} ${x + wl / 2} ${mid}`;
        d += ` Q ${x + (3 * wl) / 4} ${mid + amp} ${x + wl} ${mid}`;
    }

    return (
        <svg
            className={className ?? 'h-3.5 w-full text-accent/40'}
            viewBox={`0 0 ${width} 20`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}
