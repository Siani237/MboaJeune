import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink, EmptyStateComponent],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Retours d'expérience</span>
        <h1>Témoignages des participants</h1>
        <p class="lead">
          Découvrez prochainement les parcours et les réalisations concrètes des jeunes ayant pris part aux activités de Mboa Jeunes Créatifs.
        </p>
      </header>

      <app-empty-state
        icon="✨"
        title="Recueil des témoignages en cours"
        message="Le programme démarre ses sessions de formation et ateliers pratiques à Yaoundé et Douala. Les retours d'expérience des bénéficiaires seront publiés ici après validation de l'équipe du programme."
      >
        <div style="margin-top: 1.5rem;">
          <a routerLink="/communaute" class="btn btn-primary">Participer aux prochains ateliers →</a>
        </div>
      </app-empty-state>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 860px;
    }
    .page-header {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 2rem;
    }
    .section-tag {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lead {
      font-size: 1.15rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-top: 0.75rem;
    }
  `]
})
export class TestimonialsComponent {}
