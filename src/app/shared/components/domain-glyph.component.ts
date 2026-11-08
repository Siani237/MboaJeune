import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export const DOMAIN_COLORS: Record<string, string> = {
  mode: '#d8402e',
  musique: '#f08a00',
  radio: '#19b5c8',
  numerique: '#2f9e44',
  arts_visuels: '#e8b04a',
  sport: '#d8402e',
  evenementiel: '#19b5c8'
};

/** Pictogrammes géométriques cohérents (trait 2.5, coins arrondis) pour les 7 domaines. */
@Component({
  selector: 'app-domain-glyph',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 48 48" [attr.width]="size" [attr.height]="size" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ng-container [ngSwitch]="domain">
        <g *ngSwitchCase="'mode'">
          <path d="M24 10a4 4 0 1 1 4 4c-2 .6-4 2-4 4v2"/>
          <path d="M24 20 6 33a2 2 0 0 0 1.2 3.6h33.6A2 2 0 0 0 42 33L24 20Z"/>
        </g>
        <g *ngSwitchCase="'musique'">
          <path d="M18 34V12l20-4v22"/>
          <circle cx="13" cy="34" r="5"/>
          <circle cx="33" cy="30" r="5"/>
        </g>
        <g *ngSwitchCase="'radio'">
          <rect x="6" y="18" width="36" height="22" rx="4"/>
          <circle cx="29" cy="29" r="6"/>
          <path d="M12 24h8M12 30h8M12 36h8"/>
          <path d="m14 18 20-10"/>
        </g>
        <g *ngSwitchCase="'numerique'">
          <path d="M24 5 41 14v20L24 43 7 34V14L24 5Z"/>
          <path d="M7 14l17 9 17-9M24 23v20"/>
        </g>
        <g *ngSwitchCase="'arts_visuels'">
          <path d="M24 6C13 6 6 14 6 24c0 8 5 14 12 14 4 0 4-3 3-5-1-3 1-5 4-5h6c6 0 11-3 11-8C42 12 34 6 24 6Z"/>
          <circle cx="15" cy="22" r="2"/><circle cx="23" cy="15" r="2"/><circle cx="32" cy="18" r="2"/>
        </g>
        <g *ngSwitchCase="'sport'">
          <circle cx="11" cy="33" r="7"/><circle cx="37" cy="33" r="7"/>
          <path d="M11 33 20 17h12l5 16M20 17l7 16M16 13h8"/>
        </g>
        <g *ngSwitchCase="'evenementiel'">
          <path d="M6 20h36v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V20Z"/>
          <path d="M6 20 9 8h30l3 12M16 8l-3 12M24 8v12M32 8l3 12"/>
        </g>
        <g *ngSwitchDefault><circle cx="24" cy="24" r="14"/></g>
      </ng-container>
    </svg>
  `,
  styles: [`:host { display: inline-flex; line-height: 0; }`]
})
export class DomainGlyphComponent {
  @Input({ required: true }) domain = '';
  @Input() size = 40;
}
