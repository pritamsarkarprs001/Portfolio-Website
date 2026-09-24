import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Mail, Send } from 'lucide-react';
import { profile } from '../data/profile';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'mailto';

const initialValues: FormValues = { name: '', email: '', subject: '', message: '', website: '' };

function validate(values: FormValues) {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please add your name.';
  if (!values.email.trim()) errors.email = 'Please add your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Please enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  if (!values.message.trim()) errors.message = 'Please add a short message.';
  else if (values.message.trim().length < 20) errors.message = 'Please add at least 20 characters.';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const endpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
    import.meta.env.VITE_CONTACT_ENDPOINT) as string | undefined;

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.website) return;
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const firstError = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => document.getElementById(`contact-${firstError}`)?.focus());
      return;
    }
    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry: ${values.subject}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }
    setStatus('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            id="contact-name"
            required
            aria-required="true"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            autoComplete="name"
          />
          {errors.name ? (
            <span id="contact-name-error" className="form-error" role="alert">
              {errors.name}
            </span>
          ) : null}
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="contact-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            id="contact-email"
            type="email"
            required
            aria-required="true"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            autoComplete="email"
          />
          {errors.email ? (
            <span id="contact-email-error" className="form-error" role="alert">
              {errors.email}
            </span>
          ) : null}
        </div>
        <div className="form-field form-field-full">
          <label className="form-label" htmlFor="contact-subject">
            Subject <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            id="contact-subject"
            required
            aria-required="true"
            value={values.subject}
            onChange={(event) => update('subject', event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          />
          {errors.subject ? (
            <span id="contact-subject-error" className="form-error" role="alert">
              {errors.subject}
            </span>
          ) : null}
        </div>
        <div className="form-field form-field-full">
          <label className="form-label" htmlFor="contact-message">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="contact-message"
            required
            aria-required="true"
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="Tell me a little about the opportunity, question, or collaboration."
          />
          {errors.message ? (
            <span id="contact-message-error" className="form-error" role="alert">
              {errors.message}
            </span>
          ) : null}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </div>
      </div>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <LoaderCircle size={15} className="animate-spin" />
          ) : (
            <Send size={15} />
          )}
          <span>
            {status === 'loading' ? 'Sending…' : endpoint ? 'Send message' : 'Open email draft'}
          </span>
        </button>
        <a className="button button-ghost" href={`mailto:${profile.email}`}>
          <Mail size={14} /> Copy-ready email
        </a>
      </div>
      {status === 'success' ? (
        <p className="form-status mt-4" role="status">
          <CheckCircle2 size={14} className="mr-1 inline" /> Message sent. I’ll get back to you when
          I can.
        </p>
      ) : null}
      {status === 'mailto' ? (
        <p className="form-status mt-4" role="status">
          <CheckCircle2 size={14} className="mr-1 inline" /> Your email client is opening with the
          message prepared.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="form-error mt-4" role="alert">
          <AlertCircle size={14} className="mr-1 inline" /> The endpoint could not be reached.
          Please email {profile.email} directly.
        </p>
      ) : null}
    </form>
  );
}
