import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../../domain/repositories/activity.repository';
import { Opportunity } from '../../../domain/models/activity.model';

@Component({
  selector: 'app-admin-applications-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-content">
      <header class="admin-header">
        <div>
          <div class="breadcrumb">
            <a routerLink="/admin">← Tableau de bord</a>
          </div>
          <h1>Appels à candidatures & Sessions (Démo)</h1>
          <p class="lead">
            Préparation des futurs formulaires spécifiques par discipline (distincts du Pool permanent).
          </p>
        </div>
      </header>

      <div class="info-card card">
        <h3>Architecture : Séparation Pool vs Appels</h3>
        <p>
          Conformément aux spécifications architecturales, une inscription au <strong>Pool de talents</strong> 
          ne vaut pas candidature automatique à une session fermée. Chaque appel dispose de ses propres critères 
          d'éligibilité, capacité d'accueil et calendrier.
        </p>
      </div>

      <div class="calls-grid">
        <div *ngFor="let opp of opportunities()" class="call-card card">
          <div class="call-meta">
            <span class="badge" [ngClass]="opp.registrationStatus === 'open' ? 'badge-selected' : 'badge-review'">
              {{ opp.registrationStatus === 'open' ? 'Ouvert aux candidatures' : 'À venir' }}
            </span>
            <span class="call-city">{{ opp.city }}</span>
          </div>

          <h2 class="call-title">{{ opp.title }}</h2>
          <p class="call-summary">{{ opp.summary }}</p>

          <div class="call-specs">
            <div><strong>Filière :</strong> {{ opp.domainLabel }}</div>
            <div><strong>Période :</strong> {{ opp.startDate }} au {{ opp.endDate }}</div>
            <div><strong>Capacité :</strong> {{ opp.capacity }} participants max</div>
            <div><strong>Conditions :</strong> {{ opp.eligibilityNotes }}</div>
          </div>

          <div class="call-actions">
            <span class="demo-pill">Appel de démonstration</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
    }
    .admin-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 1.5rem;
    }
    .breadcrumb a {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-primary);
    }
    .admin-header h1 {
      font-size: 1.85rem;
      margin: 0.35rem 0 0.25rem;
    }
    .lead {
      color: var(--color-text-muted);
      margin: 0;
      font-size: 0.95rem;
    }
    .info-card {
      background-color: var(--color-surface-subtle);
      border-left: 4px solid var(--color-primary);
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .info-card h3 {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
    }
    .info-card p {
      margin: 0;
      font-size: 0.925rem;
      color: var(--color-text-muted);
    }
    .calls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .call-card {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
    }
    .call-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .call-city {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
    }
    .call-title {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    .call-summary {
      color: var(--color-text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .call-specs {
      background-color: var(--color-surface-subtle);
      padding: 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 1.25rem;
    }
    .call-actions {
      display: flex;
      justify-content: flex-end;
    }
    .demo-pill {
      font-size: 0.75rem;
      color: var(--color-text-light);
      font-style: italic;
    }
  
    .admin-header, .detail-header { background: var(--ink); color: var(--text-on-dark); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; padding: 1.8rem 2rem; border-bottom: none; position: relative; overflow: hidden; }
    .admin-header::after, .detail-header::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 8px; background: linear-gradient(90deg, var(--red) 0 33%, var(--orange) 33% 66%, var(--cyan) 66%); }
    .admin-header h1, .detail-header h1 { color: var(--ochre); }
    .admin-header .lead, .header-meta, .header-meta .meta-item { color: var(--text-on-dark-muted); }
    .admin-tag { color: var(--orange); }
    .breadcrumb a { color: var(--ochre); }
    .admin-header .btn-secondary { background: transparent; color: var(--text-on-dark); border-color: var(--line-dark); }
    .admin-header .btn-outline { color: var(--text-on-dark); border-color: var(--ochre); }
    .admin-header .btn-outline:hover { background: var(--ochre); color: var(--ink); }
    .talents-table th { background: var(--ink); color: var(--ochre); border-bottom: none; }
    .talents-table tr:hover td { background: var(--paper-2); }
  `]
})
export class AdminApplicationsDemoComponent implements OnInit {
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);
  readonly opportunities = signal<Opportunity[]>([]);

  async ngOnInit(): Promise<void> {
    const list = await this.activityRepo.getOpportunities();
    this.opportunities.set(list);
  }
}
