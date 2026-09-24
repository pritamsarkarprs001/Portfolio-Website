import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Github, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui';

export function ExternalLinkButton({
  href,
  children,
  kind = 'external',
}: {
  href: string;
  children: ReactNode;
  kind?: 'github' | 'demo' | 'report' | 'external';
}) {
  return (
    <a className="small-button" href={href} target="_blank" rel="noopener noreferrer">
      {kind === 'github' ? (
        <Github size={12} />
      ) : kind === 'demo' ? (
        <Play size={12} />
      ) : (
        <ArrowUpRight size={12} />
      )}
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const primaryLink = project.links[0];
  const { showToast } = useToast();
  const [copiedTechnology, setCopiedTechnology] = useState('');
  const copyTechnology = async (technology: string) => {
    try {
      await copyText(technology);
      setCopiedTechnology(technology);
      showToast(`${technology} copied`, 'success');
      window.setTimeout(() => setCopiedTechnology(''), 1400);
    } catch {
      showToast('Clipboard access is unavailable.', 'info');
    }
  };
  return (
    <article
      className={`surface-card surface-card-hover project-card${featured ? ' project-card-featured' : ''}`}
    >
      <div className="project-card-visual">
        <ProjectVisual variant={project.visual} />
        <span className="project-visual-label">technical visualization · replaceable asset</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <div>
            <div className="project-eyebrow">{project.eyebrow}</div>
            <h3 className="project-name">
              <Link to={`/projects/${project.slug}`} className="hover:text-signal-300">
                {project.name}
              </Link>
            </h3>
          </div>
          <span className="tag">{project.year ?? 'Date not specified'}</span>
        </div>
        <p className="project-summary">{project.summary}</p>
        <div className="project-tags" aria-label="Technologies">
          {project.technologies.slice(0, featured ? 5 : 4).map((technology) => (
            <Tag
              key={technology}
              onClick={() => void copyTechnology(technology)}
              active={copiedTechnology === technology}
            >
              {copiedTechnology === technology ? 'Copied' : technology}
            </Tag>
          ))}
          {project.technologies.length > (featured ? 5 : 4) ? (
            <Tag>+{project.technologies.length - (featured ? 5 : 4)}</Tag>
          ) : null}
        </div>
        <div className="project-card-bottom">
          <Link className="project-link" to={`/projects/${project.slug}`}>
            View case study <ArrowUpRight size={14} />
          </Link>
          <div className="flex items-center gap-1.5">
            {primaryLink ? (
              <a
                className="icon-button !h-8 !w-8"
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${primaryLink.label}`}
              >
                <ArrowUpRight size={14} />
              </a>
            ) : null}
            <span className="tag">{project.categories[0]}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
