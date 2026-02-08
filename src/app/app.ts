import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './services/project';
import { Navbar } from './components/navbar/navbar';
import { ContactComponent } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Navbar, ContactComponent], // Required for @for block
  templateUrl: './app.html',
})
export class AppComponent {
  // Inject the service
  private projectService = inject(ProjectService);

  // Expose signals to the template
  filteredProjects = this.projectService.filteredProjects;
  categories = this.projectService.categories;
  selectedCategory = this.projectService.selectedCategory;

  setFilter(category: string) {
    this.projectService.selectedCategory.set(category);
  }
}
