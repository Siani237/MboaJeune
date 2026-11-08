import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentStatus } from '../../domain/models/talent.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="badgeClass">
      {{ label }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input({ required: true }) status: TalentStatus = 'new';

  get badgeClass(): string {
    switch (this.status) {
      case 'new':
        return 'badge-new';
      case 'to_review':
        return 'badge-review';
      case 'pending':
        return 'badge-pending';
      case 'selected':
        return 'badge-selected';
      default:
        return 'badge-new';
    }
  }

  get label(): string {
    switch (this.status) {
      case 'new':
        return 'Nouveau';
      case 'to_review':
        return 'À évaluer';
      case 'pending':
        return 'En attente';
      case 'selected':
        return 'Retenu';
      default:
        return this.status;
    }
  }
}
