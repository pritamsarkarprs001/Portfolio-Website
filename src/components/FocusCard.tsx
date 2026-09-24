import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import type { ResearchFocus } from '../types';
import { Icon } from '../lib/icons';
import { cn } from '../lib/utils';

export function FocusCard({ focus }: { focus: ResearchFocus }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={cn('surface-card surface-card-hover focus-card', `focus-${focus.accent}`)}>
      <div className="focus-icon">
        <Icon name={focus.icon} size={16} />
      </div>
      <h3 className="focus-title">{focus.title}</h3>
      <p className="focus-description">{focus.description}</p>
      <div className="focus-tech">
        {focus.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <button
        className="focus-card-expand"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <Plus
          size={11}
          className={open ? 'rotate-45 transition-transform' : 'transition-transform'}
        />{' '}
        {open ? 'Collapse focus' : 'Explore focus'}{' '}
        <ChevronDown
          size={11}
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>
      {open ? (
        <div className="mt-3 border-t border-current/20 pt-3 text-[10px] leading-5 opacity-80">
          This area is listed as a research focus and is connected to the project, thesis,
          publication, or skill entries in the portfolio.
        </div>
      ) : null}
    </article>
  );
}
