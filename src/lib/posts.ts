import { supabase } from '@/lib/supabase';

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string | null;
  published_at: string;
  featured: boolean;
};

export async function fetchPosts(): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, cover_image, category, published_at, featured')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, cover_image, category, published_at, featured')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Post) ?? null;
}

export async function fetchRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  if (!supabase) return [];
  let query = supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, cover_image, category, published_at, featured')
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (post.category) {
    query = query.eq('category', post.category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Post[];
}
