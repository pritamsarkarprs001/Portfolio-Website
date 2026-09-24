import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, FileCode2, Heart, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { socials } from '../data/socials';
import { ProfileImage } from '../components/ProfileImage';
import { Timeline } from '../components/Timeline';
import { PageIntro } from '../components/PageIntro';
import { Seo } from '../components/Seo';
import { Reveal, SectionHeading, Tag } from '../components/ui';
import { CvDownloadButton } from '../components/CvDownloadButton';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Learn about Pritam Sarkar’s Computer Science background, research experience, software engineering practice, and technical interests."
      />
      <PageIntro
        kicker="About"
        title="A research foundation with an engineering bias."
        description="A detailed profile of Pritam Sarkar’s academic background, research practice, software projects, technical documentation, and areas of curiosity."
        action={
          <div className="flex flex-wrap gap-2">
            <CvDownloadButton variant="secondary" />
            <Link className="button button-ghost" to="/cv">
              View CV source <FileCode2 size={14} />
            </Link>
          </div>
        }
      />
      <section className="section">
        <div className="container-wide about-grid">
          <Reveal className="about-copy">
            <SectionHeading
              kicker="Profile / 01"
              title="From BRAC University to applied AI systems."
            />
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-7 flex flex-wrap gap-2">
              <Tag>Machine Learning</Tag>
              <Tag>Deep Learning</Tag>
              <Tag>Geospatial & Remote Sensing</Tag>
              <Tag>Multimodal Processing</Tag>
              <Tag>RAG</Tag>
              <Tag>Multi-Agent Systems</Tag>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
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
          </Reveal>
          <Reveal className="about-aside" delay={0.1}>
            <div className="surface-card avatar-card !min-h-[340px]">
              <ProfileImage size="12rem" sizes="240px" />
              <span className="avatar-caption">{profile.location}</span>
            </div>
            <div className="formal-portrait-card surface-card mt-3">
              <ProfileImage variant="secondary" className="formal-portrait-image" sizes="96px" />
              <div>
                <span className="section-kicker">Alternate portrait</span>
                <p>Formal academic and professional profile view.</p>
              </div>
            </div>
            <div className="surface-card mt-3 p-5">
              <div className="section-kicker">Professional context</div>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-300">
                <MapPin size={15} className="mt-0.5 text-cyan-300" /> {profile.location}
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-400">{profile.availabilityNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-compact">
        <div className="container-wide">
          <SectionHeading
            kicker="Trajectory / 02"
            title="Research and academic record."
            description="The same structured timeline used on the home page, with work, research, and education kept distinct."
          />
          <Timeline items={experiences} kind="experience" />
          <div className="mt-9">
            <Timeline items={education} kind="education" />
          </div>
        </div>
      </section>
      <section className="section section-compact">
        <div className="container-reading">
          <SectionHeading
            kicker="Beyond the work / 03"
            title="Interests & ways of thinking."
            description="A few of the interests listed in the CV source."
          />
          <div className="surface-card p-6">
            <div className="flex items-start gap-3">
              <Heart size={18} className="mt-1 shrink-0 text-violet-300" />
              <p className="text-sm leading-7 text-slate-300">{profile.interests}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>Vocal performance</Tag>
            <Tag>Literary & academic reading</Tag>
            <Tag>Technology & science literature</Tag>
            <Tag>International series</Tag>
            <Tag>Cinema</Tag>
            <Tag>Narrative storytelling</Tag>
            <Tag>Cross-cultural perspectives</Tag>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-reading">
          <div className="surface-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="section-kicker">Keep exploring</div>
              <h2 className="mt-3 text-xl">The work has more layers.</h2>
              <p className="mt-2 text-xs text-slate-500">
                Inspect the project index, scholarly record, or the plain-text CV source.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className="button button-primary" to="/projects">
                <Sparkles size={14} /> Projects
              </Link>
              <Link className="button button-ghost" to="/research">
                <BookOpen size={14} /> Research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
