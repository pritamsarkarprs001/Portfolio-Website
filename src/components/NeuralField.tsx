import { useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Network, Sparkles } from 'lucide-react';

const nodes = [
  { x: 8, y: 52, r: 4, tone: 'cyan' },
  { x: 24, y: 25, r: 3, tone: 'violet' },
  { x: 27, y: 76, r: 5, tone: 'mint' },
  { x: 48, y: 43, r: 4, tone: 'cyan' },
  { x: 51, y: 13, r: 3, tone: 'violet' },
  { x: 57, y: 70, r: 4, tone: 'cyan' },
  { x: 76, y: 28, r: 5, tone: 'mint' },
  { x: 83, y: 62, r: 3, tone: 'violet' },
  { x: 94, y: 42, r: 4, tone: 'cyan' },
];
const edges = [
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 5],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 6],
  [5, 7],
  [5, 8],
  [6, 7],
  [6, 8],
  [7, 8],
];

export function NeuralField() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    });
  };
  return (
    <div
      className="neural-card"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="neural-header">
        <span>latent-space / live field</span>
        <span>connected</span>
      </div>
      <svg
        className="neural-svg"
        viewBox="0 0 100 100"
        role="img"
        aria-label="Abstract animated neural network illustration"
      >
        <defs>
          <linearGradient id="neural-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cyan)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
          <filter id="neural-glow">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g opacity=".45">
          <path
            d="M8 52 24 25 48 43 27 76ZM24 25 57 70 48 43 76 28 83 62 57 70M48 43 83 62 94 42"
            fill="none"
            stroke="url(#neural-gradient)"
            strokeWidth=".25"
          />
          {edges.map(([from, to], index) => (
            <motion.line
              key={`${from}-${to}`}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke={index % 3 === 0 ? 'var(--violet)' : 'var(--cyan)'}
              strokeWidth=".28"
              strokeOpacity=".65"
              animate={{ strokeOpacity: [0.2, 0.85, 0.2] }}
              transition={{
                duration: 3.8 + (index % 4) * 0.45,
                repeat: Infinity,
                delay: index * 0.12,
              }}
            />
          ))}
        </g>
        {nodes.map((node, index) => {
          const dx = pointer.x * (index % 3 === 0 ? 3 : 1.4);
          const dy = pointer.y * (index % 3 === 0 ? 3 : 1.4);
          return (
            <motion.g
              key={`${node.x}-${node.y}`}
              animate={{ x: dx, y: dy }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 2.2}
                fill={
                  node.tone === 'cyan'
                    ? 'var(--cyan)'
                    : node.tone === 'violet'
                      ? 'var(--violet)'
                      : 'var(--mint)'
                }
                opacity=".12"
                filter="url(#neural-glow)"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="var(--bg-deep)"
                stroke={
                  node.tone === 'cyan'
                    ? 'var(--cyan)'
                    : node.tone === 'violet'
                      ? 'var(--violet)'
                      : 'var(--mint)'
                }
                strokeWidth=".7"
              />
              <circle
                cx={node.x - 0.6}
                cy={node.y - 0.6}
                r={node.r * 0.3}
                fill="var(--text-strong)"
              />
            </motion.g>
          );
        })}
        <motion.g
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <circle
            cx="48"
            cy="43"
            r="12"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth=".35"
            strokeDasharray="1 3"
          />
          <circle
            cx="48"
            cy="43"
            r="18"
            fill="none"
            stroke="var(--violet)"
            strokeWidth=".25"
            strokeDasharray="1 5"
          />
        </motion.g>
      </svg>
      <div className="neural-footer">
        <span className="neural-legend">
          <i /> signal path
        </span>
        <span className="neural-legend">
          <i className="violet" /> representation
        </span>
        <span className="neural-legend">
          <i className="mint" /> output
        </span>
      </div>
      <div className="hero-floating hero-floating-a">
        <Cpu size={15} />
        <span>
          <strong>model / context</strong>
          <small>reasoning layer</small>
        </span>
      </div>
      <div className="hero-floating hero-floating-b">
        <Database size={15} />
        <span>
          <strong>evidence / action</strong>
          <small>grounded workflow</small>
        </span>
      </div>
    </div>
  );
}

export function MiniNeuralGlyph() {
  return <Network size={16} aria-hidden="true" />;
}

export function SparkleGlyph() {
  return <Sparkles size={16} aria-hidden="true" />;
}
