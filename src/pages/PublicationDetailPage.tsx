import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clipboard, Quote, Share2 } from 'lucide-react';
import { getPublication, publications } from '../data/publications';
import { createCitation, createCitationText, copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { ExternalLinkButton } from '../components/ProjectCard';
import { BackLink } from '../components/PageIntro';
import { Seo } from '../components/Seo';
import { SectionKicker, Tag } from '../components/ui';

export default function PublicationDetailPage() {
  const { slug = '' } = useParams();
  const publication = getPublication(slug);
  const { showToast } = useToast();
  const [copied, setCopied] = useState<'citation' | 'bibtex' | ''>('');
  if (!publication) return <Navigate to="/404" replace />;
  const index = publications.findIndex((item) => item.slug === publication.slug);
  const previous = publications[(index - 1 + publications.length) % publications.length];
  const next = publications[(index + 1) % publications.length];
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share)
        await navigator.share({ title: publication.title, text: publication.authors, url });
      else {
        await copyText(url);
        showToast('Publication link copied', 'success');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      showToast('Sharing is unavailable; copy the link instead.', 'info');
    }
  };
  const copy = async (text: string, type: 'citation' | 'bibtex') => {
    try {
      await copyText(text);
      setCopied(type);
      showToast(type === 'citation' ? 'Citation copied' : 'BibTeX copied', 'success');
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      showToast('Clipboard access is unavailable.', 'info');
    }
  };
  return (
    <>
      <Seo
        title={publication.title}
        description={`Publication record for ${publication.title}.`}
        type="article"
      />
      <section className="detail-hero">
        <div className="container-wide">
          <BackLink to="/research" label="Back to research" />
          <div className="detail-layout mt-8">
            <div>
              <SectionKicker>
                {publication.type} · {publication.year}
              </SectionKicker>
              <h1 className="detail-title">{publication.title}</h1>
              <p className="detail-lede">{publication.authors}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{publication.area}</Tag>
                <Tag>{publication.year}</Tag>
                {publication.presentationDate ? (
                  <Tag>Presented {publication.presentationDate}</Tag>
                ) : null}
                <Tag>{publication.type}</Tag>
              </div>
            </div>
            <div className="surface-card detail-aside">
              <div className="detail-aside-label">Record actions</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="small-button"
                  type="button"
                  onClick={() => void copy(createCitationText(publication), 'citation')}
                >
                  <Clipboard size={12} /> {copied === 'citation' ? 'Copied' : 'Copy citation'}
                </button>
                <button
                  className="small-button"
                  type="button"
                  onClick={() => void copy(createCitation(publication), 'bibtex')}
                >
                  <Quote size={12} /> {copied === 'bibtex' ? 'Copied' : 'Copy BibTeX'}
                </button>
                <button className="small-button" type="button" onClick={() => void share()}>
                  <Share2 size={12} /> Share
                </button>
              </div>
              {publication.links.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {publication.links.map((link) => (
                    <ExternalLinkButton key={`${link.href}-${link.label}`} href={link.href}>
                      {link.label}
                    </ExternalLinkButton>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-reading">
          <div className="detail-section">
            <h2>Venue & publication details</h2>
            <p>{publication.venue}</p>
            {publication.publisher ? (
              <p className="mt-2 text-xs text-slate-500">{publication.publisher}</p>
            ) : null}
          </div>
          <div className="detail-section">
            <h2>Abstract</h2>
            <p>{publication.abstract}</p>
          </div>
          <div className="detail-section">
            <h2>Keywords</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {publication.keywords.map((keyword) => (
                <Tag key={keyword}>{keyword}</Tag>
              ))}
            </div>
          </div>
          <div className="detail-section">
            <h2>Links & access</h2>
            <div className="detail-actions">
              {publication.links.map((link) => (
                <ExternalLinkButton key={`${link.href}-${link.label}`} href={link.href}>
                  {link.label}
                </ExternalLinkButton>
              ))}
            </div>
          </div>
          <div className="detail-section">
            <h2>Citation tools</h2>
            <div className="detail-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => void copy(createCitationText(publication), 'citation')}
              >
                <Clipboard size={14} />{' '}
                {copied === 'citation' ? 'Citation copied' : 'Copy citation'}
              </button>
              <button
                className="button button-ghost"
                type="button"
                onClick={() => void copy(createCitation(publication), 'bibtex')}
              >
                <Quote size={14} /> {copied === 'bibtex' ? 'BibTeX copied' : 'Copy BibTeX'}
              </button>
            </div>
          </div>
          <div className="detail-nav">
            <Link className="detail-nav-link" to={`/research/${previous.slug}`}>
              <span className="detail-nav-label">
                <ArrowLeft size={11} className="mr-1 inline" /> Previous record
              </span>
              <span className="detail-nav-name">{previous.title}</span>
            </Link>
            <Link className="detail-nav-link next" to={`/research/${next.slug}`}>
              <span className="detail-nav-label">
                Next record <ArrowRight size={11} className="ml-1 inline" />
              </span>
              <span className="detail-nav-name">{next.title}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
