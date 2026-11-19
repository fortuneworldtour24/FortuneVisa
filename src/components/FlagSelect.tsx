import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

export type FlagOption = { value: string; label: string; code?: string };

export function FlagIcon({ code, size = 22 }: { code?: string; size?: number }) {
    if (!code || !/^[a-z]{2}$/i.test(code)) return null;
    return (
        <span
            aria-hidden="true"
            className="inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200"
            style={{ width: size, height: size }}
        >
            <span className={`fi fis fi-${code.toLowerCase()}`} style={{ fontSize: size, lineHeight: 1 }} />
        </span>
    );
}

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: FlagOption[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    allowEmpty?: boolean;
    emptyLabel?: string;
    className?: string;
};

export function FlagSelect({
    value,
    onChange,
    options,
    label,
    placeholder = 'Select',
    disabled = false,
    searchable,
    allowEmpty = false,
    emptyLabel = 'Not selected',
    className = '',
}: Props) {
    const uid = useId();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const showSearch = searchable ?? options.length > 10;
    const rows = useMemo<FlagOption[]>(
        () => (allowEmpty ? [{ value: '', label: emptyLabel }, ...options] : options),
        [allowEmpty, emptyLabel, options]
    );
    const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? rows.filter((o) => o.label.toLowerCase().includes(q)) : rows;
    }, [rows, query]);
    const selected = value ? options.find((o) => o.value === value) : undefined;

    const close = (refocus = false) => {
        setOpen(false);
        setQuery('');
        if (refocus) buttonRef.current?.focus();
    };

    const choose = (o?: FlagOption) => {
        if (!o) return;
        onChange(o.value);
        close(true);
    };

    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
        };
        document.addEventListener('pointerdown', onDown);
        return () => document.removeEventListener('pointerdown', onDown);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const idx = shown.findIndex((o) => o.value === value);
        setActive(idx >= 0 ? idx : 0);
        (showSearch ? searchRef.current : boxRef.current)?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        setActive(0);
    }, [query]);

    useEffect(() => {
        if (!open) return;
        (listRef.current?.children[active] as HTMLElement | undefined)?.scrollIntoView({ block: 'nearest' });
    }, [active, open]);

    const onListKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, Math.max(shown.length - 1, 0)));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            choose(shown[active]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close(true);
        } else if (e.key === 'Tab') {
            close();
        }
    };

    const shownLabel = selected ? selected.label : value === '' && allowEmpty ? emptyLabel : placeholder;

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            {label ? (
                <span id={`${uid}-label`} className="mb-1.5 block text-sm font-semibold text-ink">
                    {label}
                </span>
            ) : null}

            <button
                ref={buttonRef}
                id={`${uid}-btn`}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={label ? `${uid}-label ${uid}-btn` : undefined}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                className="flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-slate-300 bg-white px-3 text-left text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            >
                <span className="flex min-w-0 items-center gap-2.5">
                    <FlagIcon code={selected?.code} size={22} />
                    <span className={`truncate ${selected ? 'text-ink' : 'text-slate-500'}`}>{shownLabel}</span>
                </span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {open ? (
                <div
                    ref={boxRef}
                    tabIndex={-1}
                    onKeyDown={onListKey}
                    className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl outline-none"
                >
                    {showSearch ? (
                        <div className="flex items-center gap-2 border-b border-slate-100 px-3">
                            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                            <input
                                ref={searchRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search"
                                placeholder="Search…"
                                className="h-11 w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    ) : null}
                    <ul ref={listRef} role="listbox" aria-labelledby={`${uid}-btn`} className="max-h-60 overflow-y-auto py-1">
                        {shown.map((o, i) => (
                            <li
                                key={o.value || '__empty'}
                                role="option"
                                aria-selected={o.value === value}
                                onMouseEnter={() => setActive(i)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => choose(o)}
                                className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 px-3 text-sm ${i === active ? 'bg-indigo-50' : ''}`}
                            >
                                <FlagIcon code={o.code} size={22} />
                                <span className="flex-1 truncate">{o.label}</span>
                                {o.value === value ? <Check className="h-4 w-4 text-primary-700" aria-hidden="true" /> : null}
                            </li>
                        ))}
                        {shown.length === 0 ? <li className="px-3 py-3 text-sm text-slate-500">No matches</li> : null}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

export default FlagSelect;