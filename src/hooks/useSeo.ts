import { useEffect } from 'react';

const DEFAULT_TITLE = 'Fortune Visa Services';
const DEFAULT_DESCRIPTION =
  'Fortune Visa Services is an Australian visa consultancy in Parramatta. Visas made simple. Journeys made certain.';

type SeoOptions = {
  title?: string;
  description?: string;
};

function setMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function useSeo({ title, description }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMetaTag('description', description ?? DEFAULT_DESCRIPTION);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('description', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
