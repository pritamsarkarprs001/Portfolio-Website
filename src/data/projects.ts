import type { Project } from '../types';

export const projectCategories = [
  'All',
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'Multimodal AI',
  'Generative AI',
  'MLOps',
  'Full-Stack',
  'Human-Computer Interaction',
  'Data Science',
] as const;

export type ProjectFilter = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    slug: 'deep-research-ai',
    name: 'DeepResearch AI',
    eyebrow: 'Multi-agent systems · RAG · LLM tool use',
    summary:
      'A full-stack AI research assistant using a four-agent pipeline—Planner, Researcher, Critic, and Synthesizer—to turn research questions and source context into cited reports.',
    problem:
      'A useful research assistant needs to separate planning, evidence gathering, critique, and synthesis while preserving source context for the final report.',
    solution:
      'LangGraph orchestrates the four-agent pipeline. RAG with ChromaDB and Sentence Transformers retrieves context from uploaded PDFs and the web through Wikipedia and DuckDuckGo. The system self-critiques findings and generates a cited report with PDF download using Groq Llama 3.1 and Streamlit.',
    technologies: [
      'Python',
      'Multi-Agent Systems',
      'LangGraph',
      'RAG',
      'ChromaDB',
      'Sentence Transformers',
      'LLM Tool Use',
      'Wikipedia',
      'DuckDuckGo',
      'Groq Llama 3.1',
      'Streamlit',
    ],
    categories: ['Machine Learning', 'NLP', 'Generative AI', 'Full-Stack'],
    featured: true,
    status: 'Documented in CV',
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/pritamsarkarprs001/-DeepResearch-AI',
        kind: 'github',
      },
    ],
    visual: 'agents',
    features: [
      'Four-agent Planner → Researcher → Critic → Synthesizer workflow',
      'Uploaded PDF context through RAG',
      'Live web research through Wikipedia and DuckDuckGo',
      'Self-critique before synthesis',
      'Cited report and one-click PDF download',
      'Streamlit Cloud interface with local usability',
    ],
    process: [
      'Define a research topic and decompose it into agent responsibilities.',
      'Retrieve uploaded document and web context.',
      'Critique the gathered findings.',
      'Synthesize a written report with citations and PDF export.',
    ],
    challenges: [
      'Connecting uploaded PDF context to the live web evidence path.',
      'Keeping a critique stage attached to the source trail and final synthesis.',
    ],
    decisions: [
      'Use LangGraph to make the multi-agent state machine explicit.',
      'Use ChromaDB and Sentence Transformers for retrieval-oriented context.',
      'Use free tools including Groq Llama 3.1 and Streamlit for the documented stack.',
    ],
    results:
      'The CV documents the functional system and its cited-report workflow. It does not provide accuracy, latency, usage, or user metrics.',
    lessons: [
      'A research assistant is a product of information retrieval, orchestration, and interface design.',
      'Explicit agent roles make a generative workflow easier to inspect and revise.',
    ],
    future: [
      'Add a real architecture diagram or screenshot when available.',
      'Add project-specific evaluation criteria if evidence becomes available.',
    ],
  },
  {
    slug: 'autorecruiter',
    name: 'AutoRecruiter — Local AI Recruitment Automation Agent',
    eyebrow: 'Local LLM · OCR · semantic search',
    summary:
      'A fully local recruitment automation platform that parses varied resume formats, ranks applicants, and generates customized interview questions.',
    problem:
      'Recruiting workflows need structured candidate information from PDF, DOCX, and scanned-image resumes while keeping the workflow local and searchable.',
    solution:
      'OCR and local LLMs extract structured information. Semantic similarity, skills matching, and AI-based evaluation rank applicants. The platform generates customized interview questions and stores profiles in ChromaDB, with Python, Streamlit, Ollama, and Tesseract OCR.',
    technologies: [
      'Python',
      'OCR',
      'Tesseract OCR',
      'Local LLMs (Ollama)',
      'ChromaDB',
      'Semantic Search',
      'Streamlit',
    ],
    categories: ['Machine Learning', 'NLP', 'Full-Stack', 'Data Science'],
    featured: true,
    status: 'Documented in CV',
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/pritamsarkarprs001/Auto-Recruiter',
        kind: 'github',
      },
    ],
    visual: 'recruiter',
    features: [
      'PDF and DOCX resume parsing',
      'Scanned-image resume support through OCR',
      'Local LLM processing with Ollama',
      'Semantic similarity and skills matching',
      'AI-based applicant evaluation',
      'Customized interview question generation',
      'Searchable ChromaDB candidate profiles',
    ],
    process: [
      'Parse resumes and extract candidate information.',
      'Represent profiles for semantic comparison.',
      'Rank applicants through similarity, skills matching, and AI-based evaluation.',
      'Generate customized questions and store profiles in ChromaDB.',
    ],
    challenges: [
      'Supporting PDF, DOCX, and scanned-image inputs in one workflow.',
      'Keeping the documented local-first approach while supporting semantic retrieval.',
    ],
    decisions: [
      'Use Ollama for local LLM processing.',
      'Use ChromaDB as the searchable vector database.',
      'Combine semantic similarity with explicit skills matching.',
    ],
    results:
      'The CV documents the local recruitment platform and its processing capabilities. It does not provide applicant counts, ranking accuracy, or outcome metrics.',
    lessons: [
      'Resume parsing quality is a central product concern.',
      'A local-first architecture can make privacy-aware workflows easier to reason about.',
    ],
    future: [
      'Add a documented evaluation set if project evidence becomes available.',
      'Replace the abstract visual with a sanitized product screenshot when available.',
    ],
  },
  {
    slug: 'agri-scan-ai',
    name: 'Agri-Scan AI',
    eyebrow: 'Computer vision · agricultural diagnostics',
    summary:
      'An agricultural diagnostic web application detecting 22 crop disease phenotypes across Cashew, Cassava, Maize, and Tomato.',
    problem:
      'Agricultural image workflows need a diagnostic interface that can handle multiple crops and disease phenotypes while using an edge-friendly model runtime.',
    solution:
      'A fine-tuned EfficientNet-B0 architecture is optimized for edge deployment through ONNX. The pipeline uses CLAHE-based image normalization and aggressive geometric augmentation, exposed through a Streamlit Cloud interface.',
    technologies: [
      'Deep Learning',
      'Computer Vision',
      'EfficientNet-B0',
      'ONNX',
      'CLAHE',
      'Geometric augmentation',
      'Streamlit Cloud',
    ],
    categories: ['Machine Learning', 'Computer Vision', 'MLOps', 'Full-Stack'],
    featured: true,
    status: 'Documented in CV',
    links: [
      { label: 'GitHub repository', href: 'https://lnkd.in/dGxv5mt5', kind: 'github' },
      { label: 'Live demo', href: 'https://lnkd.in/dJgjMDhX', kind: 'demo' },
    ],
    visual: 'vision',
    features: [
      'Detection of 22 crop disease phenotypes',
      'Cashew, Cassava, Maize, and Tomato coverage',
      'Fine-tuned EfficientNet-B0 architecture',
      'ONNX edge runtime',
      'CLAHE-based image normalization',
      'Aggressive geometric augmentation',
      'Streamlit Cloud interface',
    ],
    process: [
      'Define the crop and phenotype scope.',
      'Apply image normalization and geometric augmentation.',
      'Run EfficientNet-B0 inference through ONNX.',
      'Expose the diagnostic workflow through Streamlit Cloud.',
    ],
    challenges: [
      'Supporting diverse field conditions in the image pipeline.',
      'Keeping the model and deployment format connected for an edge-friendly workflow.',
    ],
    decisions: [
      'Use EfficientNet-B0 as the documented architecture.',
      'Use ONNX for the documented edge deployment path.',
      'Use CLAHE normalization and geometric augmentation in preprocessing.',
    ],
    results:
      'The CV documents detection of 22 crop disease phenotypes across four crops. It does not provide accuracy, precision, recall, or field-study metrics.',
    lessons: [
      'A focused image task benefits from a clear preprocessing contract.',
      'Model architecture and deployment format are both engineering decisions.',
    ],
    future: [
      'Add a real product screenshot and model card.',
      'Document a held-out evaluation plan if project evidence becomes available.',
    ],
  },
  {
    slug: 'air-touch-control-system',
    name: 'Air Touch Control System',
    eyebrow: 'Computer vision · human–computer interaction',
    summary:
      'A real-time touchless desktop interaction system using OpenCV and MediaPipe’s 21-point hand tracking.',
    problem:
      'A vision-based desktop interface needs to translate noisy hand landmarks into responsive, predictable actions without camera jitter or click-looping.',
    solution:
      'An EMA filter with alpha 0.25 is used to eliminate camera jitter with sub-15ms latency. A state-machine-based drag-and-drop engine prevents click-looping, while a virtual joystick coordinate anchor supports scroll and zoom. The system supports precision cursor control, left/right click, continuous scroll, pinch-to-zoom, and PyInstaller packaging.',
    technologies: [
      'Python',
      'Computer Vision',
      'MediaPipe',
      'OpenCV',
      'EMA filtering',
      'State machine',
      'HCI',
      'PyInstaller',
    ],
    categories: ['Computer Vision', 'Human-Computer Interaction', 'Full-Stack'],
    featured: true,
    status: 'Documented in CV',
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/pritamsarkarprs001/air-touch-control-system',
        kind: 'github',
      },
    ],
    visual: 'gesture',
    features: [
      '21-point hand tracking with MediaPipe and OpenCV',
      'EMA filter with alpha 0.25',
      'Sub-15ms latency as documented in the CV',
      'State-machine drag and drop',
      'Virtual joystick scroll and zoom',
      'Precision cursor and left/right click',
      'Continuous scroll and pinch-to-zoom',
      'Standalone Windows executable via PyInstaller',
    ],
    process: [
      'Capture 21-point hand landmarks with MediaPipe.',
      'Smooth camera input with EMA filtering.',
      'Interpret gestures through a state machine.',
      'Package the interaction system as a Windows executable with PyInstaller.',
    ],
    challenges: [
      'Eliminating camera jitter while keeping interaction responsive.',
      'Preventing click-looping and defining stable gesture transitions.',
    ],
    decisions: [
      'Use the documented alpha 0.25 EMA filter.',
      'Use a state machine to separate interaction modes.',
      'Use a mid-air coordinate anchor for the virtual joystick.',
    ],
    results:
      'The CV documents the interaction features and sub-15ms latency. It does not provide a user study, accuracy study, or comparative benchmark.',
    lessons: [
      'Interaction reliability depends on state design as much as on the vision model.',
      'Packaging is an essential part of shipping a local vision application.',
    ],
    future: [
      'Add a real interaction demo recording when available.',
      'Expand calibration and accessibility documentation.',
    ],
  },
  {
    slug: 'audio-lyrics-clustering',
    name: 'Audio-Lyrics Clustering',
    eyebrow: 'Multimodal fusion · unsupervised learning',
    summary:
      'A deep learning pipeline that clusters music tracks by fusing audio spectrograms with lyrics embeddings.',
    problem:
      'Music tracks contain information in both audio and lyrics; clustering only one modality would leave complementary signals unused.',
    solution:
      'The pipeline extracts mel-spectrograms for audio and transformer-based encoders for lyric text, performs joint representation learning, and applies unsupervised clustering to combine the modalities.',
    technologies: [
      'Deep Learning',
      'Multimodal Fusion',
      'Python',
      'PyTorch / TensorFlow',
      'Mel-spectrograms',
      'Transformer-based encoders',
      'Unsupervised clustering',
    ],
    categories: ['Machine Learning', 'Multimodal AI', 'Data Science'],
    featured: true,
    status: 'Documented in CV',
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/Pritam-Sark/CSE425-Audio-Lyrics-Clustering',
        kind: 'github',
      },
      {
        label: 'Project report',
        href: 'https://drive.google.com/file/d/14J31Uf4gOnc8m37_-I5ODra8JDz4VHIy/view',
        kind: 'report',
      },
    ],
    visual: 'audio',
    features: [
      'Mel-spectrogram audio feature extraction',
      'Transformer-based lyric encoders',
      'Joint representation learning',
      'Unsupervised clustering of music tracks',
    ],
    process: [
      'Extract audio features with mel-spectrograms.',
      'Encode lyric text with transformer-based encoders.',
      'Learn a joint representation across modalities.',
      'Apply unsupervised clustering to the combined representation.',
    ],
    challenges: [
      'Keeping audio and lyric features in a meaningful shared space.',
      'Using an unsupervised workflow without inventing a ground-truth category system.',
    ],
    decisions: [
      'Represent audio in a spectrogram domain suited to the pipeline.',
      'Learn a joint representation before clustering instead of clustering only one modality.',
    ],
    results:
      'The CV documents the pipeline and technical approach. It does not provide clustering metrics, dataset size, or comparative results.',
    lessons: [
      'Multimodal systems benefit from a clear representation of what each modality contributes.',
      'Unsupervised results need careful interpretation and documented evaluation.',
    ],
    future: [
      'Add a cluster-inspection or confusion view if evaluation data is available.',
      'Replace the abstract visual with a notebook or result visualization.',
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
