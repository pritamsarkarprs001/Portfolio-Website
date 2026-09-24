import { motion } from 'framer-motion';
import type { Project } from '../types';

type ProjectVisualProps = { variant: Project['visual']; compact?: boolean };

const motionProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};

export function ProjectVisual({ variant, compact = false }: ProjectVisualProps) {
  if (variant === 'agents') return <AgentsVisual compact={compact} />;
  if (variant === 'recruiter') return <RecruiterVisual compact={compact} />;
  if (variant === 'vision') return <VisionVisual compact={compact} />;
  if (variant === 'gesture') return <GestureVisual compact={compact} />;
  return <AudioVisual compact={compact} />;
}

function AgentsVisual({ compact }: { compact: boolean }) {
  return (
    <svg
      className="project-visual"
      viewBox="0 0 520 210"
      role="img"
      aria-label="Diagram of four AI research agents"
      {...motionProps}
    >
      <path
        className="visual-line"
        d="M76 105h52m264 0h52M128 64l-38 30m302-30 38 30M128 146l-38-30m302 30 38-30"
      />
      <path className="visual-cyan" d="M76 105h52m192 0h52" strokeDasharray="4 5" />
      <g>
        <rect x="25" y="78" width="52" height="54" rx="8" className="visual-node" />
        <text x="39" y="101">
          INPUT
        </text>
        <text x="35" y="115">
          PDF / WEB
        </text>
      </g>
      <g>
        <rect x="128" y="38" width="68" height="42" rx="8" className="visual-node-violet" />
        <text x="143" y="62">
          PLANNER
        </text>
      </g>
      <g>
        <rect x="128" y="130" width="68" height="42" rx="8" className="visual-node" />
        <text x="142" y="154">
          RESEARCHER
        </text>
      </g>
      <g>
        <rect x="324" y="38" width="68" height="42" rx="8" className="visual-node-violet" />
        <text x="341" y="62">
          CRITIC
        </text>
      </g>
      <g>
        <rect x="324" y="130" width="68" height="42" rx="8" className="visual-node-mint" />
        <text x="340" y="154">
          SYNTHESIZER
        </text>
      </g>
      <g>
        <rect x="443" y="78" width="52" height="54" rx="8" className="visual-node-mint" />
        <text x="455" y="101">
          REPORT
        </text>
        <text x="452" y="115">
          CITED
        </text>
      </g>
      <motion.circle
        cx="212"
        cy="105"
        r="3"
        fill="var(--cyan)"
        animate={{ cx: [212, 300, 212], opacity: [0, 1, 0] }}
        transition={{ duration: 3.4, repeat: Infinity }}
      />
      {!compact && (
        <text x="207" y="201" className="visual-caption">
          PLAN → RETRIEVE → CRITIQUE → SYNTHESIZE
        </text>
      )}
    </svg>
  );
}

function RecruiterVisual({ compact }: { compact: boolean }) {
  return (
    <svg
      className="project-visual"
      viewBox="0 0 520 210"
      role="img"
      aria-label="Diagram of local resume recruitment workflow"
      {...motionProps}
    >
      <path
        className="visual-line"
        d="M98 58h54m-54 94h54m216-94h54M206 58c50 0 51 47 101 47m-101 47c50 0 51-47 101-47"
      />
      <g>
        <rect x="22" y="35" width="76" height="46" rx="8" className="visual-node" />
        <text x="42" y="56">
          RESUMES
        </text>
        <text x="35" y="69">
          PDF · DOCX · IMG
        </text>
      </g>
      <g>
        <rect x="22" y="129" width="76" height="46" rx="8" className="visual-node-violet" />
        <text x="38" y="150">
          OCR / LLM
        </text>
        <text x="30" y="163">
          LOCAL FIRST
        </text>
      </g>
      <g>
        <rect x="206" y="78" width="106" height="54" rx="10" className="visual-node-violet" />
        <text x="225" y="100">
          SEMANTIC RANK
        </text>
        <text x="219" y="115">
          SKILLS MATCH
        </text>
      </g>
      <g>
        <rect x="308" y="35" width="76" height="46" rx="8" className="visual-node" />
        <text x="327" y="56">
          VECTOR STORE
        </text>
        <text x="326" y="69">
          CHROMADB
        </text>
      </g>
      <g>
        <rect x="384" y="129" width="112" height="46" rx="8" className="visual-node-mint" />
        <text x="405" y="150">
          INTERVIEW
        </text>
        <text x="400" y="163">
          QUESTIONS
        </text>
      </g>
      <path className="visual-cyan" d="M312 58h18m-18 94h54" strokeDasharray="3 4" />
      {!compact && (
        <text x="195" y="201" className="visual-caption">
          PARSE → REPRESENT → MATCH → PREPARE
        </text>
      )}
    </svg>
  );
}

