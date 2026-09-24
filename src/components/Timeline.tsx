import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Education, Experience } from '../types';
import { Icon } from '../lib/icons';

type TimelineItem = Experience | Education;

function TimelineEntry({
  item,
  kind,
  index,
}: {
  item: TimelineItem;
  kind: 'experience' | 'education';
  index: number;
}) {
  const [expanded, setExpanded] = useState(kind === 'education');
  const educationItem = 'qualification' in item;
  const experienceItem = 'role' in item;
  const title = educationItem ? item.qualification : experienceItem ? item.role : '';
  const organization = educationItem ? item.institution : experienceItem ? item.organization : '';
  const typeClass = educationItem ? 'education' : experienceItem ? item.type : 'work';
  return (
    <motion.article
      className={`timeline-item ${typeClass}`}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <span className="timeline-dot" aria-hidden="true" />
      <div className="surface-card timeline-card">
        <div className="timeline-period">{item.period}</div>
        <div className="timeline-role">{title}</div>
        <div className="timeline-org">{organization}</div>
        <div className="timeline-location">
          <Icon name="map" size={12} /> {item.location}
        </div>
        {educationItem ? (
          <>
            <span className="timeline-type">Academic milestone</span>
            {item.grade ? <div className="mt-3 text-xs text-amber-200/80">{item.grade}</div> : null}
            {expanded ? (
              <p className="mt-3 text-xs leading-5 text-slate-400">{item.detail}</p>
            ) : null}
          </>
        ) : (
          <>
            <span className="timeline-type">Professional milestone</span>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              {experienceItem ? item.summary : ''}
            </p>
            {expanded ? (
              <ul className="timeline-details">
                {experienceItem
                  ? item.details.map((detail) => <li key={detail}>{detail}</li>)
                  : null}
              </ul>
            ) : null}
          </>
        )}
        <button
          className="small-button mt-4"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details' : 'View details'}
        </button>
      </div>
    </motion.article>
  );
}

export function Timeline({
  items,
  kind,
}: {
  items: TimelineItem[];
  kind: 'experience' | 'education';
}) {
  return (
    <div className="timeline" aria-label={`${kind} timeline`}>
      {items.map((item, index) => (
        <TimelineEntry key={item.id} item={item} kind={kind} index={index} />
      ))}
    </div>
  );
}
