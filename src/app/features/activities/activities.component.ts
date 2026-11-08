import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo } from '../../domain/models/activity.model';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { DomainGlyphComponent, DOMAIN_COLORS } from '../../shared/components/domain-glyph.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, DomainGlyphComponent],
  template: `
    <app-page-hero eyebrow="Activités et opportunités" heading="La créativité prend plusieurs formes"
      lead="Découvrez différents univers, expérimentez de nouvelles pratiques et développez vos compétences." />

    <div class="container body">
      <p class="disclaimer">Les activités effectivement proposées peuvent varier selon les villes, les périodes et la programmation.</p>

      <div class="list">
        @for (d of domains(); track d.key; let i = $index) {
          <article class="item" [id]="d.key" [style.--c]="color(d.key)" [class.flip]="i % 2 === 1">
            <div class="visual">
              <span class="bigicon"><app-domain-glyph [domain]="d.key" [size]="96" /></span>
              <span class="idx">{{ (i + 1).toString().padStart(2, '0') }}</span>
            </div>
            <div class="content">
              <span class="kicker">{{ d.tagline }}</span>
              <h2>{{ d.name }}</h2>
              <p>{{ d.description }}</p>
              <ul>
                @for (h of d.highlights; track h) { <li>{{ h }}</li> }
              </ul>
              <a [routerLink]="['/opportunites']" [queryParams]="{domain: d.key}" class="btn btn-outline btn-sm">Voir les opportunités →</a>
            </div>
          </article>
        }
      </div>

      <section class="cta">
        <h2>Un domaine vous inspire ?</h2>
        <p>Rejoignez la communauté pour être identifié lors des prochaines activités.</p>
        <a routerLink="/communaute" class="btn btn-primary btn-lg">Rejoindre la communauté</a>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 2.5rem 1rem; }
    .disclaimer { font-size: .88rem; color: var(--text-muted); font-style: italic; margin-bottom: 2.5rem; }
    .list { display: flex; flex-direction: column; gap: 2.5rem; }
    .item { --c: var(--orange); display: grid; grid-template-columns: 280px 1fr; background: var(--white);
            border: 1px solid var(--line); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; overflow: hidden; scroll-margin-top: 6rem; }
    .item.flip { grid-template-columns: 1fr 280px; }
    .item.flip .visual { order: 2; }
    .visual { background: var(--c); color: var(--ink); display: flex; align-items: center; justify-content: center; position: relative; min-height: 240px; }
    .visual::after { content: ''; position: absolute; inset: 14px; border: 2px dashed rgba(20,16,13,.35); border-radius: 22px 4px 22px 4px; }
    .idx { position: absolute; left: 22px; top: 18px; font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; }
    .content { padding: 2.2rem; }
    .kicker { font-size: .75rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; color: var(--orange-deep); }
    .content h2 { margin: .35rem 0 .8rem; }
    .content p { color: var(--text-muted); }
    ul { list-style: none; padding: 0; margin: 1rem 0 1.5rem; display: flex; flex-wrap: wrap; gap: .5rem; }
    li { background: var(--paper-2); border-radius: 999px; padding: .3rem .9rem; font-size: .85rem; font-weight: 500; }
    .cta { text-align: center; background: var(--ink); color: var(--text-on-dark); border-radius: var(--radius-lg); padding: 3rem 1.5rem; margin-top: 4rem; }
    .cta h2 { color: var(--ochre); }
    .cta p { color: var(--text-on-dark-muted); }
    @media (max-width: 760px) {
      .item, .item.flip { grid-template-columns: 1fr; }
      .item.flip .visual { order: 0; }
      .visual { min-height: 150px; }
    }
  `]
})
export class ActivitiesComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);
  color(k: string): string { return DOMAIN_COLORS[k] ?? '#f08a00'; }
  async ngOnInit(): Promise<void> { this.domains.set(await this.repo.getDomains()); }
}
