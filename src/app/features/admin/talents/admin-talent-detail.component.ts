import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TalentService } from '../../../core/services/talent.service';
import { TalentProfile, TalentStatus } from '../../../domain/models/talent.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge.component';

@Component({
  selector: 'app-admin-talent-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  template: `
    <div class="container page-content" *ngIf="talent() as t; else loadingOrNotFound">
      <header class="detail-header">
        <div>
          <div class="breadcrumb">
            <a routerLink="/admin/talents">← Retour à la liste des profils</a>
          </div>
          <h1>{{ t.firstName }} {{ t.lastName }}</h1>
          <div class="header-meta">
            <app-status-badge [status]="t.status" />
            <span class="meta-item">Identifiant : <code>{{ t.id }}</code></span>
            <span class="meta-item">Inscrit le : {{ t.createdAt }}</span>
          </div>
        </div>

        <div class="status-action-box card">
          <label for="statusSelect" class="status-label">Statut du profil :</label>
          <div class="status-controls">
            <select
              id="statusSelect"
              class="form-control"
              [value]="t.status"
              (change)="onStatusChange($event)"
            >
              <option value="new">Nouveau</option>
              <option value="to_review">À évaluer</option>
              <option value="pending">En attente</option>
              <option value="selected">Retenu / Qualifié</option>
            </select>
          </div>
        </div>
      </header>

      <div class="detail-grid">
        <!-- Colonne 1 : Coordonnées & État civil -->
        <div class="detail-col">
          <section class="card detail-section">
            <h2>Informations personnelles</h2>
            <div class="field-item">
              <span class="field-name">Date de naissance / Âge :</span>
              <span class="field-val">{{ t.birthDate }} ({{ getAge(t.birthDate) }} ans)</span>
            </div>
            <div class="field-item">
              <span class="field-name">Ville de résidence :</span>
              <span class="field-val">{{ t.city === 'Other' ? t.cityOther : t.city }}</span>
            </div>
            <div class="field-item">
              <span class="field-name">Email :</span>
              <span class="field-val"><a [href]="'mailto:' + t.email">{{ t.email }}</a></span>
            </div>
            <div class="field-item">
              <span class="field-name">Téléphone / WhatsApp :</span>
              <span class="field-val">{{ t.phone }}</span>
            </div>
            <div class="field-item" *ngIf="t.portfolioUrl">
              <span class="field-name">Portfolio en ligne :</span>
              <span class="field-val"><a [href]="t.portfolioUrl" target="_blank" rel="noopener">{{ t.portfolioUrl }}</a></span>
            </div>
            <div class="field-item" *ngIf="t.cvFileNameSimulated">
              <span class="field-name">Pièce jointe (Simulation) :</span>
              <span class="field-val"><code>{{ t.cvFileNameSimulated }}</code> (aucun fichier stocké en démo)</span>
            </div>
          </section>

          <section class="card detail-section">
            <h2>Situation académique & professionnelle</h2>
            <div class="field-item">
              <span class="field-name">Statut actuel :</span>
              <span class="field-val">{{ getSituationLabel(t.currentSituation) }}</span>
            </div>
            <div class="field-item">
              <span class="field-name">Niveau d'études :</span>
              <span class="field-val">{{ t.educationLevel }}</span>
            </div>
            <div class="field-item">
              <span class="field-name">Disponibilité :</span>
              <span class="field-val">{{ t.availability }}</span>
            </div>
          </section>

          <section class="card detail-section consent-section">
            <h2>Preuve de consentement (Démo)</h2>
            <div class="field-item">
              <span class="field-name">Consentement donné :</span>
              <span class="field-val">Oui (simulation)</span>
            </div>
            <div class="field-item">
              <span class="field-name">Notice légale :</span>
              <span class="field-val"><code>{{ t.consent.noticeVersion }}</code></span>
            </div>
            <div class="field-item">
              <span class="field-name">Horodatage :</span>
              <span class="field-val">{{ t.consent.acceptedAt }}</span>
            </div>
          </section>
        </div>

        <!-- Colonne 2 : Compétences, Filières et Motivations -->
        <div class="detail-col">
          <section class="card detail-section">
            <h2>Filières d'intérêt sélectionnées</h2>
            <div class="tags-container">
              <span *ngFor="let domain of t.interests" class="tag-pill">{{ domain }}</span>
            </div>
          </section>

          <section class="card detail-section">
            <h2>Résumé du parcours</h2>
            <p class="field-text">{{ t.background }}</p>
          </section>

          <section class="card detail-section">
            <h2>Compétences et expériences préalables</h2>
            <p class="field-text">{{ t.skillsAndExperience }}</p>
          </section>

          <section class="card detail-section">
            <h2>Motivations pour le programme</h2>
            <p class="field-text">{{ t.motivation }}</p>
          </section>

          <section class="card detail-section" *ngIf="t.learningGoals">
            <h2>Objectif d'apprentissage visé</h2>
            <p class="field-text">{{ t.learningGoals }}</p>
          </section>
        </div>
      </div>
    </div>

    <ng-template #loadingOrNotFound>
      <div class="container page-content">
        <p>Chargement du profil ou identifiant introuvable...</p>
        <a routerLink="/admin/talents" class="btn btn-secondary">Retour à la liste</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .breadcrumb a {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-primary);
    }
    .detail-header h1 {
      font-size: 2rem;
      margin: 0.35rem 0 0.5rem;
    }
    .header-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
    .status-action-box {
      padding: 1rem 1.25rem;
      background-color: var(--color-surface-subtle);
    }
    .status-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
      color: var(--color-text-main);
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 2rem;
    }
    .detail-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .detail-section {
      padding: 1.75rem;
    }
    .detail-section h2 {
      font-size: 1.15rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--color-surface-subtle);
      padding-bottom: 0.5rem;
    }
    .field-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px dashed var(--color-border);
      font-size: 0.9rem;
      gap: 1rem;
    }
    .field-name {
      color: var(--color-text-muted);
      font-weight: 500;
    }
    .field-val {
      font-weight: 600;
      text-align: right;
    }
    .field-text {
      color: var(--color-text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
      margin: 0;
      white-space: pre-line;
    }
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tag-pill {
      background-color: var(--color-primary-light);
      color: var(--color-primary-dark);
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
    }
    .consent-section {
      background-color: #fffbeb;
      border-color: #fde68a;
    }
    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
      .field-item {
        flex-direction: column;
        align-items: flex-start;
      }
      .field-val {
        text-align: left;
      }
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
export class AdminTalentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly talentService = inject(TalentService);

  readonly talent = signal<TalentProfile | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const item = await this.talentService.getTalentById(id);
      this.talent.set(item);
    }
  }

  getAge(birthDate: string): number {
    return this.talentService.calculateAge(birthDate);
  }

  getSituationLabel(sit: string): string {
    switch (sit) {
      case 'student': return 'Étudiant(e)';
      case 'graduate': return 'Jeune diplômé(e)';
      case 'entrepreneur': return 'Entrepreneur(e)';
      case 'other': return 'Autre situation';
      default: return sit;
    }
  }

  async onStatusChange(event: Event): Promise<void> {
    const current = this.talent();
    if (!current) return;
    const newStatus = (event.target as HTMLSelectElement).value as TalentStatus;
    const updated = await this.talentService.updateStatus(current.id, newStatus);
    this.talent.set(updated);
  }
}
