export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function createCitationText(publication: {
  authors: string;
  title: string;
  venue: string;
  year: number;
  doi?: string;
}) {
  const doi = publication.doi
    ? ` https://doi.org/${publication.doi.replace(/^https?:\/\/doi\.org\//, '')}`
    : '';
  return `${publication.authors} (${publication.year}). ${publication.title}. ${publication.venue}.${doi}`;
}

export function createCitation(publication: {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  type?: string;
  slug?: string;
}) {
  const type = publication.type === 'Undergraduate Thesis' ? 'misc' : 'inproceedings';
  const keySuffix =
    publication.slug ||
    publication.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 32);
  const authors = publication.authors.split(/\s*,\s*/).join(' and ');
  const doi = publication.doi
    ? `\n  doi = {${publication.doi.replace(/^https?:\/\/doi\.org\//, '')}}`
    : '';
  const venueField =
    type === 'misc'
      ? `howpublished = {${publication.venue}}`
      : `booktitle = {${publication.venue}}`;
  return `@${type}{pritam-${publication.year}-${keySuffix},\n  author = {${authors}},\n  title = {${publication.title}},\n  ${venueField},\n  year = {${publication.year}}${doi}\n}`;
}

export async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy command failed');
}

export function formatProjectResult(result: string) {
  return result.startsWith('Functional') || result.startsWith('The CV') ? result : result;
}
