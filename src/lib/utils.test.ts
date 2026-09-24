import { describe, expect, it } from 'vitest';
import { createCitation } from './utils';
import { publications } from '../data/publications';
import { cvSource, cvSourceAvailable } from '../data/cvSource';
import { certifications } from '../data/certifications';
import { conferences } from '../data/conferences';
import { projects } from '../data/projects';

describe('portfolio data contracts', () => {
  it('keeps the supplied project and research counts stable', () => {
    expect(projects).toHaveLength(5);
    expect(publications).toHaveLength(4);
    expect(conferences).toHaveLength(4);
    expect(certifications).toHaveLength(8);
  });

  it('generates a citation with supplied bibliographic fields', () => {
    const citation = createCitation(publications[0]);
    expect(citation).toContain('@misc{pritam-2026-');
    expect(citation).toContain('author = {P. Sarkar and');
    expect(citation).toContain(publications[0].title);
  });

  it('normalizes DOI values and creates unique BibTeX keys', () => {
    const first = createCitation(publications[1]);
    const second = createCitation(publications[3]);
    expect(first).toContain('doi = {10.1007/978-3-032-15764-5_36}');
    expect(first).not.toBe(second);
    expect(first).toContain('author = {P. Sarkar and T. Paul}');
  });

  it('stores the LaTeX source as available plain text without an executable script payload', () => {
    expect(cvSourceAvailable).toBe(true);
    expect(cvSource).toContain('\\documentclass');
    expect(cvSource).toContain('Pritam Sarkar');
    expect(cvSource).not.toContain('<script');
  });
});
