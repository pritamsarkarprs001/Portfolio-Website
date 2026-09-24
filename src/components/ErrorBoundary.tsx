import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error', error, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="container-reading flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <div className="section-kicker">Something went wrong</div>
          <h1 className="mt-4 text-4xl">A render boundary caught an issue.</h1>
          <p className="mt-4 max-w-lg text-sm text-slate-400">
            The page could not be displayed. Try returning to the portfolio home, or reload the
            application.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <a className="button button-primary" href={import.meta.env.BASE_URL}>
              <ArrowLeft size={15} /> Return home
            </a>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={15} /> Reload
            </button>
          </div>
          <p className="mt-8 font-mono text-[10px] text-slate-600">
            <AlertTriangle size={12} className="mr-1 inline" /> No personal data is sent from this
            fallback.
          </p>
        </div>
      );
    return this.props.children;
  }
}
