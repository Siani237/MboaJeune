import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <div class="glyph" aria-hidden="true"><i></i><i></i><i></i></div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <ng-content />
    </div>
  `,
  styles: [`
    .empty { text-align: center; padding: 3rem 1.5rem; background: var(--paper-2);
             border: 2px dashed var(--color-border-dark); border-radius: var(--radius-lg); margin: 1.5rem 0; }
    .glyph { display: inline-grid; grid-template-columns: repeat(3, 10px); gap: 4px; transform: skewX(-14deg); margin-bottom: 1rem; }
    .glyph i { display: block; width: 10px; height: 34px; border-radius: 10px; }
    .glyph i:nth-child(1) { background: var(--red); }
    .glyph i:nth-child(2) { background: var(--orange); }
    .glyph i:nth-child(3) { background: var(--cyan); }
    h3 { margin-bottom: .5rem; }
    p { color: var(--text-muted); max-width: 34rem; margin: 0 auto; }
  `]
})
export class EmptyStateComponent {
  @Input() icon?: string;
  @Input({ required: true }) title = '';
  @Input({ required: true }) message = '';
}
