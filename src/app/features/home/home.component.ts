import { Component, OnInit, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, Opportunity } from '../../domain/models/activity.model';
import { DomainGlyphComponent, DOMAIN_COLORS } from '../../shared/components/domain-glyph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DomainGlyphComponent],
  template: `
    <!-- RUBAN DÉFILANT AVEC MOTIFS SUBTILS -->
    <div class="ticker-wrap" aria-hidden="true">
      <div class="ticker-move">
        <span class="ticker-item"><span class="ticker-star">★</span>MODE &amp; STYLISME</span>
        <span class="ticker-item"><span class="ticker-star">★</span>MUSIQUE &amp; DJING</span>
        <span class="ticker-item"><span class="ticker-star">★</span>RADIO &amp; PODCAST</span>
        <span class="ticker-item"><span class="ticker-star">★</span>NUMÉRIQUE &amp; FABLAB 3D</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ARTS VISUELS</span>
        <span class="ticker-item"><span class="ticker-star">★</span>BMX &amp; CULTURES URBAINES</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ÉVÉNEMENTIEL CULTUREL</span>
        <span class="ticker-item"><span class="ticker-star">★</span>YAOUNDÉ &amp; DOUALA</span>
        <!-- Duplication pour boucle infinie fluide -->
        <span class="ticker-item"><span class="ticker-star">★</span>MODE &amp; STYLISME</span>
        <span class="ticker-item"><span class="ticker-star">★</span>MUSIQUE &amp; DJING</span>
        <span class="ticker-item"><span class="ticker-star">★</span>RADIO &amp; PODCAST</span>
        <span class="ticker-item"><span class="ticker-star">★</span>NUMÉRIQUE &amp; FABLAB 3D</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ARTS VISUELS</span>
        <span class="ticker-item"><span class="ticker-star">★</span>BMX &amp; CULTURES URBAINES</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ÉVÉNEMENTIEL CULTUREL</span>
        <span class="ticker-item"><span class="ticker-star">★</span>YAOUNDÉ &amp; DOUALA</span>
      </div>
    </div>

    <!-- ANCIEN HERO AVEC CAPSULES DIAGONALES ET LÉGÈRE IMAGE EN FOND -->
    <section class="hero cultural-texture-dark">
      <!-- Image légère en arrière-plan -->
      <div class="hero-bg-photo" aria-hidden="true">
        <img src="images/hero-portrait-jeune.jpg" alt="" class="hero-bg-img" />
        <div class="hero-bg-gradient"></div>
      </div>

      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow on-dark">Institut français du Cameroun · Fonds Équipe France</span>
          <h1>Un programme pour révéler les <em>talents</em> de demain</h1>
          <p class="lead">
            La créativité est une force, et chaque jeune mérite de pouvoir développer son potentiel.
            Mboa Jeunes Créatifs offre aux jeunes de moins de 35 ans, à Yaoundé et à Douala,
            un espace d'expression, de formation et de création dans les industries culturelles et créatives.
          </p>

          <div class="actions">
            <a routerLink="/communaute" class="btn btn-primary btn-lg">
              <span>Rejoindre la communauté</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a routerLink="/activites" class="btn btn-outline btn-lg on-dark">Explorer les 7 domaines</a>
          </div>

          <p class="hero-links">
            <a routerLink="/programme">Découvrir le programme</a>
            <span aria-hidden="true">·</span>
            <a routerLink="/opportunites">Découvrir les opportunités</a>
          </p>
        </div>

        <!-- Capsules diagonales iconiques -->
        <div class="capsules" aria-hidden="true">
          <div class="cap c1">
            <app-domain-glyph domain="musique" [size]="54" />
          </div>
          <div class="cap c2">
            <app-domain-glyph domain="mode" [size]="54" />
          </div>
          <div class="cap c3">
            <app-domain-glyph domain="numerique" [size]="54" />
          </div>
          <div class="cap c4">
            <app-domain-glyph domain="arts_visuels" [size]="54" />
          </div>
          <span class="dot d1"></span>
          <span class="dot d2"></span>
          <span class="dot d3"></span>
        </div>
      </div>

      <!-- Barre de séparation avec motif culturel épuré -->
      <div class="pattern-band" aria-hidden="true"></div>
    </section>

    <!-- LES 3 VALEURS CLÉS DU PROGRAMME -->
    <section class="messages">
      <div class="container grid3">
        <article class="msg-card">
          <span class="num">01</span>
          <h2>Pour les jeunes et les étudiants</h2>
          <p>
            Un programme accessible aux moins de 35 ans, qu'ils soient étudiants, autodidactes,
            débutants ou déjà engagés dans une pratique créative.
          </p>
        </article>

        <article class="msg-card">
          <span class="num">02</span>
          <h2>Se former, essayer, rencontrer</h2>
          <p>
            Des ateliers concrets animés par des professionnels : DJing, stylisme, médias et podcasts,
            technologies FabLab et régie de projets.
          </p>
        </article>

        <article class="msg-card">
          <span class="num">03</span>
          <h2>Une information accessible</h2>
          <p>
            Une plateforme claire pour s'orienter, découvrir les opportunités ouvertes et intégrer le réseau
            des jeunes créateurs camerounais.
          </p>
        </article>
      </div>
    </section>

    <!-- SECTION DES 7 DOMAINES COULISSANT SUR LA LARGEUR (HORIZONTAL SLIDER) -->
    <section class="domains-horizontal-section">
      <div class="container">
        <header class="section-head-slider">
          <div class="head-text">
            <span class="eyebrow">Industries culturelles &amp; créatives</span>
            <h2>Sept domaines, mille façons de créer</h2>
            <p>La créativité prend plusieurs formes. Faites défiler les filières pour explorer nos univers d'apprentissage.</p>
          </div>

          <!-- Contrôles de navigation pour faire coulisser le rail -->
          <div class="slider-controls" aria-label="Navigation des domaines">
            <button
              type="button"
              class="slider-btn prev"
              (click)="scrollLeft()"
              aria-label="Domaines précédents"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button
              type="button"
              class="slider-btn next"
              (click)="scrollRight()"
              aria-label="Domaines suivants"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </header>

        <!-- Rail coulissant horizontal -->
        <div class="domains-slider-track" #sliderTrack>
          @for (d of domains(); track d.key) {
            <a
              class="domain-slide-card"
              [routerLink]="['/activites']"
              [fragment]="d.key"
              [style.--c]="color(d.key)"
            >
              <div class="slide-photo-wrap">
                @if (d.image) {
                  <img [src]="d.image" [alt]="d.name" class="slide-img" loading="lazy" />
                }
                <div class="slide-overlay"></div>
                <div class="slide-icon-box">
                  <app-domain-glyph [domain]="d.key" [size]="34" />
                </div>
              </div>

              <div class="slide-info">
                <span class="slide-tag">{{ d.tagline }}</span>
                <h3>{{ d.name }}</h3>
                <p>{{ d.description }}</p>
                <span class="slide-link">
                  <span>Découvrir la filière</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- MOTIF CULTUREL DOUX DE TRANSITION -->
    <div class="pattern-band" aria-hidden="true"></div>

    <!-- SECTION AGENDA / OPPORTUNITÉS -->
    <section class="opps cultural-texture-dark">
      <div class="container">
        <header class="section-head row">
          <div>
            <span class="eyebrow on-dark">Agenda</span>
            <h2>Opportunités à suivre</h2>
          </div>
          <a routerLink="/opportunites" class="btn btn-outline on-dark">Tout l'agenda →</a>
        </header>

        <div class="opp-grid">
          @for (o of opportunities(); track o.id) {
            <article class="opp-card-photo" [style.--c]="color(o.domain)">
              @if (o.image) {
                <div class="opp-thumb-wrap">
                  <img [src]="o.image" [alt]="o.title" class="opp-thumb" loading="lazy" />
                  <span class="opp-city-badge">{{ o.city }}</span>
                </div>
              }
              <div class="opp-body">
                <span class="opp-domain-label">{{ o.domainLabel }}</span>
                <h3>{{ o.title }}</h3>
                <p>{{ o.summary }}</p>
                <div class="opp-foot">
                  @if (o.startDate) {
                    <span class="opp-dates">Du {{ o.startDate }} au {{ o.endDate }}</span>
                  }
                  <a routerLink="/communaute" class="btn btn-primary btn-sm">Participer</a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- BARRE DE MOTIF CULTUREL AVANT LE CTA -->
    <div class="pattern-band" aria-hidden="true"></div>

    <!-- BANNIÈRE D'APPEL FINAL -->
    <section class="cta">
      <div class="container cta-box">
        <div>
          <span class="eyebrow">Pool de talents</span>
          <h2>Faites partie de la communauté</h2>
          <p>
            Laissez votre profil pour être identifié et recontacté lors des prochains ateliers et appels à projets.
          </p>
        </div>
        <a routerLink="/communaute" class="btn btn-secondary btn-lg">
          <span>Rejoindre la communauté</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    /* HERO */
    .hero {
      color: var(--text-on-dark);
      overflow: hidden;
      position: relative;
    }
    .hero-bg-photo {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
    }
    .hero-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      opacity: 0.14;
      filter: saturate(1.2) contrast(1.1);
    }
    .hero-bg-gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 70% 40%, rgba(242, 139, 0, 0.08) 0%, transparent 60%),
                  linear-gradient(180deg, rgba(17, 14, 12, 0.85) 0%, rgba(17, 14, 12, 0.98) 100%);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 2.5rem;
      align-items: center;
      padding-block: 5rem 4.5rem;
      position: relative;
      z-index: 2;
    }
    .hero h1 {
      color: var(--text-on-dark);
      font-size: clamp(2.4rem, 5.4vw, 4.3rem);
      margin-bottom: 1.25rem;
    }
    .hero h1 em {
      font-style: italic;
      color: var(--orange);
    }
    .lead {
      font-size: 1.15rem;
      color: var(--text-on-dark-muted);
      max-width: 35rem;
      margin-bottom: 1.75rem;
      line-height: 1.7;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .hero-links {
      color: var(--text-on-dark-muted);
      font-size: .92rem;
      display: flex;
      gap: .65rem;
      flex-wrap: wrap;
    }
    .hero-links a {
      color: var(--ochre);
      text-decoration: underline;
    }

    /* CAPSULES DIAGONALES ICONIQUES */
    .capsules {
      position: relative;
      height: 440px;
    }
    .cap {
      position: absolute;
      width: 140px;
      height: 370px;
      border-radius: 999px;
      transform: rotate(28deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink);
      box-shadow: 0 24px 50px -15px rgba(0, 0, 0, 0.7);
      transition: transform .3s ease;
    }
    .cap:hover {
      transform: rotate(28deg) translateY(-8px);
    }
    .cap > * {
      transform: rotate(-28deg);
    }
    .c1 { background: var(--orange); left: 0; top: 18px; }
    .c2 { background: var(--red); left: 24%; top: 52px; color: #fff; }
    .c3 { background: var(--green); left: 48%; top: 14px; color: #fff; }
    .c4 { background: var(--cyan); left: 72%; top: 56px; }

    .dot {
      position: absolute;
      border-radius: 50%;
    }
    .d1 { width: 24px; height: 24px; background: var(--ochre); left: 0; top: 0; box-shadow: 0 0 14px var(--ochre); }
    .d2 { width: 16px; height: 16px; background: var(--cyan); left: 48%; bottom: 0; }
    .d3 { width: 20px; height: 20px; background: var(--red); right: 0; bottom: 30px; }

    /* MESSAGES CLÉS */
    .messages {
      padding: 5rem 0 3rem;
    }
    .grid3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.25rem;
    }
    .msg-card {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      padding: 2.25rem;
      box-shadow: var(--shadow-sm);
      transition: all .25s ease;
    }
    .msg-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .num {
      font-family: var(--font-display);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--orange);
      line-height: 1;
      display: block;
      margin-bottom: .85rem;
    }
    .msg-card h2 {
      font-size: 1.45rem;
      margin-bottom: .75rem;
    }
    .msg-card p {
      color: var(--text-muted);
      line-height: 1.65;
      margin: 0;
    }

    /* SECTION DES DOMAINES COULISSANTE (HORIZONTAL SLIDER) */
    .domains-horizontal-section {
      padding: 4.5rem 0 3.5rem;
      overflow: hidden;
    }
    .section-head-slider {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2.5rem;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .head-text {
      max-width: 44rem;
    }
    .head-text h2 {
      font-size: 2.4rem;
      margin-bottom: .5rem;
    }
    .head-text p {
      color: var(--text-muted);
      font-size: 1.1rem;
      margin: 0;
    }
    .slider-controls {
      display: flex;
      gap: .75rem;
    }
    .slider-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid var(--color-border-dark);
      background: var(--white);
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all .2s ease;
    }
    .slider-btn:hover {
      background: var(--ink);
      color: var(--ochre);
      border-color: var(--ink);
      transform: scale(1.05);
    }

    /* Rail coulissant */
    .domains-slider-track {
      display: flex;
      gap: 1.75rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      padding-bottom: 1.5rem;
      padding-top: .5rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: var(--ochre) var(--paper-2);
    }
    .domains-slider-track::-webkit-scrollbar {
      height: 8px;
    }
    .domains-slider-track::-webkit-scrollbar-track {
      background: var(--paper-2);
      border-radius: 999px;
    }
    .domains-slider-track::-webkit-scrollbar-thumb {
      background: var(--ochre);
      border-radius: 999px;
    }

    .domain-slide-card {
      --c: var(--orange);
      flex: 0 0 340px;
      min-width: 320px;
      scroll-snap-align: start;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      box-shadow: var(--shadow-sm);
      transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .domain-slide-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-md);
      border-color: var(--c);
    }
    .slide-photo-wrap {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: var(--ink);
    }
    .slide-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .5s ease;
    }
    .domain-slide-card:hover .slide-img {
      transform: scale(1.08);
    }
    .slide-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(17,14,12,0.7) 100%);
    }
    .slide-icon-box {
      position: absolute;
      bottom: 14px;
      left: 16px;
      width: 48px;
      height: 48px;
      border-radius: 14px 4px 14px 4px;
      background: var(--c);
      color: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 2;
    }

    .slide-info {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .slide-tag {
      font-size: .75rem;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--orange-deep);
      margin-bottom: .4rem;
      display: block;
    }
    .slide-info h3 {
      font-size: 1.35rem;
      margin-bottom: .5rem;
      color: var(--text);
    }
    .slide-info p {
      color: var(--text-muted);
      font-size: .92rem;
      line-height: 1.5;
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .slide-link {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      font-size: .88rem;
      font-weight: 700;
      color: var(--ink);
      transition: gap .2s ease;
    }
    .domain-slide-card:hover .slide-link {
      gap: .8rem;
      color: var(--orange-deep);
    }

    /* AGENDA / OPPORTUNITÉS */
    .opps {
      padding: 5rem 0;
      color: var(--text-on-dark);
    }
    .opps h2 {
      color: var(--ochre);
      font-size: 2.2rem;
      margin: 0;
    }
    .opp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .opp-card-photo {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-sm);
      transition: all .25s ease;
      color: var(--text);
    }
    .opp-card-photo:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-md);
    }
    .opp-thumb-wrap {
      position: relative;
      height: 190px;
      overflow: hidden;
    }
    .opp-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .5s ease;
    }
    .opp-card-photo:hover .opp-thumb {
      transform: scale(1.06);
    }
    .opp-city-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(17,14,12,0.85);
      backdrop-filter: blur(6px);
      color: var(--ochre);
      font-size: .75rem;
      font-weight: 700;
      padding: .25rem .7rem;
      border-radius: 999px;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .opp-body {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .opp-domain-label {
      font-size: .75rem;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--orange-deep);
      margin-bottom: .4rem;
    }
    .opp-body h3 {
      font-size: 1.35rem;
      margin-bottom: .6rem;
    }
    .opp-body p {
      color: var(--text-muted);
      font-size: .94rem;
      line-height: 1.5;
      flex: 1;
      margin-bottom: 1.25rem;
    }
    .opp-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--line);
      flex-wrap: wrap;
      gap: .75rem;
    }
    .opp-dates {
      font-size: .84rem;
      font-weight: 600;
      color: var(--text);
    }

    /* BANNIÈRE FINALE */
    .cta {
      padding: 4.5rem 0 2rem;
    }
    .cta-box {
      background: var(--ochre);
      border-radius: var(--radius-lg);
      padding: 3.5rem 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
      box-shadow: var(--shadow-md);
    }
    .cta-box > div {
      max-width: 38rem;
    }
    .cta h2 {
      margin-bottom: .6rem;
      font-size: 2.2rem;
    }
    .cta p {
      margin: 0;
      color: var(--ink-3);
      font-size: 1.08rem;
    }
    .cta .eyebrow {
      color: var(--ink);
    }

    @media (max-width: 900px) {
      .hero-grid {
        grid-template-columns: 1fr;
        padding-block: 3.5rem 2.5rem;
      }
      .capsules {
        height: 300px;
      }
      .cap {
        width: 100px;
        height: 260px;
      }
      .section-head-slider {
        flex-direction: column;
        align-items: flex-start;
      }
      .slider-controls {
        align-self: flex-end;
      }
      .domain-slide-card {
        flex: 0 0 280px;
        min-width: 280px;
      }
      .cta-box {
        padding: 2.5rem 1.75rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);
  readonly opportunities = signal<Opportunity[]>([]);

  @ViewChild('sliderTrack') sliderTrack?: ElementRef<HTMLDivElement>;

  color(key: string): string {
    return DOMAIN_COLORS[key] ?? '#f28b00';
  }

  scrollLeft(): void {
    if (this.sliderTrack) {
      this.sliderTrack.nativeElement.scrollBy({ left: -360, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.sliderTrack) {
      this.sliderTrack.nativeElement.scrollBy({ left: 360, behavior: 'smooth' });
    }
  }

  async ngOnInit(): Promise<void> {
    const [d, o] = await Promise.all([
      this.repo.getDomains(),
      this.repo.getOpportunities()
    ]);
    this.domains.set(d);
    this.opportunities.set(o);
  }
}
