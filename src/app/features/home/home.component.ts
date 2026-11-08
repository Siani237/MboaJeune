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

    <!-- HERO CINÉMATIQUE (STYLE 'BANGUI L'OUBLIÉE' / DOCUMENTAIRE HAUTE FIDÉLITÉ) -->
    <section class="hero-cinematic">
      <!-- Arrière-plan photo immersif avec color grading chaleureux et vignette -->
      <div class="hero-cinematic-bg" aria-hidden="true"></div>
      <div class="hero-cinematic-overlay" aria-hidden="true"></div>

      <div class="container hero-cinematic-content">
        <!-- Logo / Partenaires en haut au centre -->
        <div class="hero-presenter-badge">
          <div class="presenter-mark">
            <span class="flag-dot cm-green"></span>
            <span class="flag-dot cm-red"></span>
            <span class="flag-dot cm-yellow"></span>
          </div>
          <span class="presenter-names">INSTITUT FRANÇAIS DU CAMEROUN • FONDS ÉQUIPE FRANCE</span>
          <span class="presenter-tag">PRÉSENTENT</span>
        </div>

        <!-- Titre monumental centré en typographie d'affiche -->
        <h1 class="hero-cinematic-title">
          <span class="title-line title-mboa">MBOA</span>
          <span class="title-line title-sub">JEUNES CRÉATIFS</span>
        </h1>

        <!-- Sous-titre immersif en capitales aérées -->
        <p class="hero-cinematic-lead">
          UNE IMMERSION AU CŒUR DE LA CRÉATION, DE LA FORMATION ET DE L'INNOVATION POUR LA JEUNESSE CAMEROUNAISE
        </p>

        <!-- Bouton CTA principal style 'COMMENCER L'EXPÉRIENCE' vibrant et lumineux -->
        <div class="hero-cinematic-cta-group">
          <a routerLink="/talents/candidater" class="btn-cinematic-primary">
            COMMENCER L'EXPÉRIENCE
          </a>
          <div class="hero-cinematic-secondary">
            <a routerLink="/activites" class="cinematic-sublink">Explorer les 7 filières</a>
            <span class="sublink-dot">•</span>
            <a routerLink="/programme" class="cinematic-sublink">Le programme</a>
            <span class="sublink-dot">•</span>
            <a routerLink="/opportunites" class="cinematic-sublink">L'agenda</a>
          </div>
        </div>

        <!-- Pied de page cinématique intégré au bas du hero -->
        <div class="hero-cinematic-footer">
          <div class="foot-col foot-left">
            <span class="foot-meta-label">REJOINDRE LE MOUVEMENT</span>
            <span class="foot-meta-val">#MBOAJEUNESCREATIFS</span>
          </div>
          <div class="foot-col foot-center">
            <a href="#valeurs-programme" class="foot-scroll-indicator" aria-label="Défiler pour explorer le programme">
              <span class="scroll-label">DÉCOUVRIR LE PROGRAMME</span>
              <svg class="scroll-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
          </div>
          <div class="foot-col foot-right">
            <span class="foot-meta-label">CAMEROUN • MOINS DE 35 ANS</span>
            <span class="foot-meta-val">YAOUNDÉ &amp; DOUALA</span>
          </div>
        </div>
      </div>

      <!-- Barre de transition avec motif culturel épuré -->
      <div class="pattern-band hero-bottom-band" aria-hidden="true"></div>
    </section>

    <!-- LES 3 VALEURS CLÉS DU PROGRAMME -->
    <section class="messages" id="valeurs-programme">
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
    /* HERO CINÉMATIQUE (STYLE 'BANGUI L'OUBLIÉE' / DOCUMENTAIRE HAUTE FIDÉLITÉ) */
    .hero-cinematic {
      position: relative;
      min-height: calc(90vh - 72px);
      min-height: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background-color: var(--ink);
      color: #ffffff;
      padding: 4.5rem 0 0;
    }

    .hero-cinematic-bg {
      position: absolute;
      inset: 0;
      background-image: url('/images/hero-cinematic.jpg');
      background-size: cover;
      background-position: center 35%;
      background-repeat: no-repeat;
      transform: scale(1.02);
      filter: saturate(1.15) contrast(1.08);
      z-index: 1;
    }

    .hero-cinematic-overlay {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at center, rgba(17, 14, 12, 0.42) 0%, rgba(17, 14, 12, 0.88) 100%),
        linear-gradient(180deg, rgba(17, 14, 12, 0.88) 0%, rgba(17, 14, 12, 0.28) 45%, rgba(17, 14, 12, 0.98) 100%);
      z-index: 2;
    }

    .hero-cinematic-content {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 1040px;
      margin: auto auto 0;
      padding: 1rem 1.5rem 2rem;
      width: 100%;
    }

    /* Badge Présentateur */
    .hero-presenter-badge {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: .35rem;
      margin-bottom: 1.5rem;
    }
    .presenter-mark {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-bottom: .2rem;
    }
    .flag-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
    .flag-dot.cm-green { background: #2a9d47; }
    .flag-dot.cm-red { background: #d8402e; }
    .flag-dot.cm-yellow { background: #f28b00; }

    .presenter-names {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.88);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
    }
    .presenter-tag {
      font-size: .65rem;
      font-weight: 800;
      letter-spacing: .35em;
      text-transform: uppercase;
      color: var(--ochre);
      opacity: .95;
    }

    /* Titre monumental centré en typographie d'affiche */
    .hero-cinematic-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 0 1.25rem;
      font-family: var(--font-poster, 'Bebas Neue', 'Syne', sans-serif);
      text-transform: uppercase;
      line-height: 0.9;
      color: #ffffff;
      text-shadow:
        0 4px 30px rgba(0, 0, 0, 0.95),
        0 2px 8px rgba(0, 0, 0, 0.85);
      user-select: none;
    }
    .title-line.title-mboa {
      font-size: clamp(3.8rem, 11vw, 7.8rem);
      letter-spacing: 0.08em;
      color: #ffffff;
    }
    .title-line.title-sub {
      font-size: clamp(2.3rem, 6.2vw, 4.6rem);
      letter-spacing: 0.12em;
      color: #ffffff;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
    }

    /* Sous-titre immersif en capitales aérées */
    .hero-cinematic-lead {
      font-family: var(--font-sans);
      font-size: clamp(0.82rem, 1.3vw, 1.05rem);
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.92);
      max-width: 720px;
      line-height: 1.65;
      margin: 0 auto 2.25rem;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
    }

    /* Bouton CTA principal style 'COMMENCER L'EXPÉRIENCE' vibrant et lumineux */
    .hero-cinematic-cta-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 3.5rem;
    }
    .btn-cinematic-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f28b00 0%, #d97706 100%);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: .95rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 1.05rem 2.85rem;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow:
        0 0 25px rgba(242, 139, 0, 0.45),
        0 6px 20px rgba(0, 0, 0, 0.45);
      transition: all .25s ease;
      text-decoration: none;
    }
    .btn-cinematic-primary:hover {
      background: linear-gradient(135deg, #ff981a 0%, #f28b00 100%);
      transform: translateY(-2px) scale(1.02);
      box-shadow:
        0 0 35px rgba(242, 139, 0, 0.65),
        0 8px 24px rgba(0, 0, 0, 0.5);
      border-color: rgba(255, 255, 255, 0.6);
      color: #ffffff;
    }

    .hero-cinematic-secondary {
      display: inline-flex;
      align-items: center;
      gap: .75rem;
      font-size: .84rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.8);
      flex-wrap: wrap;
      justify-content: center;
    }
    .cinematic-sublink {
      color: rgba(255, 255, 255, 0.88);
      font-weight: 600;
      transition: color .2s ease;
      text-decoration: none;
    }
    .cinematic-sublink:hover {
      color: var(--ochre);
      text-decoration: underline;
    }
    .sublink-dot {
      color: rgba(255, 255, 255, 0.4);
    }

    /* Pied de page cinématique intégré au bas du hero */
    .hero-cinematic-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      margin-top: auto;
    }
    .foot-col {
      display: flex;
      flex-direction: column;
    }
    .foot-col.foot-left {
      align-items: flex-start;
      text-align: left;
    }
    .foot-col.foot-center {
      align-items: center;
    }
    .foot-col.foot-right {
      align-items: flex-end;
      text-align: right;
    }
    .foot-meta-label {
      font-size: .65rem;
      font-weight: 700;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: .2rem;
    }
    .foot-meta-val {
      font-size: .78rem;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--ochre);
    }
    .foot-scroll-indicator {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      font-size: .72rem;
      font-weight: 700;
      letter-spacing: .15em;
      text-transform: uppercase;
      padding: .4rem .9rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all .2s ease;
    }
    .foot-scroll-indicator:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.35);
    }
    .scroll-arrow {
      animation: bounceDown 1.8s infinite;
    }
    @keyframes bounceDown {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(4px); }
    }
    .hero-bottom-band {
      width: 100%;
      position: relative;
      z-index: 4;
    }

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
    .section-head.row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1.5rem;
      margin-bottom: 3.25rem; /* Espacement aéré net garantissant que le bouton Tout l'agenda n'est pas collé aux cartes */
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
      .hero-cinematic {
        min-height: 560px;
        padding-top: 3.5rem;
      }
      .hero-cinematic-footer {
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
        text-align: center;
      }
      .foot-col.foot-left,
      .foot-col.foot-right {
        align-items: center;
        text-align: center;
      }
      .section-head.row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
        margin-bottom: 2.25rem;
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
