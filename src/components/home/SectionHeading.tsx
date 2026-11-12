type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
