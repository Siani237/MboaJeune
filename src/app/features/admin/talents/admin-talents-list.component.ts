import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TalentService } from '../../../core/services/talent.service';
import { ACTIVITY_REPOSITORY } from '../../../domain/repositories/activity.repository';
import { DomainInfo } from '../../../domain/models/activity.model';
import { TalentProfile, TalentQuery, TalentStatus } from '../../../domain/models/talent.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state.component';

@Component({
  selector: 'app-admin-talents-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StatusBadgeComponent, EmptyStateComponent],
  template: `
    <div class="container page-content">
      <header class="admin-header">
        <div>
          <div class="breadcrumb">
            <a routerLink="/admin">← Tableau de bord</a>
          </div>
          <h1>Gestion du Pool de talents (Démo)</h1>
          <p class="lead">Consultez, filtrez et exportez les profils fictifs enregistrés dans le Mock Store.</p>
        </div>

        <div class="header-actions">
          <button type="button" class="btn btn-primary" (click)="onExportCsv()">
            Exporter CSV (Données démo)
          </button>
        </div>
      </header>

      <!-- Barre de filtres et recherche -->
      <section class="filters-card card">
        <div class="filters-grid">
          <div class="filter-item search-item">
            <label for="searchInput" class="filter-label">Recherche mot-clé :</label>
            <input
              id="searchInput"
              type="text"
              class="form-control"
              placeholder="Nom, compétences, email..."
              [(ngModel)]="query.search"
              (ngModelChange)="onFilterChange()"
            >
          </div>

          <div class="filter-item">
            <label for="cityFilter" class="filter-label">Ville :</label>
            <select
              id="cityFilter"
              class="form-control"
              [(ngModel)]="query.city"
              (ngModelChange)="onFilterChange()"
            >
              <option value="">Toutes les villes</option>
              <option value="Yaounde">Yaoundé</option>
              <option value="Douala">Douala</option>
              <option value="Other">Autre</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="domainFilter" class="filter-label">Filière :</label>
            <select
              id="domainFilter"
              class="form-control"
              [(ngModel)]="query.domain"
              (ngModelChange)="onFilterChange()"
            >
              <option value="">Toutes les filières</option>
              <option *ngFor="let d of domains()" [value]="d.key">{{ d.name }}</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="statusFilter" class="filter-label">Statut :</label>
            <select
              id="statusFilter"
              class="form-control"
              [(ngModel)]="query.status"
              (ngModelChange)="onFilterChange()"
            >
              <option value="">Tous les statuts</option>
              <option value="new">Nouveau</option>
              <option value="to_review">À évaluer</option>
              <option value="pending">En attente</option>
              <option value="selected">Retenu</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="situationFilter" class="filter-label">Situation :</label>
            <select
              id="situationFilter"
              class="form-control"
              [(ngModel)]="query.situation"
              (ngModelChange)="onFilterChange()"
            >
              <option value="">Toutes les situations</option>
              <option value="student">Étudiant</option>
              <option value="graduate">Diplômé</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        <div class="filters-footer">
          <span class="results-count">
            <strong>{{ talents().length }}</strong> profil(s) trouvé(s)
          </span>
          <button type="button" class="btn btn-outline btn-sm" (click)="resetFilters()">
            Réinitialiser les filtres
          </button>
        </div>
      </section>

      <!-- Tableau des résultats -->
      <section class="table-container card" *ngIf="talents().length > 0; else noResults">
        <div class="table-responsive">
          <table class="talents-table">
            <thead>
              <tr>
                <th>Candidat</th>
                <th>Âge / Ville</th>
                <th>Situation & Études</th>
                <th>Filières d'intérêt</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let talent of talents()">
                <td>
                  <div class="talent-identity">
                    <strong>{{ talent.firstName }} {{ talent.lastName }}</strong>
                    <span class="talent-email">{{ talent.email }}</span>
                    <span class="talent-phone">{{ talent.phone }}</span>
                  </div>
                </td>
                <td>
                  <span class="talent-age">{{ getAge(talent.birthDate) }} ans</span>
                  <span class="talent-city">{{ talent.city === 'Other' ? talent.cityOther : talent.city }}</span>
                </td>
                <td>
                  <span class="talent-situation">{{ getSituationLabel(talent.currentSituation) }}</span>
                  <span class="talent-education">{{ talent.educationLevel }}</span>
                </td>
                <td>
                  <div class="interest-tags">
                    <span *ngFor="let tag of talent.interests" class="interest-tag">
                      {{ tag }}
                    </span>
                  </div>
                </td>
                <td>
                  <app-status-badge [status]="talent.status" />
                </td>
                <td>
                  <div class="table-actions">
                    <a [routerLink]="['/admin/talents', talent.id]" class="btn btn-secondary btn-sm">
                      Détail
                    </a>
                    <select
                      class="form-control status-select"
                      [value]="talent.status"
                      (change)="onQuickStatusChange(talent.id, $event)"
                      aria-label="Modifier le statut"
                    >
                      <option value="new">Nouveau</option>
                      <option value="to_review">À évaluer</option>
                      <option value="pending">En attente</option>
                      <option value="selected">Retenu</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ng-template #noResults>
        <app-empty-state
          icon=""
          title="Aucun profil ne correspond à vos filtres"
          message="Modifiez vos critères de recherche ou réinitialisez les filtres pour afficher l'ensemble des profils."
        >
          <div style="margin-top: 1rem;">
            <button type="button" class="btn btn-secondary" (click)="resetFilters()">
              Effacer tous les filtres
            </button>
          </div>
        </app-empty-state>
      </ng-template>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
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
    .filters-card {
      margin-bottom: 2rem;
      padding: 1.5rem;
    }
    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .search-item {
      grid-column: span 2;
    }
    @media (max-width: 768px) {
      .search-item {
        grid-column: span 1;
      }
    }
    .filter-label {
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 0.35rem;
      display: block;
      color: var(--color-text-main);
    }
    .filters-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--color-surface-subtle);
    }
    .results-count {
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }
    .table-container {
      padding: 0;
      overflow: hidden;
    }
    .table-responsive {
      overflow-x: auto;
    }
    .talents-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }
    .talents-table th {
      background-color: var(--color-surface-subtle);
      padding: 0.85rem 1rem;
      font-size: 0.775rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted);
      border-bottom: 1px solid var(--color-border);
    }
    .talents-table td {
      padding: 1rem;
      border-bottom: 1px solid var(--color-border);
      vertical-align: middle;
    }
    .talents-table tr:hover td {
      background-color: #faf8f5;
    }
    .talent-identity {
      display: flex;
      flex-direction: column;
    }
    .talent-email {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .talent-phone {
      font-size: 0.75rem;
      color: var(--color-text-light);
    }
    .talent-age {
      display: block;
      font-weight: 600;
    }
    .talent-city {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .talent-situation {
      display: block;
      font-weight: 600;
    }
    .talent-education {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .interest-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }
    .interest-tag {
      background-color: var(--color-surface-subtle);
      font-size: 0.75rem;
      padding: 0.15rem 0.45rem;
      border-radius: var(--radius-sm);
      color: var(--color-text-main);
    }
    .table-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .status-select {
      font-size: 0.8rem;
      padding: 0.3rem 0.5rem;
      width: auto;
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
export class AdminTalentsListComponent implements OnInit {
  private readonly talentService = inject(TalentService);
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);

  readonly talents = signal<TalentProfile[]>([]);
  readonly domains = signal<DomainInfo[]>([]);

  readonly query: TalentQuery = {
    search: '',
    city: '',
    domain: '',
    status: '',
    situation: ''
  };

  async ngOnInit(): Promise<void> {
    const [domainList] = await Promise.all([
      this.activityRepo.getDomains(),
      this.loadTalents()
    ]);
    this.domains.set(domainList);
  }

  async loadTalents(): Promise<void> {
    const list = await this.talentService.getTalents(this.query);
    this.talents.set(list);
  }

  onFilterChange(): void {
    this.loadTalents();
  }

  resetFilters(): void {
    this.query.search = '';
    this.query.city = '';
    this.query.domain = '';
    this.query.status = '';
    this.query.situation = '';
    this.loadTalents();
  }

  getAge(birthDate: string): number {
    return this.talentService.calculateAge(birthDate);
  }

  getSituationLabel(sit: string): string {
    switch (sit) {
      case 'student': return 'Étudiant(e)';
      case 'graduate': return 'Diplômé(e)';
      case 'entrepreneur': return 'Entrepreneur(e)';
      case 'other': return 'Autre';
      default: return sit;
    }
  }

  async onQuickStatusChange(id: string, event: Event): Promise<void> {
    const newStatus = (event.target as HTMLSelectElement).value as TalentStatus;
    await this.talentService.updateStatus(id, newStatus);
    await this.loadTalents();
  }

  async onExportCsv(): Promise<void> {
    const csvData = await this.talentService.generateTalentsCsv(this.query);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mboa-talents-demo-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
