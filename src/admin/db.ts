import { supabase } from '@/lib/supabase';

export function getDb() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart npm run dev.');
  }
  return supabase;
}