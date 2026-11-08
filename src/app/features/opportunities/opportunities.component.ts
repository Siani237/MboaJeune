import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, Opportunity } from '../../domain/models/activity.model';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { DOMAIN_COLORS } from '../../shared/components/domain-glyph.component';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [RouterLink, EmptyStateComponent, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Agenda officiel"
      heading="Opportunités &amp; Sessions d'ateliers"
      lead="Consultez les dates, lieux, critères d'éligibilité et postulez directement aux prochaines sessions ouvertes à Yaoundé et Douala."
    />

    <div class="container body">
      <div class="filter-bar">
        <div class="filter-controls">
          <label for="domain-select">Filtrer par filière :</label>
          <select id="domain-select" class="form-control" [value]="selected()" (change)="onChange($event)">
            <option value="">Toutes les filières</option>
            @for (d of domains(); track d.key) {
              <option [value]="d.key">{{ d.name }}</option>
            }
          </select>
        </div>
        <span class="count">{{ filtered().length }} atelier(s) programmé(s)</span>
      </div>

      @if (filtered().length > 0) {
        <div class="list">
          @for (o of filtered(); track o.id) {
            <article class="opp-card" [style.--c]="color(o.domain)">
              <div class="opp-media-side">
                @if (o.image) {
                  <img [src]="o.image" [alt]="o.title" class="opp-img" loading="lazy">
                }
                <div class="date-badge">
                  <span class="m">{{ month(o.startDate) }}</span>
                  <span class="d">{{ day(o.startDate) }}</span>
                </div>
              </div>

              <div class="main">
                <div class="meta-row">
                  <span class="opp-tag">{{ o.domainLabel }}</span>
                  <span class="opp-city">{{ o.city }}</span>
                  <span class="badge" [class]="badgeClass(o.registrationStatus)">
                    {{ label(o.registrationStatus) }}
                  </span>
                </div>

                <h2>{{ o.title }}</h2>
                <p class="summary-text">{{ o.summary }}</p>
                <p class="desc-text">{{ o.description }}</p>

                <dl class="details-grid">
                  @if (o.venue) {
                    <div>
                      <dt>Lieu</dt>
                      <dd>{{ o.venue }}</dd>
                    </div>
                  }
                  @if (o.startDate) {
                    <div>
                      <dt>Période</dt>
                      <dd>Du {{ o.startDate }} au {{ o.endDate }}</dd>
                    </div>
                  }
                  @if (o.capacity) {
                    <div>
                      <dt>Capacité</dt>
                      <dd>{{ o.capacity }} participants max</dd>
                    </div>
                  }
                  @if (o.eligibilityNotes) {
                    <div>
                      <dt>Public visé</dt>
                      <dd>{{ o.eligibilityNotes }}</dd>
                    </div>
                  }
                </dl>
              </div>

              <div class="side-action">
                <a routerLink="/communaute" class="btn btn-primary">
                  <span>Participer</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          }
        </div>
      } @else {
        <app-empty-state
          title="Aucune session actuellement ouverte dans cette filière"
          message="Les prochaines dates d'ateliers seront annoncées très prochainement. Inscrivez-vous au Pool de talents pour être contacté en priorité."
        >
          <a routerLink="/communaute" class="btn btn-primary" style="margin-top:1.5rem">
            Rejoindre le Pool de talents
          </a>
        </app-empty-state>
      }
    </div>
  `,
  styles: [`
    .body { padding-block: 3.5rem 2rem; }
    .filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      background: var(--paper-2);
      border-radius: 999px;
      padding: .85rem 1.85rem;
      margin-bottom: 2.75rem;
      border: 1px solid var(--line);
    }
    .filter-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .filter-controls label {
      font-weight: 700;
      font-size: .95rem;
      white-space: nowrap;
    }
    .filter-controls select {
      max-width: 320px;
      border-radius: 999px;
      padding: .5rem 1rem;
    }
    .count {
      font-size: .9rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .opp-card {
      --c: var(--orange);
      display: grid;
      grid-template-columns: 240px 1fr auto;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all .25s ease;
    }
    .opp-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .opp-media-side {
      position: relative;
      height: 100%;
      min-height: 220px;
      background: var(--ink);
    }
    .opp-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .date-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: var(--c);
      color: var(--ink);
      padding: .5rem .85rem;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .date-badge .m {
      font-size: .75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .12em;
    }
    .date-badge .d {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 800;
      line-height: 1;
    }

    .main {
      padding: 2rem 2.25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: .85rem;
      margin-bottom: .6rem;
      flex-wrap: wrap;
    }
    .opp-tag {
      font-size: .78rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--orange-deep);
    }
    .opp-city {
      font-size: .88rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .main h2 {
      font-size: 1.65rem;
      margin-bottom: .65rem;
    }
    .summary-text {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: .5rem;
    }
    .desc-text {
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: .75rem 1.5rem;
      margin: 0;
      background: var(--paper-2);
      padding: 1rem 1.25rem;
      border-radius: 14px;
    }
    .details-grid dt {
      font-size: .7rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--color-text-light);
      font-weight: 700;
      margin-bottom: .15rem;
    }
    .details-grid dd {
      margin: 0;
      font-size: .92rem;
      font-weight: 600;
      color: var(--text);
    }

    .side-action {
      padding: 2rem 2rem 2rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 900px) {
      .opp-card { grid-template-columns: 1fr; }
      .opp-media-side { height: 180px; }
      .date-badge { flex-direction: row; gap: .5rem; }
      .date-badge .d { font-size: 1.3rem; }
      .side-action { padding: 0 2rem 2rem 2rem; justify-content: flex-start; }
    }
  `]
})
export class OpportunitiesComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  private readonly route = inject(ActivatedRoute);

  readonly domains = signal<DomainInfo[]>([]);
  readonly all = signal<Opportunity[]>([]);
  readonly selected = signal('');
  readonly filtered = computed(() => {
    const s = this.selected();
    return s ? this.all().filter(o => o.domain === s) : this.all();
  });

  async ngOnInit(): Promise<void> {
    const [d, o] = await Promise.all([this.repo.getDomains(), this.repo.getOpportunities()]);
    this.domains.set(d);
    this.all.set(o);
    this.route.queryParams.subscribe(p => {
      if (p['domain']) this.selected.set(p['domain']);
    });
  }

  onChange(e: Event): void {
    this.selected.set((e.target as HTMLSelectElement).value);
  }
  color(k: string): string {
    return DOMAIN_COLORS[k] ?? '#f28b00';
  }
  month(d?: string): string {
    return d ? new Date(d).toLocaleDateString('fr-FR', { month: 'short' }) : '—';
  }
  day(d?: string): string {
    return d ? String(new Date(d).getDate()) : '—';
  }
  badgeClass(s: string): string {
    return 'badge ' + (s === 'open' ? 'badge-selected' : s === 'soon' ? 'badge-review' : 'badge-new');
  }
  label(s: string): string {
    return s === 'open' ? 'Inscriptions ouvertes' : s === 'soon' ? 'Prochainement' : 'Clôturé';
  }
}
