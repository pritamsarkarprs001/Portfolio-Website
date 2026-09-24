import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clipboard, Share2, Sparkles } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import { copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { ExternalLinkButton } from '../components/ProjectCard';
import { ProjectVisual } from '../components/ProjectVisual';
import { BackLink } from '../components/PageIntro';
import { Seo } from '../components/Seo';
import { SectionKicker, Tag } from '../components/ui';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  if (!project) return <Navigate to="/404" replace />;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share)
        await navigator.share({ title: project.name, text: project.summary, url });
      else {
        await copyText(url);
        showToast('Project link copied', 'success');
      }
    } catch {
      /* A cancelled native share needs no UI. */
    }
  };
  const copyStack = async () => {
    try {
      await copyText(project.technologies.join(', '));
      setCopied(true);
      showToast('Technology stack copied', 'success');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast('Clipboard access is unavailable.', 'info');
    }
  };
  return (
    <>
      <Seo title={project.name} description={project.summary} />
      <section className="detail-hero">
        <div className="container-wide">
          <BackLink to="/projects" label="Back to projects" />
          <div className="detail-layout mt-8">
            <div>
              <SectionKicker>{project.eyebrow}</SectionKicker>
              <h1 className="detail-title">{project.name}</h1>
              <p className="detail-lede">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{project.year ?? 'Date not specified'}</Tag>
                <Tag>{project.status}</Tag>
                {project.categories.map((category) => (
                  <Tag key={category}>{category}</Tag>
                ))}
              </div>
            </div>
            <div className="surface-card detail-aside">
              <div className="detail-aside-label">Project record</div>
              <div className="detail-aside-value">
                {project.technologies.slice(0, 4).join(' · ')}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <ExternalLinkButton
                    key={link.href}
                    href={link.href}
                    kind={
                      link.kind === 'github'
                        ? 'github'
                        : link.kind === 'demo'
                          ? 'demo'
                          : link.kind === 'report'
                            ? 'report'
                            : 'external'
                    }
                  >
                    {link.label}
                  </ExternalLinkButton>
                ))}
              </div>
              <button className="small-button mt-2" type="button" onClick={() => void share()}>
                <Share2 size={12} /> Share project
              </button>
              <button className="small-button mt-2" type="button" onClick={() => void copyStack()}>
                <Clipboard size={12} /> {copied ? 'Copied' : 'Copy technology stack'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-wide">
          <div className="surface-card overflow-hidden">
            <div className="project-card-visual !h-[300px] md:!h-[420px]">
              <ProjectVisual variant={project.visual} />
              <span className="project-visual-label">
                technical visualization · replaceable asset
              </span>
            </div>
          </div>
          <div className="detail-layout mt-10">
            <div>
              <div className="detail-section">
                <h2>Project overview</h2>
                <p>{project.solution}</p>
              </div>
              <div className="detail-section">
                <h2>Problem statement</h2>
                <p>{project.problem}</p>
              </div>
              <div className="detail-section">
                <h2>Key features</h2>
                <ul className="detail-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} /> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h2>Development process</h2>
                <ol className="detail-list list-none">
                  {project.process.map((step, stepIndex) => (
                    <li key={step}>
                      <span className="font-mono text-[10px] text-cyan-300">0{stepIndex + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="detail-section">
                <h2>Engineering challenges</h2>
                <ul className="detail-list">
                  {project.challenges.map((challenge) => (
                    <li key={challenge}>
                      <Sparkles size={14} /> <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h2>Engineering decisions</h2>
                <ul className="detail-list">
                  {project.decisions.map((decision) => (
                    <li key={decision}>
                      <Check size={14} /> <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h2>Results & evidence</h2>
                <p>{project.results}</p>
              </div>
              <div className="detail-section">
                <h2>Lessons learned</h2>
                <ul className="detail-list">
                  {project.lessons.map((lesson) => (
                    <li key={lesson}>
                      <Check size={14} /> <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h2>Future improvements</h2>
                <ul className="detail-list">
                  {project.future.map((item) => (
                    <li key={item}>
                      <ArrowRight size={14} /> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="surface-card p-5">
                <div className="section-kicker">Technology stack</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
                <div className="mt-6 border-t border-slate-700/50 pt-4">
                  <p className="text-[10px] leading-5 text-slate-500">
                    The visual is a CSS/SVG technical illustration because no project screenshot was
                    supplied in the CV source.
                  </p>
                </div>
              </div>
            </aside>
          </div>
          <div className="detail-nav">
            <Link className="detail-nav-link" to={`/projects/${previous.slug}`}>
              <span className="detail-nav-label">
                <ArrowLeft size={11} className="mr-1 inline" /> Previous project
              </span>
              <span className="detail-nav-name">{previous.name}</span>
            </Link>
            <Link className="detail-nav-link next" to={`/projects/${next.slug}`}>
              <span className="detail-nav-label">
                Next project <ArrowRight size={11} className="ml-1 inline" />
              </span>
              <span className="detail-nav-name">{next.name}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
