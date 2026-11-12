import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';
import { fetchPosts } from '@/lib/posts';
import type { Post } from '@/lib/posts';
import { estimateReadingTime } from '@/lib/markdown';

type LoadState = 'loading' | 'success' | 'error';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function BlogListPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [state, setState] = useState<LoadState>('loading');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useSeo({
    title: 'Blog — Visa News and Guides',
    description:
      'Plain-English Australian visa tips, policy updates and application guides from Fortune Visa Services in Parramatta.',
  });

  useEffect(() => {
    let cancelled = false;
    fetchPosts()
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setState('success');
        }
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]));
    return unique;
  }, [posts]);

  const featured = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts]);

  const filtered = useMemo(() => {
    const rest = posts.filter((p) => p.id !== featured?.id);
    if (activeCategory === 'all') return rest;
    return rest.filter((p) => p.category === activeCategory);
  }, [posts, featured, activeCategory]);

  if (state === 'loading') {
    return (
      <>
        <PageHero
          eyebrow={t('pages.blog.eyebrow')}
          title={t('pages.blog.title')}
          description={t('pages.blog.description')}
        />
        <div className="flex items-center justify-center gap-3 py-24 text-muted">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-sm font-semibold">{t('blog.loadingTitle')}</span>
        </div>
      </>
    );
  }

  if (state === 'error') {
    return (
      <>
        <PageHero
          eyebrow={t('pages.blog.eyebrow')}
          title={t('pages.blog.title')}
          description={t('pages.blog.description')}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState
            icon={<Clock className="h-7 w-7" aria-hidden="true" />}
            title={t('blog.errorTitle')}
            body={t('blog.errorBody')}
          />
        </div>
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <PageHero
          eyebrow={t('pages.blog.eyebrow')}
          title={t('pages.blog.title')}
          description={t('pages.blog.description')}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState
            icon={<Clock className="h-7 w-7" aria-hidden="true" />}
            title={t('blog.emptyTitle')}
            body={t('blog.emptyBody')}
          />
        </div>
        <ConsultationCta />
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={t('pages.blog.eyebrow')}
        title={t('pages.blog.title')}
        description={t('pages.blog.description')}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featured && <FeaturedCard post={featured} />}

        {categories.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2.5">
            <CategoryChip
              label={t('blog.allCategories')}
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        )}

        <p className="mt-6 text-sm font-semibold text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">{t('blog.emptyBody')}</p>
        )}
      </section>

      <ConsultationCta />
    </>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:shadow-lift">
      <div className="grid lg:grid-cols-2">
        <Link to={`/blog/${post.slug}`} className="group relative block min-h-[240px] overflow-hidden lg:min-h-[360px]">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-primary-50" />
          )}
          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 shadow-sm">
            {t('blog.featured')}
          </span>
        </Link>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          {post.category && (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">{post.category}</p>
          )}
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink">{post.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {t('blog.minRead', { minutes: readingTime })}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800"
          >
            {t('blog.readArticle')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'bg-primary-700 text-white shadow-card'
          : 'border border-slate-200 bg-white text-ink hover:border-primary-200 hover:bg-primary-50'
      }`}
    >
      {label}
    </button>
  );
}

function BlogCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/blog/${post.slug}`} className="relative block h-48 overflow-hidden">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-primary-50" />
        )}
        {post.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-primary-700 shadow-sm">
            {post.category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-primary-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(post.published_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {t('blog.minRead', { minutes: readingTime })}
          </span>
        </div>
      </div>
    </article>
  );
}
