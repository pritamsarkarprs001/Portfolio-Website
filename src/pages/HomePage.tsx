import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Presentation,
  Sparkles,
} from 'lucide-react';
import { profile, supportedStats } from '../data/profile';
import { socials } from '../data/socials';
import { featuredProjects } from '../data/projects';
import { publications } from '../data/publications';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { certifications } from '../data/certifications';
import { conferences } from '../data/conferences';
import { researchFocus } from '../data/skills';
import { languages } from '../data/languages';
import { useReducedMotionPreference } from '../hooks/useReducedMotion';
import { useToast } from '../hooks/useToast';
import { copyText } from '../lib/utils';
import { Icon } from '../lib/icons';
import { PhotoExperience } from '../components/PhotoExperience';
import { NeuralField } from '../components/NeuralField';
import { ProfileImage } from '../components/ProfileImage';
import { FocusCard } from '../components/FocusCard';
import { ProjectCard } from '../components/ProjectCard';
import { PublicationCard } from '../components/PublicationCard';
import { Timeline } from '../components/Timeline';
import { SkillMatrix, CapabilityPanel } from '../components/SkillMatrix';
import { ContactForm } from '../components/ContactForm';
import { CvDownloadButton } from '../components/CvDownloadButton';
import { Reveal, SectionHeading, SectionKicker, Tag } from '../components/ui';
import { Seo, ScholarlySeo } from '../components/Seo';

const rotatingRoles = [
  'Machine Learning Engineer',
  'AI Researcher',
  'Data Scientist',
  'Computer Science Graduate',
];

