import { useState } from 'react';
import { ChevronDown, Copy, FileText, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Publication } from '../types';
import { createCitation, copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { Tag } from './ui';
import { ExternalLinkButton } from './ProjectCard';

export function PublicationCard({
  publication,
  index = 0,
}: {
  publication: Publication;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { showToast } = useToast();
  const copy = async (text: string, message: string) => {
    try {
      await copyText(text);
      showToast(message, 'success');
    } catch {
      showToast('Clipboard access is unavailable in this browser.', 'info');
    }
  };
  return (
    <article className="surface-card surface-card-hover publication-card">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="publication-index">
            RESEARCH NOTE / {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="publication-title">
            <Link to={`/research/${publication.slug}`} className="hover:text-signal-300">
              {publication.title}
            </Link>
          </h3>
          <p className="publication-authors">{publication.authors}</p>
        </div>
        <span className="tag shrink-0">
          {publication.type === 'Conference Paper' ? 'paper' : 'thesis'}
        </span>
      </div>
      <div className="publication-meta">
        <span>
          <FileText size={12} /> {publication.venue}
        </span>
        <span>
          <span className="h-1 w-1 rounded-full bg-current" /> {publication.year}
          {publication.presentationDate ? ` · presented ${publication.presentationDate}` : ''}
        </span>
        <span>{publication.area}</span>
      </div>
      {expanded ? (
        <div className="mt-5 border-t border-slate-700/50 pt-4">
          <p className="text-xs leading-6 text-slate-400">{publication.abstract}</p>
          {publication.publisher ? (
            <p className="mt-3 font-mono text-[10px] text-slate-500">{publication.publisher}</p>
          ) : null}
        </div>
      ) : null}
      <div className="publication-keywords">
        {publication.keywords.map((keyword) => (
          <Tag key={keyword}>{keyword}</Tag>
        ))}
      </div>
      <div className="publication-actions">
        <button
          className="small-button"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details' : 'Read details'}
          <ChevronDown size={12} className={expanded ? 'rotate-180' : ''} />
        </button>
        <button
          className="small-button"
          type="button"
          onClick={() => void copy(publication.authors, 'Author list copied')}
        >
          <Copy size={12} /> Cite authors
        </button>
        <button
          className="small-button"
          type="button"
          onClick={() => void copy(createCitation(publication), 'BibTeX copied')}
        >
          <Quote size={12} /> BibTeX
        </button>
        {publication.links.map((link) => (
          <ExternalLinkButton key={`${link.href}-${link.label}`} href={link.href}>
            {link.label}
          </ExternalLinkButton>
        ))}
      </div>
    </article>
  );
}
