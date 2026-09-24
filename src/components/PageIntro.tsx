import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SectionKicker } from './ui';

export function PageIntro({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container-wide">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <ArrowUpRight size={11} />
          <span>{kicker}</span>
        </div>
        <div className="page-hero-grid">
          <div>
            <SectionKicker>{kicker}</SectionKicker>
            <h1 className="page-title">{title}</h1>
          </div>
          <div>
            <p className="page-intro">{description}</p>
            {action ? <div style={{ marginTop: 20 }}>{action}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link className="button button-ghost" to={to}>
      <ArrowLeft size={14} /> {label}
    </Link>
  );
}