function Hero() {
  const reduceMotion = useReducedMotionPreference();
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % rotatingRoles.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="hero">
      <div className="container-wide hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" /> {profile.availability}
          </div>
          <h1 className="hero-title">
            Pritam
            <br />
            <span className="gradient-text">Sarkar.</span>
          </h1>
          <div className="hero-role" aria-label="Professional roles">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={rotatingRoles[roleIndex]}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -5 }}
                transition={{ duration: 0.25 }}
              >
                {rotatingRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="hero-lede">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects <ArrowRight size={15} />
            </a>
            <a className="button button-secondary" href="#research">
              Explore research <BookOpen size={15} />
            </a>
            <CvDownloadButton variant="ghost" />
            <a className="button button-ghost" href="#contact">
              Contact me <MessageCircle size={15} />
            </a>
          </div>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <MapPin size={13} /> {profile.location}
            </span>
            <span className="hero-meta-item">
              <Sparkles size={13} /> Research → engineering
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                className="icon-button !h-8 !w-8"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${social.label} profile`}
              >
                {social.icon === 'linkedin' ? (
                  <Linkedin size={14} />
                ) : social.icon === 'github' ? (
                  <Github size={14} />
                ) : (
                  <Icon name={social.icon === 'scholar' ? 'book' : 'orcid'} size={14} />
                )}
              </a>
            ))}
            <a
              className="icon-button !h-8 !w-8"
              href={`mailto:${profile.email}`}
              aria-label="Email Pritam Sarkar"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-network-underlay" aria-hidden="true">
            <NeuralField />
          </div>
          <PhotoExperience />
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <div className="stat-grid">
      {supportedStats.map((stat) => (
        <div className="surface-card stat-card" key={stat.label}>
          <div className="stat-value">{String(stat.value).padStart(2, '0')}</div>
          <div className="stat-label">{stat.label}</div>
          <span className="stat-detail">{stat.detail}</span>
        </div>
      ))}
    </div>
  );
}

function CertificationCard({ certification }: { certification: (typeof certifications)[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="surface-card surface-card-hover cert-card">
      <div className="cert-top">
        <Award className="cert-icon" size={18} />
        <span className="cert-date">{certification.date}</span>
      </div>
      <h3 className="cert-title">{certification.title}</h3>
      <div className="cert-issuer">{certification.issuer}</div>
      {expanded ? (
        <div className="mt-4 border-t border-slate-700/50 pt-3 text-[10px] leading-5 text-slate-400">
          {certification.credentialId ? (
            <p className="font-mono">Credential: {certification.credentialId}</p>
          ) : null}
          {certification.note ? (
            <p className="mt-1">{certification.note}</p>
          ) : (
            <p className="mt-1">
              Credential details are not otherwise listed in the supplied CV source.
            </p>
          )}
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <button
          className="small-button"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details' : 'View details'}
        </button>
        {certification.verificationUrl ? (
          <a
            className="small-button"
            href={certification.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify <ArrowUpRight size={11} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function HomePage() {
  const { showToast } = useToast();
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'experience' | 'education'>('all');
  const copyEmail = async () => {
    try {
      await copyText(profile.email);
      showToast('Email address copied', 'success');
    } catch {
      showToast('Could not copy the email address.', 'info');
    }
  };
  return (
    <>
      <Seo
        title="AI Researcher & Machine Learning Engineer"
        description="Portfolio of Pritam Sarkar, a BRAC University Computer Science graduate working across machine learning, computer vision, geospatial research, multimodal AI, and data systems."
      />
      <ScholarlySeo />
      <Hero />
      <div>
        <section className="section" id="about">
          <div className="container-wide about-grid">
            <Reveal className="about-copy">
              <SectionHeading
                kicker="About / 01"
                title="Research-minded. Engineering-focused."
                description="A Computer Science foundation translated into research, data workflows, and working software."
              />
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="mt-7 flex flex-wrap gap-2">
                <Tag>BRAC University</Tag>
                <Tag>Computer Science</Tag>
                <Tag>Published researcher</Tag>
                <Tag>Technical documentation</Tag>
              </div>
              <Link className="button button-secondary mt-8" to="/about">
                Read full profile <ArrowUpRight size={15} />
              </Link>
            </Reveal>
            <Reveal className="about-aside" delay={0.1}>
              <div className="surface-card avatar-card">
                <ProfileImage size="8rem" sizes="160px" />
                <span className="avatar-caption">replaceable profile asset · PS fallback</span>
              </div>
              <StatStrip />
              <div className="surface-card mt-3 p-4">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <BriefcaseBusiness size={14} className="text-cyan-300" /> Current context
                </div>
                <p className="mt-2 text-[11px] leading-5 text-slate-400">{profile.currentWork}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-compact" id="research">
          <div className="container-wide">
            <SectionHeading
              kicker="Research focus / 02"
              title="Questions worth modeling."
              description="A map of the areas connected by the thesis, publications, projects, and technical toolkit."
              action={
                <Link className="button button-text" to="/research">
                  Research index <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="focus-grid">
              {researchFocus.map((focus) => (
                <FocusCard key={focus.title} focus={focus} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container-wide">
            <SectionHeading
              kicker="Selected work / 03"
              title="Projects with a point of view."
              description="Applied systems that connect research ideas to usable interfaces, pipelines, and deployment choices."
              action={
                <Link className="button button-secondary" to="/projects">
                  Browse all projects <ArrowUpRight size={14} />
                </Link>
              }
            />
            <div className="project-grid">
              {featuredProjects.slice(0, 3).map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} featured />
                </Reveal>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="surface-card flex items-start gap-3 p-4">
                <Sparkles className="mt-0.5 shrink-0 text-violet-300" size={17} />
                <p className="text-xs leading-6 text-slate-400">
                  The remaining selected work covers local recruitment automation, agricultural
                  computer vision, and multimodal audio–lyrics clustering. Each case study separates
                  supplied facts from editable future notes.
                </p>
              </div>
              <Link className="button button-ghost" to="/projects">
                See the full project index <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="publications">
          <div className="container-wide">
            <SectionHeading
              kicker="Research output / 04"
              title="Publications & scholarly work."
              description="Research entries from the supplied CV source, with links and citation tools kept close to the record."
              action={
                <Link className="button button-secondary" to="/research">
                  All research <ArrowUpRight size={14} />
                </Link>
              }
            />
            <div className="publication-list">
              {publications.slice(0, 3).map((publication, index) => (
                <Reveal key={publication.slug}>
                  <PublicationCard publication={publication} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container-wide">
            <SectionHeading
              kicker="Trajectory / 05"
              title="Experience & education."
              description="Professional practice, independent research, and academic milestones in one timeline."
            />
            <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter timeline">
              {(['all', 'experience', 'education'] as const).map((filter) => (
                <button
                  key={filter}
                  className={`tag-button ${timelineFilter === filter ? 'tag-active' : ''}`}
                  type="button"
                  onClick={() => setTimelineFilter(filter)}
                  aria-pressed={timelineFilter === filter}
                >
                  <span className="tag">
                    {filter === 'all'
                      ? 'All milestones'
                      : filter === 'experience'
                        ? 'Experience'
                        : 'Education'}
                  </span>
                </button>
              ))}
            </div>
            {timelineFilter !== 'education' ? (
              <Timeline items={experiences} kind="experience" />
            ) : null}
            {timelineFilter !== 'experience' ? (
              <div className="mt-8">
                <Timeline items={education} kind="education" />
              </div>
            ) : null}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container-wide">
            <SectionHeading
              kicker="Toolkit / 06"
              title="Skills as a connected system."
              description="A qualitative map of areas of experience, not an objective proficiency score. Expand a group to inspect the extracted toolkit."
            />
            <SkillMatrix />
            <div className="mt-5">
              <CapabilityPanel />
            </div>
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="container-wide">
            <SectionHeading
              kicker="Credentials / 07"
              title="Certifications & learning."
              description="Formal learning entries from the CV source, with verification links where supplied."
            />
            <div className="cert-grid">
              {certifications.map((certification) => (
                <CertificationCard key={certification.title} certification={certification} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="presentations">
          <div className="container-wide">
            <SectionHeading
              kicker="In the room / 08"
              title="Conference presentations."
              description="Research topics shared at IEEE RAAICON, IEEE COMPAS, and BIM conference venues."
            />
            <div className="conference-list">
              {conferences.map((conference) => (
                <article
                  className="surface-card surface-card-hover conference-card"
                  key={conference.id}
                >
                  <div className="conference-header">
                    <span className="conference-name">{conference.conference}</span>
                    <span className="presentation-badge">Presented</span>
                  </div>
                  <h3 className="conference-title">{conference.title}</h3>
                  <p className="conference-topic">{conference.topic}</p>
                  <div className="conference-meta">
                    <span>
                      <Presentation size={11} /> {conference.date}
                    </span>
                    <span>
                      <MapPin size={11} /> {conference.location}
                    </span>
                  </div>
                  {conference.certificateUrl ? (
                    <a
                      className="small-button mt-4"
                      href={conference.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View certificate <ArrowUpRight size={11} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-compact" id="languages">
          <div className="container-wide">
            <SectionHeading
              kicker="Languages / 09"
              title="Communication across contexts."
              description={profile.languagesIntro}
            />
            <div className="languages-grid">
              {languages.map((language) => (
                <article className="surface-card language-card" key={language.name}>
                  <div className="language-name">{language.name}</div>
                  <div className="language-level">{language.level}</div>
                  <div className={`language-bar ${language.className}`} aria-hidden="true">
                    <span />
                  </div>
                </article>
              ))}
            </div>
            <p className="language-disclaimer">
              Bar lengths communicate the CV’s qualitative language labels only; they are not
              proficiency percentages.
            </p>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container-wide">
            <div className="surface-card contact-panel">
              <div className="contact-copy">
                <SectionKicker tone="mint">Contact / 10</SectionKicker>
                <h2 className="contact-title">Let’s compare notes.</h2>
                <p>
                  Have a research question, engineering role, collaboration idea, or opportunity
                  that fits the work? I’m open to thoughtful conversations.
                </p>
                <div className="contact-details">
                  <a className="contact-detail" href={`mailto:${profile.email}`}>
                    <Mail size={15} /> {profile.email}
                  </a>
                  <span className="contact-detail">
                    <MapPin size={15} /> {profile.location}
                  </span>
                  <button
                    className="contact-detail w-fit text-left"
                    type="button"
                    onClick={() => void copyEmail()}
                  >
                    <Copy size={15} /> Copy email address
                  </button>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      className="tag"
                      href={social.href}
                      key={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label} <ArrowUpRight size={10} />
                    </a>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
