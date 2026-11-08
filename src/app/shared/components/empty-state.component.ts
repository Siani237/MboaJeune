import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon" *ngIf="icon">{{ icon }}</div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-message">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 3rem 1.5rem;
      background-color: var(--color-surface);
      border: 1px dashed var(--color-border-dark);
      border-radius: var(--radius-lg);
      margin: 1.5rem 0;
    }
    .empty-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }
    .empty-title {
      font-size: 1.25rem;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .empty-message {
      color: var(--color-text-muted);
      max-width: 500px;
      margin: 0 auto;
      font-size: 0.95rem;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon?: string = '📂';
  @Input({ required: true }) title: string = 'Aucun élément disponible';
  @Input({ required: true }) message: string = 'Aucun contenu ne correspond à vos critères pour le moment.';
}
