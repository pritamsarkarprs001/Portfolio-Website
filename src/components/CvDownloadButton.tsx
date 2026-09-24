import { Download, FileText } from 'lucide-react';
import { cvPath, profile } from '../data/profile';
import { useToast } from '../hooks/useToast';
import { cn } from '../lib/utils';

export function CvDownloadButton({
  variant = 'primary',
  className,
  label = 'Download CV',
}: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  className?: string;
  label?: string;
}) {
  const { showToast } = useToast();
  if (profile.cvPdfAvailable)
    return (
      <a
        className={cn('button', `button-${variant}`, className)}
        href={cvPath}
        download
        aria-label={label || 'Download CV'}
      >
        <Download size={15} />
        <span>{label}</span>
      </a>
    );
  return (
    <button
      className={cn('button', `button-${variant}`, className)}
      type="button"
      aria-label={label || 'Open CV preview'}
      onClick={() =>
        showToast(
          'PDF placeholder: add public/assets/Pritam-Sarkar-CV.pdf, then set cvPdfAvailable to true.',
          'info',
        )
      }
    >
      <FileText size={15} />
      <span>{label}</span>
    </button>
  );
}
