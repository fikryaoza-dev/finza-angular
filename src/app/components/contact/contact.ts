import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
})
export class ContactComponent {
  email = signal('');
  message = signal('');
  status = signal<'idle' | 'sending' | 'success'>('idle');
  showToast = signal(false);

  isEmailValid = computed(() => this.email().includes('@') && this.email().includes('.'));
  isFormValid = computed(() => this.isEmailValid() && this.message().length > 5);

  sendEmail() {
    this.status.set('sending');

    // Simulate API delay
    setTimeout(() => {
      this.status.set('success');
      this.showToast.set(true);

      // Reset form
      this.email.set('');
      this.message.set('');

      // Hide toast after 3 seconds
      setTimeout(() => this.showToast.set(false), 3000);
      this.status.set('idle');
    }, 1500);
  }
}