function VisionVisual({ compact }: { compact: boolean }) {
  return (
    <svg
      className="project-visual"
      viewBox="0 0 520 210"
      role="img"
      aria-label="Diagram of agricultural image classification workflow"
      {...motionProps}
    >
      <path className="visual-line" d="M112 105h48m200 0h48M248 65v80" />
      <g>
        <rect x="18" y="62" width="94" height="86" rx="9" className="visual-node" />
        <path
          d="M35 129c19-33 28-27 36-41 8 17 17 12 25 41"
          fill="none"
          stroke="var(--mint)"
          strokeWidth="2"
        />
        <circle cx="73" cy="88" r="9" fill="none" stroke="var(--mint)" strokeWidth="2" />
        <text x="37" y="48">
          CROP IMAGE
        </text>
      </g>
      <g>
        <rect x="160" y="75" width="88" height="60" rx="8" className="visual-node-violet" />
        <text x="181" y="101">
          EFFICIENTNET
        </text>
        <text x="174" y="116">
          B0 / ONNX
        </text>
      </g>
      <g>
        <rect x="360" y="62" width="132" height="86" rx="9" className="visual-node-mint" />
        <text x="389" y="90">
          22 PHENOTYPES
        </text>
        <text x="383" y="108">
          CASHEW · CASSAVA
        </text>
        <text x="398" y="121">
          MAIZE · TOMATO
        </text>
      </g>
      <motion.path
        className="visual-cyan"
        d="M112 105h48m200 0h48"
        strokeDasharray="5 6"
        animate={{ strokeDashoffset: [0, -22] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      {!compact && (
        <text x="181" y="201" className="visual-caption">
          IMAGE → NORMALIZE → INFERENCE → DIAGNOSTIC VIEW
        </text>
      )}
    </svg>
  );
}

function GestureVisual({ compact }: { compact: boolean }) {
  return (
    <svg
      className="project-visual"
      viewBox="0 0 520 210"
      role="img"
      aria-label="Diagram of hand tracking and desktop interaction"
      {...motionProps}
    >
      <path className="visual-line" d="M145 107h62m104 0h62M207 70v74m104-74v74" />
      <g>
        <rect x="20" y="61" width="125" height="93" rx="10" className="visual-node" />
        <path
          d="M78 130 65 103l-5-22m5 22 15-29m-15 29 25-14m-25 14 2 28m-2-28-22-16"
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="47" y="48">
          HAND LANDMARKS
        </text>
      </g>
      <g>
        <rect x="207" y="68" width="104" height="79" rx="9" className="visual-node-violet" />
        <text x="230" y="96">
          STATE MACHINE
        </text>
        <text x="221" y="112">
          EMA α 0.25
        </text>
        <text x="228" y="128">
          GESTURE → ACTION
        </text>
      </g>
      <g>
        <rect x="313" y="61" width="187" height="93" rx="10" className="visual-node-mint" />
        <text x="350" y="90">
          CURSOR · CLICK
        </text>
        <text x="342" y="108">
          SCROLL · ZOOM
        </text>
        <text x="340" y="126">
          DRAG & DROP
        </text>
      </g>
      {!compact && (
        <text x="191" y="201" className="visual-caption">
          TRACK → FILTER → INTERPRET → CONTROL
        </text>
      )}
    </svg>
  );
}

function AudioVisual({ compact }: { compact: boolean }) {
  return (
    <svg
      className="project-visual"
      viewBox="0 0 520 210"
      role="img"
      aria-label="Diagram of audio and lyrics multimodal clustering"
      {...motionProps}
    >
      <path className="visual-line" d="M142 66h70m-70 79h70m96-79h70m-70 79h70M248 66v79" />
      <g>
        <rect x="20" y="47" width="122" height="39" rx="8" className="visual-node" />
        <text x="44" y="71">
          MEL-SPECTROGRAM
        </text>
      </g>
      <g>
        <rect x="20" y="126" width="122" height="39" rx="8" className="visual-node-violet" />
        <text x="46" y="150">
          LYRIC EMBEDDINGS
        </text>
      </g>
      <g>
        <rect x="248" y="55" width="70" height="102" rx="10" className="visual-node-mint" />
        <text x="264" y="91">
          JOINT
        </text>
        <text x="263" y="106">
          REPRESENTATION
        </text>
      </g>
      <g>
        <rect x="382" y="67" width="118" height="39" rx="8" className="visual-node" />
        <text x="413" y="91">
          CLUSTER
        </text>
      </g>
      <g>
        <rect x="382" y="126" width="118" height="39" rx="8" className="visual-node-violet" />
        <text x="407" y="150">
          DISCOVERY
        </text>
      </g>
      <motion.path
        className="visual-cyan"
        d="M142 66h70m-70 79h70m96-79h70m-70 79h70"
        strokeDasharray="3 5"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      {!compact && (
        <text x="186" y="201" className="visual-caption">
          AUDIO + TEXT → EMBED → CLUSTER
        </text>
      )}
    </svg>
  );
}
