import { describe, expect, it } from 'vitest';
import { filterProjects } from './filters';
import { projects } from '../data/projects';

describe('filterProjects', () => {
  it('returns every project for the default state', () => {
    expect(filterProjects(projects, '', 'All')).toHaveLength(projects.length);
  });

  it('matches title, category, and technology terms case-insensitively', () => {
    expect(filterProjects(projects, 'agri-scan', 'All').map((project) => project.slug)).toEqual([
      'agri-scan-ai',
    ]);
    expect(filterProjects(projects, 'chromadb', 'All').map((project) => project.slug)).toEqual([
      'deep-research-ai',
      'autorecruiter',
    ]);
    expect(
      filterProjects(projects, 'touchless', 'Human-Computer Interaction').map(
        (project) => project.slug,
      ),
    ).toEqual(['air-touch-control-system']);
  });

  it('combines category and search filters', () => {
    const result = filterProjects(projects, 'opencv', 'Computer Vision');
    expect(result.map((project) => project.slug)).toEqual(['air-touch-control-system']);
    expect(result.every((project) => project.categories.includes('Computer Vision'))).toBe(true);
  });

  it('returns an empty list for a missing term', () => {
    expect(filterProjects(projects, 'not-a-project', 'All')).toEqual([]);
  });
});
