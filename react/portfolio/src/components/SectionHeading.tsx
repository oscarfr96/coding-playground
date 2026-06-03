/** Encabezado de sección. */
export default function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
    return (
        <h2 id={id} className="font-display text-3xl tracking-tight text-ink">
            {children}
        </h2>
    );
}
