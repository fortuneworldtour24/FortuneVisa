import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getDb } from './db';

type State = 'loading' | 'allowed' | 'denied';

export function AdminGuard({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const supabase = getDb();
    let active = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        if (active) setState('denied');
        return;
      }
      const { data: row, error } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (active) setState(!error && row ? 'allowed' : 'denied');
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === 'loading') {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">Checking access…</div>;
  }
  if (state === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

export default AdminGuard;