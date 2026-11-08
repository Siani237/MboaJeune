import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, DomainKey, Opportunity } from '../../domain/models/activity.model';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule, RouterLink, EmptyStateComponent],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Agenda & Inscriptions</span>
        <h1>Opportunités et Ateliers</h1>
        <p class="lead">
          Retrouvez les ateliers, formations et sessions de création programmés dans le cadre du projet.
          Consultez les informations utiles : dates, lieux, critères et modalités d'inscription.
        </p>
      </header>

      <!-- Filtre par domaine -->
      <div class="filter-bar">
        <label for="domain-select" class="filter-label">Filtrer par filière :</label>
        <select
          id="domain-select"
          class="form-control filter-select"
          [value]="selectedDomain()"
          (change)="onDomainChange($event)"
        >
          <option value="">Toutes les filières</option>
          <option *ngFor="let d of domains()" [value]="d.key">{{ d.name }}</option>
        </select>
      </div>

      <!-- Liste des opportunités -->
      <div class="opps-list" *ngIf="filteredOpportunities().length > 0; else noOpps">
        <article *ngFor="let opp of filteredOpportunities()" class="opp-item card">
          <div class="opp-main">
            <div class="opp-meta">
              <span class="opp-domain-tag">{{ opp.domainLabel }}</span>
              <span class="opp-city">{{ opp.city }}</span>
              <span class="badge" [ngClass]="getRegistrationBadgeClass(opp.registrationStatus)">
                {{ getRegistrationLabel(opp.registrationStatus) }}
              </span>
            </div>

            <h2 class="opp-title">{{ opp.title }}</h2>
            <p class="opp-summary">{{ opp.summary }}</p>
            <p class="opp-desc">{{ opp.description }}</p>

            <div class="opp-details-grid">
              <div class="detail-item" *ngIf="opp.venue">
                <strong>Lieu :</strong> {{ opp.venue }}
              </div>
              <div class="detail-item" *ngIf="opp.startDate">
                <strong>Dates :</strong> Du {{ opp.startDate }} au {{ opp.endDate }}
              </div>
              <div class="detail-item" *ngIf="opp.capacity">
                <strong>Places estimées :</strong> {{ opp.capacity }} places
              </div>
              <div class="detail-item" *ngIf="opp.eligibilityNotes">
                <strong>Public cible :</strong> {{ opp.eligibilityNotes }}
              </div>
            </div>
          </div>

          <div class="opp-side-action">
            <a routerLink="/communaute" class="btn btn-primary">
              Participer via le Pool
            </a>
            <span class="demo-caption">Simulation en mode démo</span>
          </div>
        </article>
      </div>

      <ng-template #noOpps>
        <app-empty-state
          icon="📅"
          title="Aucune opportunité disponible actuellement"
          message="Aucune activité n'est ouverte pour ce domaine pour l'instant. Les prochaines dates seront publiées après validation par l'IFC."
        >
          <div style="margin-top: 1rem;">
            <a routerLink="/communaute" class="btn btn-secondary">S'inscrire au Pool de talents pour être notifié</a>
          </div>
        </app-empty-state>
      </ng-template>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 960px;
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
    .filter-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      background: var(--color-surface);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }
    .filter-label {
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
    }
    .filter-select {
      max-width: 300px;
    }
    .opps-list {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .opp-item {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      align-items: flex-start;
      padding: 2rem;
    }
    .opp-main {
      flex: 1;
    }
    .opp-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }
    .opp-domain-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      background-color: var(--color-primary-light);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
    }
    .opp-city {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
    }
    .opp-title {
      font-size: 1.45rem;
      margin-bottom: 0.5rem;
    }
    .opp-summary {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--color-text-main);
      margin-bottom: 0.75rem;
    }
    .opp-desc {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
      line-height: 1.6;
    }
    .opp-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
      background-color: var(--color-surface-subtle);
      padding: 1rem 1.25rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }
    .detail-item strong {
      color: var(--color-text-main);
    }
    .opp-side-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      min-width: 180px;
    }
    .demo-caption {
      font-size: 0.75rem;
      color: var(--color-text-light);
    }
    @media (max-width: 768px) {
      .opp-item {
        flex-direction: column;
      }
      .opp-side-action {
        width: 100%;
      }
      .opp-side-action .btn {
        width: 100%;
      }
    }
  `]
})
export class OpportunitiesComponent implements OnInit {
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);
  private readonly route = inject(ActivatedRoute);

  readonly domains = signal<DomainInfo[]>([]);
  readonly allOpportunities = signal<Opportunity[]>([]);
  readonly selectedDomain = signal<string>('');

  get filteredOpportunities(): () => Opportunity[] {
    return () => {
      const dom = this.selectedDomain();
      if (!dom) return this.allOpportunities();
      return this.allOpportunities().filter((o) => o.domain === dom);
    };
  }

  async ngOnInit(): Promise<void> {
    const [domains, opps] = await Promise.all([
      this.activityRepo.getDomains(),
      this.activityRepo.getOpportunities()
    ]);
    this.domains.set(domains);
    this.allOpportunities.set(opps);

    this.route.queryParams.subscribe((params) => {
      if (params['domain']) {
        this.selectedDomain.set(params['domain']);
      }
    });
  }

  onDomainChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDomain.set(select.value);
  }

  getRegistrationBadgeClass(status: string): string {
    switch (status) {
      case 'open':
        return 'badge-selected';
      case 'soon':
        return 'badge-review';
      case 'closed':
        return 'badge-new';
      default:
        return 'badge-new';
    }
  }

  getRegistrationLabel(status: string): string {
    switch (status) {
      case 'open':
        return 'Inscriptions ouvertes';
      case 'soon':
        return 'Prochainement';
      case 'closed':
        return 'Clôturé';
      default:
        return status;
    }
  }
}
