import { useState } from 'react';
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, MapPin, BookOpen } from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { copyText } from '../lib/utils';
import { useToast } from '../hooks/useToast';
import { ContactForm } from '../components/ContactForm';
import { PageIntro } from '../components/PageIntro';
import { Seo } from '../components/Seo';
import { SectionKicker, Tag } from '../components/ui';

export default function ContactPage() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await copyText(profile.email);
      setCopied(true);
      showToast('Email address copied', 'success');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast('Could not copy the email address.', 'info');
    }
  };
  return (
    <>
      <Seo
        title="Contact"
        description="Contact Pritam Sarkar about machine learning engineering, AI research, data science, software development, or academic collaboration opportunities."
      />
      <PageIntro
        kicker="Contact"
        title="A clear question is a good place to start."
        description="Whether the context is a role, a research problem, a collaboration, or a thoughtful hello, the contact form keeps the first step simple."
        action={
          <div className="flex flex-wrap gap-2">
            <Tag>Open to opportunities</Tag>
            <Tag>Dhaka, Bangladesh</Tag>
          </div>
        }
      />
      <section className="section">
        <div className="container-wide">
          <div className="surface-card contact-panel">
            <div className="contact-copy">
              <SectionKicker tone="mint">Direct channels</SectionKicker>
              <h2 className="contact-title">Choose the route that works for you.</h2>
              <p>
                Use the form for a structured first message, or reach out through a public profile.
                No contact data is sent to a third party unless you configure an optional form
                endpoint.
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
                  onClick={() => void copy()}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}{' '}
                  {copied ? 'Email copied' : 'Copy email address'}
                </button>
              </div>
              <div className="mt-7 grid gap-2">
                {socials.map((social) => (
                  <a
                    className="contact-detail"
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon === 'linkedin' ? (
                      <Linkedin size={15} />
                    ) : social.icon === 'github' ? (
                      <Github size={15} />
                    ) : (
                      <BookOpen size={15} />
                    )}{' '}
                    {social.label} <ExternalLink size={12} className="ml-auto" />
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="surface-card mt-5 p-5">
            <div className="section-kicker section-kicker-violet">Form configuration</div>
            <p className="mt-3 text-xs leading-6 text-slate-400">
              The default form uses a mailto draft, so no backend is required. To use a free hosted
              endpoint later, set{' '}
              <code className="font-mono text-cyan-300">VITE_CONTACT_FORM_ENDPOINT</code> in your
              deployment environment. Formspree, Web3Forms, Netlify Forms, or another free service
              can be used without committing credentials.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
