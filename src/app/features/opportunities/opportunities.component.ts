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
    <app-page-hero eyebrow="Agenda" heading="Opportunités et ateliers"
      lead="Description, dates, lieux, publics concernés et modalités d'inscription lorsqu'elles sont confirmées." />

    <div class="container body">
      <div class="filter">
        <label for="domain-select">Filtrer par domaine</label>
        <select id="domain-select" class="form-control" [value]="selected()" (change)="onChange($event)">
          <option value="">Tous les domaines</option>
          @for (d of domains(); track d.key) { <option [value]="d.key">{{ d.name }}</option> }
        </select>
        <span class="count">{{ filtered().length }} résultat(s)</span>
      </div>

      <p class="mock-note">Les fiches ci-dessous sont des <strong>exemples fictifs de démonstration</strong>, pas une programmation officielle.</p>

      @if (filtered().length > 0) {
        <div class="list">
          @for (o of filtered(); track o.id) {
            <article class="opp" [style.--c]="color(o.domain)">
              <div class="date-block">
                <span class="m">{{ month(o.startDate) }}</span>
                <span class="d">{{ day(o.startDate) }}</span>
              </div>
              <div class="main">
                <p class="meta">{{ o.domainLabel }} · {{ o.city }}</p>
                <h2>{{ o.title }}</h2>
                <p>{{ o.description }}</p>
                <dl>
                  @if (o.venue) { <div><dt>Lieu</dt><dd>{{ o.venue }}</dd></div> }
                  @if (o.startDate) { <div><dt>Dates</dt><dd>{{ o.startDate }} → {{ o.endDate }}</dd></div> }
                  @if (o.capacity) { <div><dt>Places</dt><dd>{{ o.capacity }}</dd></div> }
                  @if (o.eligibilityNotes) { <div><dt>Public</dt><dd>{{ o.eligibilityNotes }}</dd></div> }
                </dl>
              </div>
              <div class="side">
                <span class="badge" [class]="badgeClass(o.registrationStatus)">{{ label(o.registrationStatus) }}</span>
                <a routerLink="/communaute" class="btn btn-secondary btn-sm">Rejoindre le Pool</a>
              </div>
            </article>
          }
        </div>
      } @else {
        <app-empty-state title="Aucune opportunité pour le moment"
          message="Aucune activité n'est ouverte pour ce domaine. Les prochaines dates seront publiées après validation par l'IFC.">
          <a routerLink="/communaute" class="btn btn-primary" style="margin-top:1.25rem">Rejoindre la communauté</a>
        </app-empty-state>
      }
    </div>
  `,
  styles: [`
    .body { padding-block: 2.5rem 1rem; }
    .filter { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; background: var(--paper-2); border-radius: 999px; padding: .6rem 1.4rem; margin-bottom: 1rem; }
    .filter label { font-weight: 700; font-size: .9rem; }
    .filter select { max-width: 320px; border-radius: 999px; }
    .count { margin-left: auto; font-size: .85rem; color: var(--text-muted); }
    .mock-note { font-size: .85rem; color: var(--text-muted); margin-bottom: 2rem; }
    .list { display: flex; flex-direction: column; gap: 1.5rem; }
    .opp { --c: var(--orange); display: grid; grid-template-columns: 110px 1fr auto; background: var(--white); border: 1px solid var(--line);
           border-radius: var(--radius-leaf); overflow: hidden; }
    .date-block { background: var(--c); color: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; }
    .m { font-size: .8rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; }
    .d { font-family: var(--font-display); font-size: 3rem; font-weight: 800; line-height: 1; }
    .main { padding: 1.6rem 1.8rem; }
    .meta { font-size: .75rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; color: var(--orange-deep); margin-bottom: .4rem; }
    .main h2 { font-size: 1.6rem; margin-bottom: .6rem; }
    .main > p { color: var(--text-muted); }
    dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: .75rem 1.5rem; margin: 1rem 0 0; }
    dt { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--color-text-light); font-weight: 700; }
    dd { margin: 0; font-size: .9rem; font-weight: 500; }
    .side { padding: 1.6rem; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 1rem; }
    @media (max-width: 800px) {
      .opp { grid-template-columns: 1fr; }
      .date-block { flex-direction: row; gap: .8rem; justify-content: flex-start; }
      .d { font-size: 1.8rem; }
      .side { align-items: flex-start; flex-direction: row; flex-wrap: wrap; padding-top: 0; }
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
    this.route.queryParams.subscribe(p => { if (p['domain']) this.selected.set(p['domain']); });
  }

  onChange(e: Event): void { this.selected.set((e.target as HTMLSelectElement).value); }
  color(k: string): string { return DOMAIN_COLORS[k] ?? '#f08a00'; }
  month(d?: string): string { return d ? new Date(d).toLocaleDateString('fr-FR', { month: 'short' }) : '—'; }
  day(d?: string): string { return d ? String(new Date(d).getDate()) : '—'; }
  badgeClass(s: string): string { return 'badge ' + (s === 'open' ? 'badge-selected' : s === 'soon' ? 'badge-review' : 'badge-new'); }
  label(s: string): string { return s === 'open' ? 'Inscriptions ouvertes' : s === 'soon' ? 'Prochainement' : 'Clôturé'; }
}
