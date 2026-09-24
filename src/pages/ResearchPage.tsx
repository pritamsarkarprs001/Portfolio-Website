import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, LayoutList, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  publications,
  publicationAreas,
  publicationTypes,
  publicationYears,
} from '../data/publications';
import { PageIntro } from '../components/PageIntro';
import { PublicationCard } from '../components/PublicationCard';
import { Seo, ScholarlySeo } from '../components/Seo';
import { Reveal } from '../components/ui';

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('All areas');
  const [year, setYear] = useState('All years');
  const [type, setType] = useState('All types');
  const [view, setView] = useState<'list' | 'timeline'>('list');
  const filtered = useMemo(
    () =>
      publications.filter((publication) => {
        const text =
          `${publication.title} ${publication.authors} ${publication.venue} ${publication.keywords.join(' ')}`.toLowerCase();
        return (
          (!query.trim() || text.includes(query.trim().toLowerCase())) &&
          (area === 'All areas' || publication.area === area) &&
          (year === 'All years' || String(publication.year) === year) &&
          (type === 'All types' || publication.type === type)
        );
      }),
    [area, query, type, year],
  );
  const clear = () => {
    setQuery('');
    setArea('All areas');
    setYear('All years');
    setType('All types');
  };
  return (
    <>
      <Seo
        title="Research & Publications"
        description="Explore Pritam Sarkar’s undergraduate thesis, satellite-driven geospatial research, machine learning papers, and conference presentations."
      />
      <ScholarlySeo />
      <PageIntro
        kicker="Research"
        title="Evidence, context, and a trail to follow."
        description="A publication-oriented view of the thesis, satellite-driven studies, conference work, and citation tools. Abstract text remains explicitly marked when the CV source does not provide it."
        action={
          <div className="flex flex-wrap gap-2">
            <span className="tag">{publications.length} research entries</span>
            <span className="tag">DOI + repository links</span>
          </div>
        }
      />
      <section className="section">
        <div className="container-wide">
          <div className="surface-card p-4 md:p-5">
            <div className="filter-bar mb-0">
              <div className="filter-search">
                <Search size={15} />
                <input
                  className="filter-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, author, venue, or keyword"
                  aria-label="Search publications"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <SlidersHorizontal size={15} className="mt-3 text-slate-500" />
                <select
                  className="filter-input !w-auto min-w-[145px]"
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  aria-label="Filter by research area"
                >
                  <option>All areas</option>
                  {publicationAreas.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <select
                  className="filter-input !w-auto min-w-[125px]"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  aria-label="Filter by year"
                >
                  <option>All years</option>
                  {publicationYears.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <select
                  className="filter-input !w-auto min-w-[170px]"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  aria-label="Filter by publication type"
                >
                  <option>All types</option>
                  {publicationTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="my-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-500">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </p>
            <div className="flex items-center gap-2">
              <div
                className="flex rounded-lg border border-slate-700/60 p-1"
                role="group"
                aria-label="Publication view"
              >
                <button
                  className={`icon-button !h-7 !w-7 !border-0 ${view === 'list' ? '!bg-cyan-400/10 !text-cyan-300' : ''}`}
                  type="button"
                  onClick={() => setView('list')}
                  aria-label="List view"
                  aria-pressed={view === 'list'}
                >
                  <LayoutList size={14} />
                </button>
                <button
                  className={`icon-button !h-7 !w-7 !border-0 ${view === 'timeline' ? '!bg-cyan-400/10 !text-cyan-300' : ''}`}
                  type="button"
                  onClick={() => setView('timeline')}
                  aria-label="Timeline view"
                  aria-pressed={view === 'timeline'}
                >
                  <BookOpen size={14} />
                </button>
              </div>
              {query || area !== 'All areas' || year !== 'All years' || type !== 'All types' ? (
                <button className="small-button" type="button" onClick={clear}>
                  <X size={12} /> Reset
                </button>
              ) : null}
            </div>
          </div>
          {filtered.length ? (
            view === 'list' ? (
              <div className="publication-list">
                <AnimatePresence mode="popLayout">
                  {filtered.map((publication, index) => (
                    <motion.div
                      key={publication.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PublicationCard publication={publication} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <ResearchTimeline items={filtered} />
            )
          ) : (
            <Reveal className="surface-card flex min-h-56 flex-col items-center justify-center p-8 text-center">
              <Search size={22} className="text-slate-500" />
              <h2 className="mt-4 text-lg">No research entries match.</h2>
              <p className="mt-2 text-xs text-slate-500">
                Try a different title, year, area, or publication type.
              </p>
              <button className="button button-secondary mt-5" type="button" onClick={clear}>
                Reset filters
              </button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

function ResearchTimeline({ items }: { items: typeof publications }) {
  return (
    <div className="relative ml-3 border-l border-slate-700/60 pl-7">
      {items.map((publication, index) => (
        <Reveal className="relative mb-5 last:mb-0" key={publication.slug} delay={index * 0.05}>
          <span className="absolute -left-[37px] top-5 h-3 w-3 rounded-full border border-cyan-300 bg-slate-950 shadow-[0_0_12px_rgba(56,201,237,.5)]" />
          <div className="surface-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-cyan-300">{publication.year}</span>
              <span className="tag">{publication.type}</span>
            </div>
            <h2 className="mt-3 text-lg leading-tight text-slate-100">
              <Link to={`/research/${publication.slug}`}>{publication.title}</Link>
            </h2>
            <p className="mt-2 text-xs text-slate-500">{publication.authors}</p>
            <p className="mt-3 text-xs text-slate-400">{publication.venue}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
