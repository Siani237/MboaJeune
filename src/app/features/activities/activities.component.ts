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
    <app-page-hero
      eyebrow="Activités et filières"
      heading="Sept univers pour révéler votre talent"
      lead="Explorez nos programmes de formation, expérimentez des technologies créatives de pointe et intégrez un réseau de créateurs passionnés."
    />

    <div class="container body">
      <div class="list">
        @for (d of domains(); track d.key; let i = $index) {
          <article class="item" [id]="d.key" [style.--c]="color(d.key)" [class.flip]="i % 2 === 1">
            <div class="visual">
              @if (d.image) {
                <img [src]="d.image" [alt]="d.name" class="visual-img" loading="lazy">
                <div class="visual-overlay"></div>
              }
              <div class="visual-badge-overlay">
                <span class="bigicon"><app-domain-glyph [domain]="d.key" [size]="54" /></span>
                <span class="idx">{{ (i + 1).toString().padStart(2, '0') }}</span>
              </div>
            </div>

            <div class="content">
              <span class="kicker">{{ d.tagline }}</span>
              <h2>{{ d.name }}</h2>
              <p>{{ d.description }}</p>
              
              <div class="highlights-block">
                <h4>Ateliers &amp; Compétences clés :</h4>
                <ul>
                  @for (h of d.highlights; track h) {
                    <li>
                      <span class="dot"></span>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="actions-row">
                <a [routerLink]="['/opportunites']" [queryParams]="{domain: d.key}" class="btn btn-primary btn-sm">
                  Voir les opportunités
                </a>
                <a routerLink="/communaute" class="btn btn-outline btn-sm">
                  Rejoindre le Pool
                </a>
              </div>
            </div>
          </article>
        }
      </div>

      <section class="cta-strip card">
        <div class="cta-inner">
          <div>
            <h2>Une filière vous inspire ?</h2>
            <p>Rejoignez la communauté Mboa Jeunes Créatifs pour être contacté dès le lancement de la prochaine session.</p>
          </div>
          <a routerLink="/communaute" class="btn btn-secondary btn-lg">Rejoindre la communauté →</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 4rem 2rem; }
    .list { display: flex; flex-direction: column; gap: 3.5rem; }
    .item {
      --c: var(--orange);
      display: grid;
      grid-template-columns: 380px 1fr;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      overflow: hidden;
      scroll-margin-top: 6rem;
      box-shadow: var(--shadow-sm);
      transition: all .3s ease;
    }
    .item:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
    }
    .item.flip { grid-template-columns: 1fr 380px; }
    .item.flip .visual { order: 2; }

    .visual {
      position: relative;
      background: var(--c);
      min-height: 320px;
      overflow: hidden;
    }
    .visual-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s ease;
    }
    .item:hover .visual-img {
      transform: scale(1.06);
    }
    .visual-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(17,14,12,0.2) 0%, rgba(17,14,12,0.7) 100%);
    }
    .visual-badge-overlay {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      gap: .85rem;
      z-index: 2;
    }
    .bigicon {
      width: 60px;
      height: 60px;
      border-radius: 18px 4px 18px 4px;
      background: var(--c);
      color: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
    .idx {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.6rem;
      color: #ffffff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }

    .content { padding: 3rem 2.75rem; display: flex; flex-direction: column; justify-content: center; }
    .kicker { font-size: .8rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 800; color: var(--orange-deep); margin-bottom: .4rem; display: block; }
    .content h2 { font-size: 2rem; margin-bottom: .85rem; }
    .content > p { color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; }

    .highlights-block {
      background: var(--paper-2);
      padding: 1.25rem 1.5rem;
      border-radius: 16px;
      margin-bottom: 2rem;
    }
    .highlights-block h4 {
      font-size: .82rem;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--ink);
      margin-bottom: .75rem;
    }
    .highlights-block ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: .65rem;
    }
    .highlights-block li {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: .9rem;
      font-weight: 600;
      color: var(--text);
    }
    .highlights-block .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--orange);
      flex-shrink: 0;
    }

    .actions-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .cta-strip {
      background: var(--ink);
      color: var(--text-on-dark);
      border-radius: var(--radius-lg);
      padding: 3rem;
      margin-top: 5rem;
    }
    .cta-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .cta-inner h2 { color: var(--ochre); margin-bottom: .5rem; }
    .cta-inner p { color: var(--text-on-dark-muted); margin: 0; max-width: 36rem; font-size: 1.05rem; }

    @media (max-width: 900px) {
      .item, .item.flip { grid-template-columns: 1fr; }
      .item.flip .visual { order: 0; }
      .visual { min-height: 240px; }
      .content { padding: 2rem; }
      .cta-strip { padding: 2rem; }
    }
  `]
})
export class ActivitiesComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);

  color(k: string): string {
    return DOMAIN_COLORS[k] ?? '#f28b00';
  }

  async ngOnInit(): Promise<void> {
    this.domains.set(await this.repo.getDomains());
  }
}
