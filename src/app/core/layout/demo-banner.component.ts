import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <aside class="demo-banner" role="status" aria-label="Avertissement mode démonstration">
      <div class="container banner-inner">
        <span class="banner-badge">DÉMONSTRATION</span>
        <p class="banner-text">
          <strong>Site de démonstration — Données fictives :</strong>
          Ce site simule le site vitrine et le Pool de talents sans serveur backend réel.
          Ne saisissez aucune donnée personnelle réelle.
        </p>
        <a routerLink="/admin/demo-login" class="banner-link">Espace démo équipe →</a>
      </div>
    </aside>
  `,
  styles: [`
    .demo-banner {
      background-color: var(--color-demo-banner-bg);
      border-bottom: 1px solid #fde68a;
      color: var(--color-demo-banner);
      font-size: 0.85rem;
      padding: 0.5rem 0;
    }
    .banner-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .banner-badge {
      background-color: var(--color-demo-banner);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.15rem 0.45rem;
      border-radius: var(--radius-sm);
      letter-spacing: 0.05em;
    }
    .banner-text {
      margin: 0;
      flex: 1;
      min-width: 280px;
    }
    .banner-link {
      font-weight: 600;
      color: var(--color-demo-banner);
      text-decoration: underline;
      white-space: nowrap;
    }
  `]
})
export class DemoBannerComponent {}
