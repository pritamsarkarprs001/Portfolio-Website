import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('exposes accessible required-field errors before submission', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /open email draft|send message/i }));
    expect(screen.getByText('Please add your name.')).toBeInTheDocument();
    expect(screen.getByText('Please add your email address.')).toBeInTheDocument();
    expect(screen.getByText('Please add a subject.')).toBeInTheDocument();
    expect(screen.getByText('Please add a short message.')).toBeInTheDocument();
  });

  it('labels every visible field and keeps the honeypot out of the tab order', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('id', 'contact-name');
    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'contact-email');
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/subject/i)).toHaveAttribute('id', 'contact-subject');
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('id', 'contact-message');
    expect(screen.getByLabelText(/message/i)).toBeRequired();
    expect(screen.getByLabelText('Website')).toHaveAttribute('tabindex', '-1');
  });
});
