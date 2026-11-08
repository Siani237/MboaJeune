import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo } from '../../domain/models/activity.model';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Filières & Pratiques</span>
        <h1>Activités et Domaines créatifs</h1>
        <p class="lead">
          La créativité prend plusieurs formes. Mboa Jeunes Créatifs propose des activités qui permettent 
          aux jeunes de découvrir différents univers, d'expérimenter de nouvelles pratiques et de développer leurs compétences.
        </p>
        <p class="disclaimer">
          <em>* Les activités effectivement proposées peuvent varier selon les villes (Yaoundé / Douala), 
          les périodes et la programmation officielle de l'IFC.</em>
        </p>
      </header>

      <div class="domains-list">
        <article *ngFor="let domain of domains()" [id]="domain.key" class="domain-section card">
          <div class="domain-header">
            <div>
              <span class="domain-badge">{{ domain.tagline }}</span>
              <h2 class="domain-name">{{ domain.name }}</h2>
            </div>
          </div>
          
          <p class="domain-text">{{ domain.description }}</p>

          <div class="domain-highlights">
            <h4>Thématiques & Ateliers clés :</h4>
            <ul>
              <li *ngFor="let item of domain.highlights">{{ item }}</li>
            </ul>
          </div>

          <div class="domain-footer">
            <a [routerLink]="['/opportunites']" [queryParams]="{domain: domain.key}" class="btn btn-outline btn-sm">
              Voir les opportunités associées →
            </a>
          </div>
        </article>
      </div>

      <div class="cta-banner card">
        <h3>Une filière vous inspire ?</h3>
        <p>Inscrivez-vous au Pool de talents pour être prévenu dès qu'un atelier ou un appel à candidatures est publié dans votre domaine.</p>
        <a routerLink="/communaute" class="btn btn-primary">Rejoindre le Pool de talents →</a>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 900px;
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
    .disclaimer {
      font-size: 0.85rem;
      color: var(--color-text-light);
      margin-top: 0.5rem;
    }
    .domains-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .domain-section {
      padding: 2rem;
    }
    .domain-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .domain-badge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 0.25rem;
    }
    .domain-name {
      font-size: 1.6rem;
      color: var(--color-text-main);
      margin: 0;
    }
    .domain-text {
      font-size: 1.05rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .domain-highlights {
      background-color: var(--color-surface-subtle);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.5rem;
    }
    .domain-highlights h4 {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .domain-highlights ul {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
    }
    .domain-highlights li {
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }
    .domain-footer {
      display: flex;
      justify-content: flex-end;
    }
    .cta-banner {
      margin-top: 3.5rem;
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      text-align: center;
      padding: 2.5rem;
    }
    .cta-banner h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .cta-banner p {
      max-width: 600px;
      margin: 0 auto 1.5rem;
      color: var(--color-text-muted);
    }
  `]
})
export class ActivitiesComponent implements OnInit {
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);

  async ngOnInit(): Promise<void> {
    const list = await this.activityRepo.getDomains();
    this.domains.set(list);
  }
}
