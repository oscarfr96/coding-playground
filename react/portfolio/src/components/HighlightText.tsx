interface HighlightTextProps {
    text: string;
    keywords: string[];
}

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function HighlightText({ text, keywords }: HighlightTextProps) {
    if (!keywords.length) return <>{text}</>;

    // Sort longest-first so multi-word phrases match before their substrings
    const sorted = [...keywords].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(${sorted.map(escapeRegex).join('|')})`, 'gi');
    const parts = text.split(pattern);

    return (
        <>
            {parts.map((part, i) => {
                const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
                if (!isKeyword) return part || null;
                return (
                    <span
                        key={i}
                        className="font-medium text-apple-dark bg-brand-lavender/15 px-1 rounded-sm"
                    >
                        {part}
                    </span>
                );
            })}
        </>
    );
}
