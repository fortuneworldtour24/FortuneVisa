import type { ReactNode } from 'react';

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center sm:px-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
        {icon}
      </span>
      <h2 className="mt-5 text-xl font-bold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
