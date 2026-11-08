import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TalentService } from '../../../core/services/talent.service';
import { AuthDemoService } from '../../../core/services/auth-demo.service';
import { TalentProfile } from '../../../domain/models/talent.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-content">
      <!-- Barre navigation admin -->
      <header class="admin-header">
        <div>
          <span class="admin-tag">Espace d'administration Démo</span>
          <h1>Tableau de bord — Pool de talents</h1>
        </div>

        <div class="admin-nav-actions">
          <a routerLink="/admin/talents" class="btn btn-primary btn-sm">📋 Consulter les profils</a>
          <a routerLink="/admin/appels" class="btn btn-secondary btn-sm">📢 Appels à candidatures</a>
          <button type="button" class="btn btn-outline btn-sm" (click)="onResetData()" [disabled]="isResetting()">
            🔄 {{ isResetting() ? 'Réinitialisation...' : 'Réinitialiser la démo' }}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" (click)="onLogout()">
            Déconnexion
          </button>
        </div>
      </header>

      <!-- Cartes statistiques -->
      <section class="stats-grid">
        <div class="stat-card card">
          <span class="stat-label">Total Profils Démo</span>
          <span class="stat-number">{{ talents().length }}</span>
          <span class="stat-sub">Dans le Mock Store local</span>
        </div>

        <div class="stat-card card">
          <span class="stat-label">Nouveaux profils</span>
          <span class="stat-number color-new">{{ countStatus('new') }}</span>
          <span class="stat-sub">En attente de revue</span>
        </div>

        <div class="stat-card card">
          <span class="stat-label">À évaluer</span>
          <span class="stat-number color-review">{{ countStatus('to_review') }}</span>
          <span class="stat-sub">En cours d'examen</span>
        </div>

        <div class="stat-card card">
          <span class="stat-label">Retenus / Orientés</span>
          <span class="stat-number color-selected">{{ countStatus('selected') }}</span>
          <span class="stat-sub">Profils qualifiés</span>
        </div>
      </section>

      <!-- Répartition géographique et par filière -->
      <section class="analytics-row">
        <div class="analytics-card card">
          <h3>Répartition par Ville</h3>
          <div class="breakdown-list">
            <div class="breakdown-item">
              <span>Yaoundé</span>
              <strong>{{ countCity('Yaounde') }}</strong>
            </div>
            <div class="breakdown-item">
              <span>Douala</span>
              <strong>{{ countCity('Douala') }}</strong>
            </div>
            <div class="breakdown-item">
              <span>Autres localités</span>
              <strong>{{ countCity('Other') }}</strong>
            </div>
          </div>
        </div>

        <div class="analytics-card card">
          <h3>Répartition par Situation</h3>
          <div class="breakdown-list">
            <div class="breakdown-item">
              <span>Étudiants</span>
              <strong>{{ countSituation('student') }}</strong>
            </div>
            <div class="breakdown-item">
              <span>Jeunes diplômés</span>
              <strong>{{ countSituation('graduate') }}</strong>
            </div>
            <div class="breakdown-item">
              <span>Entrepreneurs / Créateurs</span>
              <strong>{{ countSituation('entrepreneur') }}</strong>
            </div>
            <div class="breakdown-item">
              <span>Autres profils</span>
              <strong>{{ countSituation('other') }}</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions rapides -->
      <section class="quick-actions card">
        <div class="quick-header">
          <h3>Actions rapides de démonstration</h3>
          <p>Testez les capacités de recherche, filtrage, export et qualification des profils.</p>
        </div>
        <div class="actions-buttons">
          <a routerLink="/admin/talents" class="btn btn-primary">
            Accéder à la liste complète & recherche multicritères →
          </a>
          <a routerLink="/communaute" class="btn btn-secondary">
            Simuler une nouvelle soumission candidat →
          </a>
        </div>
      </section>
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
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
    }
    .admin-tag {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .admin-header h1 {
      font-size: 2rem;
      margin: 0.25rem 0 0;
    }
    .admin-nav-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .stat-card {
      padding: 1.5rem;
      text-align: center;
    }
    .stat-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      display: block;
      margin-bottom: 0.5rem;
    }
    .stat-number {
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1;
      display: block;
      margin-bottom: 0.4rem;
    }
    .stat-number.color-new { color: var(--color-status-new); }
    .stat-number.color-review { color: var(--color-status-review); }
    .stat-number.color-selected { color: var(--color-status-selected); }
    .stat-sub {
      font-size: 0.775rem;
      color: var(--color-text-light);
    }
    .analytics-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .analytics-card {
      padding: 1.75rem;
    }
    .analytics-card h3 {
      font-size: 1.15rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 0.5rem;
    }
    .breakdown-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .breakdown-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.75rem;
      background-color: var(--color-surface-subtle);
      border-radius: var(--radius-sm);
      font-size: 0.925rem;
    }
    .quick-actions {
      padding: 2rem;
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
    }
    .quick-header h3 {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }
    .quick-header p {
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
    }
    .actions-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private readonly talentService = inject(TalentService);
  private readonly auth = inject(AuthDemoService);

  readonly talents = signal<TalentProfile[]>([]);
  readonly isResetting = signal(false);

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    const list = await this.talentService.getTalents();
    this.talents.set(list);
  }

  countStatus(status: string): number {
    return this.talents().filter((t) => t.status === status).length;
  }

  countCity(city: string): number {
    return this.talents().filter((t) => t.city === city).length;
  }

  countSituation(sit: string): number {
    return this.talents().filter((t) => t.currentSituation === sit).length;
  }

  async onResetData(): Promise<void> {
    if (!confirm('Voulez-vous réinitialiser toutes les données démo vers le jeu de seed initial ?')) {
      return;
    }
    this.isResetting.set(true);
    try {
      await this.talentService.resetDemoData();
      await this.refresh();
    } finally {
      this.isResetting.set(false);
    }
  }

  onLogout(): void {
    this.auth.logout();
    window.location.href = '/';
  }
}
