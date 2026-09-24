import type { Project, ProjectCategory } from '../types';

export function filterProjects(
  projects: Project[],
  query: string,
  category: ProjectCategory | 'All',
) {
  const normalizedQuery = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.categories.includes(category);
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      project.name,
      project.summary,
      project.eyebrow,
      ...project.technologies,
      ...project.categories,
    ]
      .join(' ')
      .toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}
