import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Home } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The requested portfolio page could not be found."
        noIndex
      />
      <div className="container-reading flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="section-kicker">
          <Compass size={14} /> Route not found
        </div>
        <h1 className="mt-5 text-6xl font-display tracking-[-.08em] text-slate-100">404</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
          That coordinate does not exist in this portfolio. Return to the home page or use the
          command palette to jump to a section.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link className="button button-primary" to="/">
            <Home size={15} /> Home
          </Link>
          <Link className="button button-secondary" to="/projects">
            <ArrowLeft size={15} /> Browse projects
          </Link>
        </div>
      </div>
    </>
  );
}
