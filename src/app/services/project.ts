import { Injectable, signal, computed } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsState = signal<Project[]>([
    {
      id: 1,
      title: 'Nexus AI',
      description:
        'A deep-learning dashboard using Angular Signals for real-time inference monitoring.',
      technologies: ['Angular', 'Python', 'AI'],
      imageUrl: 'https://placehold.co/600x400/282a36/bd93f9?text=Nexus+AI',
      link: '#',
    },
    {
      id: 2,
      title: 'Dracula Shop',
      description:
        'High-performance e-commerce storefront with a focus on core web vitals and SSR.',
      technologies: ['Web', 'Tailwind', 'SSR'],
      imageUrl: 'https://placehold.co/600x400/282a36/ff79c6?text=E-commerce',
      link: '#',
    },
    {
      id: 3,
      title: 'Signal Flow',
      description: 'A visual state management tool designed for modern Angular developers.',
      technologies: ['Angular', 'TypeScript'],
      imageUrl: 'https://placehold.co/600x400/282a36/8be9fd?text=Signal+Flow',
      link: '#',
    },
  ]);

  // 1. The filter state
  selectedCategory = signal<string>('All');

  // 2. The filtered list (Derived State)
  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.projectsState();

    if (category === 'All') return projects;

    return projects.filter((p) =>
      p.technologies.some((tech) => tech.toLowerCase() === category.toLowerCase()),
    );
  });

  // 3. Helper to get unique categories for the UI
  categories = computed(() => {
    const allTech = this.projectsState().flatMap((p) => p.technologies);
    return ['All', ...new Set(allTech)];
  });
}
