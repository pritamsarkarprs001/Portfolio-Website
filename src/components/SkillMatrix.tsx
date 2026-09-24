import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, CircleHelp } from 'lucide-react';
import { skillGroups } from '../data/skills';
import { Icon } from '../lib/icons';
import { cn } from '../lib/utils';

const radarPoints = [
  { x: 160, y: 32, label: 'ML / DL' },
  { x: 263, y: 84, label: 'Research' },
  { x: 263, y: 196, label: 'Data' },
  { x: 160, y: 248, label: 'MLOps' },
  { x: 57, y: 196, label: 'Software' },
  { x: 57, y: 84, label: 'Systems' },
];
const innerPoints = [
  { x: 160, y: 76 },
  { x: 222, y: 107 },
  { x: 222, y: 173 },
  { x: 160, y: 204 },
  { x: 98, y: 173 },
  { x: 98, y: 107 },
];
const outerPoints = [
  { x: 160, y: 38 },
  { x: 257, y: 89 },
  { x: 257, y: 191 },
  { x: 160, y: 242 },
  { x: 63, y: 191 },
  { x: 63, y: 89 },
];

export function SkillMatrix() {
  const [open, setOpen] = useState('ai');
  return (
    <div className="skills-layout">
      <div className="surface-card skill-visual">
        <div className="skill-visual-label">
          <span>areas of experience</span>
          <CircleHelp size={13} aria-label="This is a qualitative map, not a proficiency score" />
        </div>
        <svg
          viewBox="0 0 320 280"
          role="img"
          aria-label="Qualitative skill constellation spanning machine learning, research, data, MLOps, software, and systems"
        >
          <g className="skill-orbit" opacity=".45">
            <ellipse
              cx="160"
              cy="140"
              rx="106"
              ry="64"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth=".7"
              strokeDasharray="2 5"
            />
            <circle
              cx="160"
              cy="140"
              r="101"
              fill="none"
              stroke="var(--violet)"
              strokeWidth=".5"
              strokeDasharray="1 7"
            />
          </g>
          <polygon
            points={outerPoints.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
          />
          <polygon
            points={innerPoints.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {outerPoints.map((point, index) => (
            <line
              key={index}
              x1="160"
              y1="140"
              x2={point.x}
              y2={point.y}
              stroke="var(--line)"
              strokeWidth=".8"
            />
          ))}
          <motion.polygon
            points="160,78 221,108 207,180 160,211 113,177 99,109"
            fill="rgba(56,201,237,.13)"
            stroke="var(--cyan)"
            strokeWidth="1.5"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {radarPoints.map((point, index) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="var(--bg-deep)"
                stroke={index % 2 ? 'var(--violet)' : 'var(--cyan)'}
                strokeWidth="1.5"
              />
              <text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                fill="var(--muted)"
                fontSize="9"
                fontFamily="IBM Plex Mono, monospace"
              >
                {point.label}
              </text>
            </g>
          ))}
          <circle cx="160" cy="140" r="3" fill="var(--mint)" />
        </svg>
        <p className="text-center font-mono text-[9px] uppercase tracking-[.1em] text-slate-500">
          Qualitative map · not a percentage claim
        </p>
      </div>
      <div className="skill-groups">
        {skillGroups.map((group) => {
          const isOpen = open === group.id;
          return (
            <div
              className={cn('surface-card skill-group', isOpen && 'skill-group-open')}
              key={group.id}
            >
              <button
                className="skill-group-button"
                type="button"
                onClick={() => setOpen(isOpen ? '' : group.id)}
                aria-expanded={isOpen}
              >
                <span className="skill-group-icon">
                  <Icon name={group.icon} size={15} />
                </span>
                <span className="skill-group-title">{group.title}</span>
                <span className="skill-group-count">{group.skills.length} areas</span>
                <ChevronDown className="skill-group-chevron" size={15} />
              </button>
              {isOpen ? (
                <div className="skill-detail">
                  <div className="skill-detail-inner">
                    <div className="skill-detail-content">
                      <p>{group.description}</p>
                      <div className="skill-cloud">
                        {group.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CapabilityPanel() {
  const capabilities = [
    ['01', 'Research framing', 'Turn a domain question into a clear modeling and evaluation plan.'],
    ['02', 'Applied modeling', 'Build deep learning, classical ML, and multimodal pipelines.'],
    ['03', 'Reliable delivery', 'Connect data, APIs, pipelines, interfaces, and deployment.'],
    [
      '04',
      'Clear communication',
      'Document methods, limitations, and results for technical and academic review.',
    ],
  ];
  return (
    <div className="capability-panel surface-card">
      <div className="capability-copy">
        <div className="section-kicker section-kicker-violet">How I work</div>
        <h2 className="capability-title">From question to working system.</h2>
        <p>
          My strongest thread is translating a research or data problem into a structured workflow
          that another person can inspect, reproduce, and extend.
        </p>
        <ul className="capability-list">
          {capabilities.map(([number, title, text]) => (
            <li key={number}>
              <Check size={14} />
              <span>
                <strong className="text-slate-200">{title}:</strong> {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="capability-matrix" aria-label="Capability areas">
        {[
          ['01', 'Research'],
          ['02', 'Modeling'],
          ['03', 'Engineering'],
          ['04', 'Evaluation'],
          ['05', 'Communication'],
          ['06', 'Iteration'],
        ].map(([number, label]) => (
          <div className="matrix-cell" key={number}>
            <span className="matrix-cell-number">{number}</span>
            <span className="matrix-cell-label">{label}</span>
            <span className="matrix-cell-bar" aria-hidden="true">
              <span />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
