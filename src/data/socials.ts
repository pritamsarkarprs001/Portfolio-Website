import type { SocialLink } from '../types';

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pritam-sarkar-5aba07212/',
    handle: 'pritam-sarkar-5aba07212',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/pritamsarkarprs001',
    handle: 'pritamsarkarprs001',
    icon: 'github',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=7gBgU5MAAAAJ&hl=en',
    handle: '7gBgU5MAAAAJ',
    icon: 'scholar',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0006-1297-4760',
    icon: 'orcid',
  },
];

export const contactLinks = {
  email: 'pritamsarkar.prs@gmail.com',
  ...socials,
};
