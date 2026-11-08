import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, Opportunity } from '../../domain/models/activity.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero éditorial & culturel -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-badge">Programme de l'Institut français du Cameroun</div>
        <h1 class="hero-title">Un programme pour révéler les talents de demain</h1>
        <p class="hero-lead">
          La créativité est une force, et chaque jeune mérite de pouvoir développer son potentiel.
          Porté par l'Institut français du Cameroun et financé par le Fonds Équipe France, 
          <strong>Mboa Jeunes Créatifs</strong> offre aux jeunes de moins de 35 ans un espace d'expression, 
          de formation et de création dans les industries culturelles et créatives.
        </p>
        <div class="hero-actions">
          <a routerLink="/programme" class="btn btn-primary">Découvrir le programme</a>
          <a routerLink="/activites" class="btn btn-secondary">Explorer les 7 domaines</a>
          <a routerLink="/opportunites" class="btn btn-outline">Voir les opportunités</a>
          <a routerLink="/communaute" class="btn btn-primary">Rejoindre le Pool de talents</a>
        </div>
      </div>
    </section>

    <!-- Les 3 messages clés -->
    <section class="messages-section">
      <div class="container">
        <div class="messages-grid">
          <div class="message-card">
            <div class="message-num">01</div>
            <h3>Destiné aux jeunes & étudiants</h3>
            <p>Ouvert aux moins de 35 ans à Yaoundé et Douala, qu'ils soient étudiants, passionnés ou débutants.</p>
          </div>
          <div class="message-card">
            <div class="message-num">02</div>
            <h3>Formations & ateliers pratiques</h3>
            <p>Des opportunités concrètes animées par des professionnels pour acquérir de nouvelles compétences.</p>
          </div>
          <div class="message-card">
            <div class="message-num">03</div>
            <h3>Accès simple à l'information</h3>
            <p>Une plateforme claire pour s'informer, s'orienter et intégrer la communauté des jeunes créateurs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Aperçu des 7 domaines -->
    <section class="domains-overview-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Industries Culturelles & Créatives</span>
          <h2>7 domaines pour exprimer sa créativité</h2>
          <p class="section-lead">Explorez nos filières d'apprentissage et de pratique sur le terrain.</p>
        </div>

        <div class="domains-grid">
          <div *ngFor="let domain of domains()" class="domain-card">
            <h3 class="domain-title">{{ domain.name }}</h3>
            <p class="domain-tagline">{{ domain.tagline }}</p>
            <p class="domain-desc">{{ domain.description }}</p>
            <a [routerLink]="['/activites']" [fragment]="domain.key" class="domain-link">En savoir plus →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Prochaines opportunités -->
    <section class="opportunities-preview-section">
      <div class="container">
        <div class="section-header flex-header">
          <div>
            <span class="section-tag">Agenda & Inscriptions</span>
            <h2>Activités récentes et à venir</h2>
          </div>
          <a routerLink="/opportunites" class="btn btn-secondary btn-sm">Consulter tout l'agenda →</a>
        </div>

        <div class="opps-grid">
          <article *ngFor="let opp of opportunities()" class="opp-card">
            <div class="opp-badge">{{ opp.city }} • {{ opp.domainLabel }}</div>
            <h3 class="opp-title">{{ opp.title }}</h3>
            <p class="opp-desc">{{ opp.summary }}</p>
            <div class="opp-footer">
              <span class="opp-date" *ngIf="opp.startDate">Prévu du {{ opp.startDate }} au {{ opp.endDate }}</span>
              <a routerLink="/communaute" class="btn btn-primary btn-sm">Simuler l'inscription</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Appel d'inscription au Pool -->
    <section class="cta-pool-section">
      <div class="container cta-pool-box">
        <h2>Faites partie du Pool de talents</h2>
        <p>
          Vous avez moins de 35 ans, êtes basé à Yaoundé, Douala ou au Cameroun ?
          Rejoignez le réseau pour recevoir les annonces d'ateliers et candidater à nos futures sessions.
        </p>
        <a routerLink="/communaute" class="btn btn-primary btn-lg">Accéder au formulaire de démonstration →</a>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding: 4rem 0 3.5rem;
      background: linear-gradient(180deg, #f5efe6 0%, #faf7f2 100%);
      border-bottom: 1px solid var(--color-border);
    }
    .hero-container {
      max-width: 860px;
    }
    .hero-badge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      background-color: var(--color-primary-light);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero-title {
      font-size: 2.75rem;
      color: var(--color-text-main);
      margin-bottom: 1.25rem;
      line-height: 1.15;
    }
    .hero-lead {
      font-size: 1.15rem;
      color: var(--color-text-muted);
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
    }
    .messages-section {
      padding: 3.5rem 0;
    }
    .messages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .message-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
    }
    .message-num {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-primary);
      margin-bottom: 0.75rem;
    }
    .message-card h3 {
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
    }
    .message-card p {
      color: var(--color-text-muted);
      margin-bottom: 0;
      font-size: 0.925rem;
    }
    .section-header {
      margin-bottom: 2.5rem;
    }
    .flex-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .section-tag {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--color-primary);
      display: block;
      margin-bottom: 0.4rem;
    }
    .section-lead {
      font-size: 1.05rem;
      color: var(--color-text-muted);
    }
    .domains-overview-section {
      padding: 3.5rem 0;
      background-color: var(--color-surface-subtle);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }
    .domains-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .domain-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
    }
    .domain-title {
      font-size: 1.2rem;
      margin-bottom: 0.25rem;
    }
    .domain-tagline {
      font-size: 0.85rem;
      color: var(--color-primary);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    .domain-desc {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .domain-link {
      font-size: 0.875rem;
      font-weight: 600;
    }
    .opportunities-preview-section {
      padding: 4rem 0;
    }
    .opps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .opp-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
    }
    .opp-badge {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .opp-title {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .opp-desc {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .opp-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .opp-date {
      font-size: 0.8rem;
      color: var(--color-text-light);
    }
    .cta-pool-section {
      padding: 3rem 0 4rem;
    }
    .cta-pool-box {
      background-color: var(--color-primary-dark);
      color: #ffffff;
      padding: 3rem 2rem;
      border-radius: var(--radius-lg);
      text-align: center;
      max-width: 800px;
    }
    .cta-pool-box h2 {
      color: #ffffff;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .cta-pool-box p {
      color: #fed7aa;
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .btn-lg {
      padding: 0.85rem 1.75rem;
      font-size: 1.05rem;
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);
  readonly opportunities = signal<Opportunity[]>([]);

  async ngOnInit(): Promise<void> {
    const [domains, opps] = await Promise.all([
      this.activityRepo.getDomains(),
      this.activityRepo.getOpportunities()
    ]);
    this.domains.set(domains);
    this.opportunities.set(opps);
  }
}
