import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\))/g;
    let last = 0;
    let i = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) out.push(text.slice(last, m.index));
        const tok = m[0];
        if (tok.startsWith('**')) {
            out.push(<strong key={i++}>{tok.slice(2, -2)}</strong>);
        } else {
            const parts = /\[([^\]]+)\]\(([^)\s]+)\)/.exec(tok);
            if (parts) {
                const external = parts[2].startsWith('http');
                out.push(
                    <a
                        key={i++}
                        href={parts[2]}
                        className="font-semibold text-primary-700 underline"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {parts[1]}
                    </a>
                );
            }
        }
        last = m.index + tok.length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

export function MarkdownText({ text, className = '' }: { text: string; className?: string }) {
    const lines = text.replace(/\r\n/g, '\n').split('\n');
    const blocks: ReactNode[] = [];
    let para: string[] = [];
    let list: string[] = [];
    let key = 0;

    const flushPara = () => {
        if (para.length) {
            blocks.push(
                <p key={key++} className="mt-4 leading-relaxed text-slate-600">
                    {inline(para.join(' '))}
                </p>
            );
            para = [];
        }
    };
    const flushList = () => {
        if (list.length) {
            blocks.push(
                <ul key={key++} className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
                    {list.map((l, i) => (
                        <li key={i}>{inline(l)}</li>
                    ))}
                </ul>
            );
            list = [];
        }
    };

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) {
            flushPara();
            flushList();
            continue;
        }
        if (line.startsWith('### ')) {
            flushPara();
            flushList();
            blocks.push(<h3 key={key++} className="mt-6 text-lg font-bold text-ink">{line.slice(4)}</h3>);
            continue;
        }
        if (line.startsWith('## ') || line.startsWith('# ')) {
            flushPara();
            flushList();
            blocks.push(<h2 key={key++} className="mt-8 text-2xl font-extrabold text-ink">{line.replace(/^#+\s*/, '')}</h2>);
            continue;
        }
        if (/^[-*] /.test(line)) {
            flushPara();
            list.push(line.slice(2));
            continue;
        }
        flushList();
        para.push(line);
    }
    flushPara();
    flushList();

    return <div className={className}>{blocks}</div>;
}

export default MarkdownText;