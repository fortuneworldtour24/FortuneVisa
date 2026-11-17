import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const cache = new Map<string, Record<string, unknown> | null>();

export function useContent<T extends Record<string, unknown>>(key: string, defaults: T): T {
    const [data, setData] = useState<Record<string, unknown> | null>(cache.get(key) ?? null);

    useEffect(() => {
        if (cache.has(key) || !supabase) return undefined;
        let active = true;
        void supabase
            .from('site_content')
            .select('data')
            .eq('key', key)
            .maybeSingle()
            .then(({ data: row }) => {
                const d = (row?.data as Record<string, unknown> | undefined) ?? null;
                cache.set(key, d);
                if (active) setData(d);
            });
        return () => {
            active = false;
        };
    }, [key]);

    if (!data) return defaults;
    const out: Record<string, unknown> = { ...defaults };
    for (const [k, v] of Object.entries(data)) {
        if (v === '' || v == null || (Array.isArray(v) && v.length === 0)) continue;
        out[k] = v;
    }
    return out as T;
}