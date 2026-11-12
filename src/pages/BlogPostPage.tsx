import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Link2, Linkedin, Loader2, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/EmptyState';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';
import { fetchPostBySlug, fetchRelatedPosts } from '@/lib/posts';
import type { Post } from '@/lib/posts';
import { estimateReadingTime, renderMarkdown } from '@/lib/markdown';

type LoadState = 'loading' | 'success' | 'error' | 'not-found';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [state, setState] = useState<LoadState>('loading');
  const [linkCopied, setLinkCopied] = useState(false);

  useSeo({
    title: post?.title,
    description: post?.excerpt,
  });

  useEffect(() => {
    if (!slug) {
      setState('not-found');
      return;
    }
    let cancelled = false;
    setState('loading');
    setPost(null);
    setRelated([]);

    fetchPostBySlug(slug)
      .then(async (data) => {
        if (cancelled) return;
        if (!data) {
          setState('not-found');
          return;
        }
        setPost(data);
        setState('success');
        try {
          const relatedPosts = await fetchRelatedPosts(data, 3);
          if (!cancelled) setRelated(relatedPosts);
        } catch {
          // related posts are non-critical
        }
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-muted">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        <span className="text-sm font-semibold">{t('blog.loadingTitle')}</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={<Clock className="h-7 w-7" aria-hidden="true" />}
          title={t('blog.errorPostTitle')}
          body={t('blog.errorPostBody')}
        />
      </div>
    );
  }

  if (state === 'not-found' || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={<ArrowRight className="h-7 w-7" aria-hidden="true" />}
          title={t('blog.notFoundTitle')}
          body={t('blog.notFoundBody')}
          action={
            <Link
              to="/blog"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
            >
              {t('blog.notFoundCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <article>
        {post.cover_image && (
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[400px] lg:h-[480px]">
            <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('blog.backToBlog')}
          </Link>

          {post.category && (
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-primary-700">{post.category}</p>
          )}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {t('blog.minRead', { minutes: readingTime })}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ShareBar
            shareUrl={shareUrl}
            shareText={shareText}
            linkCopied={linkCopied}
            onCopyLink={handleCopyLink}
          />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200/70 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{t('blog.relatedPosts')}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <RelatedCard key={rp.id} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCta />
    </>
  );
}

type ShareBarProps = {
  shareUrl: string;
  shareText: string;
  linkCopied: boolean;
  onCopyLink: () => void;
};

function ShareBar({ shareUrl, shareText, linkCopied, onCopyLink }: ShareBarProps) {
  const { t } = useTranslation();
  const encodedUrl = encodeURIComponent(shareUrl);

  const shares = [
    {
      label: t('blog.shareFacebook'),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Share2,
    },
    {
      label: t('blog.shareX'),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`,
      icon: Share2,
    },
    {
      label: t('blog.shareLinkedIn'),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-slate-200/80 py-4">
      <span className="mr-2 text-xs font-bold uppercase tracking-wider text-muted">{t('blog.share')}</span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-muted transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
        >
          <s.icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={onCopyLink}
        aria-label={t('blog.copyLink')}
        title={t('blog.copyLink')}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-muted transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
      >
        <Link2 className="h-4 w-4" aria-hidden="true" />
      </button>
      {linkCopied && (
        <span className="ml-1 text-xs font-semibold text-success-700">{t('blog.linkCopied')}</span>
      )}
    </div>
  );
}

function RelatedCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/blog/${post.slug}`} className="relative block h-40 overflow-hidden">
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
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">{post.category}</p>
        )}
        <h3 className="mt-2 text-base font-bold leading-snug text-ink">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-primary-700">
            {post.title}
          </Link>
        </h3>
        <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-muted">
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
