import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { projects, projectCategories, type ProjectFilter } from '../data/projects';
import { filterProjects } from '../lib/filters';
import { PageIntro } from '../components/PageIntro';
import { ProjectCard } from '../components/ProjectCard';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/ui';

export default function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectFilter>('All');
  const [technology, setTechnology] = useState('All technologies');
  const technologies = useMemo(
    () => ['All technologies', ...new Set(projects.flatMap((project) => project.technologies))],
    [],
  );
  const filtered = useMemo(
    () =>
      filterProjects(projects, query, category).filter(
        (project) => technology === 'All technologies' || project.technologies.includes(technology),
      ),
    [category, query, technology],
  );
  const clear = () => {
    setQuery('');
    setCategory('All');
    setTechnology('All technologies');
  };

  return (
    <>
      <Seo
        title="Projects"
        description="Explore Pritam Sarkar’s applied machine learning, computer vision, generative AI, multimodal, and human–computer interaction projects."
      />
      <PageIntro
        kicker="Projects"
        title="Systems with a clear job to do."
        description="Five documented projects across research assistance, local recruitment automation, agricultural computer vision, touchless interaction, and multimodal clustering."
        action={
          <div className="flex flex-wrap gap-2">
            <span className="tag">{projects.length} project entries</span>
            <span className="tag">Local data-first workflows</span>
          </div>
        }
      />
      <section className="section">
        <div className="container-wide">
          <div className="surface-card mb-7 p-4 md:p-5">
            <div className="filter-bar mb-0">
              <div className="filter-search">
                <Search size={15} />
                <input
                  className="filter-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search project title, category, or technology"
                  aria-label="Search projects"
                />
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-slate-500" />
                <select
                  className="filter-input !w-auto min-w-[170px] !pl-3"
                  value={technology}
                  onChange={(event) => setTechnology(event.target.value)}
                  aria-label="Filter by technology"
                >
                  {technologies.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="mt-4 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by category"
            >
              {projectCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`tag-button ${category === item ? 'tag-active' : ''}`}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  <span className="tag">{item}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-500">
              Showing {filtered.length} of {projects.length} projects
            </p>
            {query || category !== 'All' || technology !== 'All technologies' ? (
              <button className="small-button" type="button" onClick={clear}>
                <X size={12} /> Clear filters
              </button>
            ) : null}
          </div>
          {filtered.length ? (
            <motion.div layout className="project-grid project-grid-wide">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.24 }}
                  >
                    <ProjectCard project={project} featured />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <Reveal className="surface-card flex min-h-56 flex-col items-center justify-center p-8 text-center">
              <Search size={22} className="text-slate-500" />
              <h2 className="mt-4 text-lg">No projects match those filters.</h2>
              <p className="mt-2 text-xs text-slate-500">
                Try a broader search or clear the category and technology filters.
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
