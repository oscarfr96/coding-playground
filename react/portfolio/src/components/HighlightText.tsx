interface HighlightTextProps {
    text: string;
    keywords: string[];
}

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COLORS = ['#8fd3ef', '#84d6a8', '#f78cb6'];

export default function HighlightText({ text, keywords }: HighlightTextProps) {
    if (!keywords.length) return <>{text}</>;

    const sorted = [...keywords].sort((a, b) => b.length - a.length);
    // Letter boundaries so short keywords (e.g. "IA"/"AI") don't match inside
    // words like "potenciado" or "Spain".
    const pattern = new RegExp(`(?<!\\p{L})(${sorted.map(escapeRegex).join('|')})(?!\\p{L})`, 'giu');
    const parts = text.split(pattern);

    let keywordCount = 0;

    return (
        <>
            {parts.map((part, i) => {
                const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
                if (!isKeyword) return part || null;
                const color = COLORS[keywordCount % COLORS.length];
                const delay = `${keywordCount * 0.15}s`;
                keywordCount++;
                return (
                    <span
                        key={i}
                        className="font-medium text-ink"
                        style={{
                            backgroundImage: `linear-gradient(${color}, ${color})`,
                            backgroundSize: '0% 2px',
                            backgroundPosition: '0 100%',
                            backgroundRepeat: 'no-repeat',
                            paddingBottom: '1px',
                            animation: 'underline-draw 0.5s ease forwards',
                            animationDelay: delay,
                        }}
                    >
                        {part}
                    </span>
                );
            })}
        </>
    );
}
