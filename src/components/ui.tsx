import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotionPreference } from '../hooks/useReducedMotion';
import { cn } from '../lib/utils';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<'div'> & { children: ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionKicker({
  children,
  tone = 'cyan',
}: {
  children: ReactNode;
  tone?: 'cyan' | 'violet' | 'mint';
}) {
  return (
    <div className={cn('section-kicker', `section-kicker-${tone}`)}>
      <span className="kicker-line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
}) {
  return (
    <div className={cn('section-heading', align === 'center' && 'section-heading-center')}>
      <div>
        <SectionKicker>{kicker}</SectionKicker>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </div>
  );
}

export function Tag({
  children,
  onClick,
  active = false,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  const content = <span className={cn('tag', active && 'tag-active', className)}>{children}</span>;
  if (onClick) {
    return (
      <button type="button" className="tag-button" onClick={onClick} aria-pressed={active}>
        {content}
      </button>
    );
  }
  return content;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  className,
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  icon?: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn('button', `button-${variant}`, className)} {...props}>
      <span>{children}</span>
      {icon}
    </a>
  );
}

export function Divider() {
  return <div className="soft-divider" aria-hidden="true" />;
}
