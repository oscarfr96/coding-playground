interface HighlightTextProps {
    text: string;
    keywords: string[];
}

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COLORS = ['#8892C9', '#69C292', '#EF5693'];

export default function HighlightText({ text, keywords }: HighlightTextProps) {
    if (!keywords.length) return <>{text}</>;

    const sorted = [...keywords].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(${sorted.map(escapeRegex).join('|')})`, 'gi');
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
                        className="font-medium text-apple-dark"
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
