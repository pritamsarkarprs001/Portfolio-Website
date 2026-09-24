export type ProjectCategory =
  | 'Machine Learning'
  | 'Computer Vision'
  | 'NLP'
  | 'Multimodal AI'
  | 'Generative AI'
  | 'MLOps'
  | 'Full-Stack'
  | 'Human-Computer Interaction'
  | 'Data Science';

export type PublicationType = 'Undergraduate Thesis' | 'Conference Paper' | 'Research Presentation';

export type ExternalLink = {
  label: string;
  href: string;
  kind?: 'github' | 'demo' | 'report' | 'doi' | 'publisher' | 'repository' | 'external';
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  categories: ProjectCategory[];
  featured: boolean;
  year?: string;
  status: string;
  links: ExternalLink[];
  visual: 'agents' | 'recruiter' | 'vision' | 'gesture' | 'audio';
  features: string[];
  process: string[];
  challenges: string[];
  decisions: string[];
  results: string;
  lessons: string[];
  future: string[];
};

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  presentationDate?: string;
  type: PublicationType;
  area: string;
  doi?: string;
  repository?: string;
  publisher?: string;
  abstract: string;
  keywords: string[];
  links: ExternalLink[];
};

export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'work' | 'research';
  summary: string;
  details: string[];
};

export type Education = {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  location: string;
  detail: string;
  grade?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  note?: string;
};

export type ConferencePresentation = {
  id: string;
  title: string;
  topic: string;
  conference: string;
  date: string;
  location: string;
  certificateUrl?: string;
  status: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  skills: string[];
};

export type ResearchFocus = {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  accent: 'cyan' | 'violet' | 'mint' | 'blue';
};

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
  icon: string;
};
