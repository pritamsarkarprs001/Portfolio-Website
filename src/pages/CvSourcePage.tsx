import { useMemo, useState } from 'react';
import {
  Clipboard,
  Download,
  FileCode2,
  FileText,
  Printer,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { cvSource, cvSourceAvailable, cvSourceWarning } from '../data/cvSource';
import { profile } from '../data/profile';
import { publications } from '../data/publications';
import { projects } from '../data/projects';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { PageIntro, BackLink } from '../components/PageIntro';
import { Seo } from '../components/Seo';
import { Tag } from '../components/ui';

const formattedSections = [
  { title: 'Profile', lines: [profile.name, profile.role, profile.location, profile.tagline] },
  {
    title: 'Education',
    lines: education.map(
      (item) =>
        `${item.qualification} — ${item.institution} (${item.period})${item.grade ? ` · ${item.grade}` : ''}`,
    ),
  },
  {
    title: 'Experience',
    lines: experiences.map((item) => `${item.role} — ${item.organization} (${item.period})`),
  },
  {
    title: 'Research & publications',
    lines: publications.map((item) => `${item.title} · ${item.venue} · ${item.year}`),
  },
  { title: 'Projects', lines: projects.map((item) => `${item.name} — ${item.summary}`) },
];

export default function CvSourcePage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'preview' | 'source' | 'text'>('preview');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const sourceLines = useMemo(() => cvSource.split('\n'), []);
  const filteredLines = useMemo(
    () =>
      sourceLines
        .map((line, index) => ({ line, number: index + 1 }))
        .filter(
          ({ line }) => !search.trim() || line.toLowerCase().includes(search.trim().toLowerCase()),
        ),
    [search, sourceLines],
  );
  const copySource = async () => {
    try {
      await copyText(cvSource);
      setCopied(true);
      showToast('CV source copied as plain text', 'success');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast('Clipboard access is unavailable.', 'info');
    }
  };
  const downloadSource = () => {
    const blob = new Blob([cvSource], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Pritam-Sarkar-CV.tex';
    anchor.click();
    URL.revokeObjectURL(url);
    showToast('CV source download prepared', 'success');
  };
  return (
    <>
      <Seo
        title="CV Source & Preview"
        description="A plain-text preview of the supplied LaTeX CV source and a print-friendly structured CV view for Pritam Sarkar."
        noIndex
      />
      <PageIntro
        kicker="CV source"
        title="The CV, inspectable."
        description="A readable structured preview, a plain-text LaTeX source view, and a print-friendly page. The source is treated as text only and is never executed in the browser."
        action={
          <div className="flex flex-wrap gap-2">
            <BackLink to="/" label="Back home" />
            <button
              className="button button-secondary"
              type="button"
              onClick={() => window.print()}
            >
              <Printer size={14} /> Print preview
            </button>
          </div>
        }
      />
      <section className="section">
        <div className="container-reading">
          <div className="surface-card mb-5 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                className="flex rounded-lg border border-slate-700/60 p-1"
                role="group"
                aria-label="CV view"
              >
                <button
                  className={`small-button !border-0 ${tab === 'preview' ? '!bg-cyan-400/10 !text-cyan-300' : ''}`}
                  type="button"
                  aria-pressed={tab === 'preview'}
                  onClick={() => setTab('preview')}
                >
                  <FileText size={13} /> Rendered preview
                </button>
                <button
                  className={`small-button !border-0 ${tab === 'source' ? '!bg-cyan-400/10 !text-cyan-300' : ''}`}
                  type="button"
                  aria-pressed={tab === 'preview'}
                  onClick={() => setTab('source')}
                >
                  <FileCode2 size={13} /> LaTeX source
                </button>
                <button
                  className={`small-button !border-0 ${tab === 'text' ? '!bg-cyan-400/10 !text-cyan-300' : ''}`}
                  type="button"
                  aria-pressed={tab === 'preview'}
                  onClick={() => setTab('text')}
                >
                  <FileText size={13} /> Formatted text
                </button>
              </div>
              <div className="flex gap-2">
                {tab === 'source' ? (
                  <>
                    <button
                      className="small-button"
                      type="button"
                      onClick={() => void copySource()}
                    >
                      <Clipboard size={12} /> {copied ? 'Copied' : 'Copy source'}
                    </button>
                    <button className="small-button" type="button" onClick={downloadSource}>
                      <Download size={12} /> Download .tex
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            {tab === 'source' ? (
              <>
                <div className="relative mt-4">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                  />
                  <input
                    className="filter-input !pl-9"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search source lines"
                    aria-label="Search LaTeX source"
                  />
                </div>
                <div className="source-warning mt-4">
                  <ShieldAlert size={14} /> {cvSourceWarning}
                </div>
                <div className="source-code mt-4" role="region" aria-label="LaTeX source">
                  {filteredLines.length ? (
                    filteredLines.map(({ line, number }) => (
                      <div className="source-line" key={number}>
                        <span className="source-line-number">
                          {String(number).padStart(4, '0')}
                        </span>
                        <code>{line || ' '}</code>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 text-center text-xs text-slate-500">
                      No matching source lines.
                    </div>
                  )}
                </div>
              </>
            ) : null}
            {tab === 'preview' ? (
              <div className="cv-preview">
                <div className="cv-preview-header">
                  <div className="cv-preview-mark">PS</div>
                  <div>
                    <h1>{profile.name}</h1>
                    <p>{profile.role}</p>
                    <p>
                      {profile.location} · {profile.email}
                    </p>
                  </div>
                </div>
                <div className="cv-preview-section">
                  <h2>Professional summary</h2>
                  <p>{profile.bio[0]}</p>
                </div>
                {formattedSections.slice(1).map((section) => (
                  <details className="cv-preview-section" key={section.title} open>
                    <summary>
                      {section.title}
                      <ChevronDownIcon />
                    </summary>
                    {section.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </details>
                ))}
                <div className="cv-preview-section">
                  <h2>Public links</h2>
                  <div className="flex flex-wrap gap-2">
                    <Tag>GitHub</Tag>
                    <Tag>LinkedIn</Tag>
                    <Tag>Google Scholar</Tag>
                    <Tag>ORCID</Tag>
                  </div>
                </div>
              </div>
            ) : null}
            {tab === 'text' ? (
              <div className="formatted-text mt-5">
                {formattedSections.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    {section.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </section>
                ))}
              </div>
            ) : null}
            {!cvSourceAvailable ? (
              <div className="source-warning mt-4">
                <ShieldAlert size={14} /> Source status: placeholder — replace `cvSource` when a
                final LaTeX revision is supplied.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

function ChevronDownIcon() {
  return <span className="ml-auto text-slate-600">⌄</span>;
}
