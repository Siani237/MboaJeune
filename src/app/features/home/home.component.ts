import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, Opportunity } from '../../domain/models/activity.model';
import { DomainGlyphComponent, DOMAIN_COLORS } from '../../shared/components/domain-glyph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DomainGlyphComponent],
  template: `
    <!-- RUBAN DÉFILANT ANIMÉ -->
    <div class="ticker-wrap" aria-hidden="true">
      <div class="ticker-move">
        <span class="ticker-item"><span class="ticker-star">★</span>MODE &amp; STYLISME</span>
        <span class="ticker-item"><span class="ticker-star">★</span>MUSIQUE &amp; DJING</span>
        <span class="ticker-item"><span class="ticker-star">★</span>RADIO &amp; PODCAST</span>
        <span class="ticker-item"><span class="ticker-star">★</span>NUMÉRIQUE &amp; 3D FABLAB</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ARTS VISUELS</span>
        <span class="ticker-item"><span class="ticker-star">★</span>BMX &amp; CULTURES URBAINES</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ÉVÉNEMENTIEL CULTUREL</span>
        <span class="ticker-item"><span class="ticker-star">★</span>YAOUNDÉ &amp; DOUALA</span>
        <!-- Duplication pour boucle infinie sans saut -->
        <span class="ticker-item"><span class="ticker-star">★</span>MODE &amp; STYLISME</span>
        <span class="ticker-item"><span class="ticker-star">★</span>MUSIQUE &amp; DJING</span>
        <span class="ticker-item"><span class="ticker-star">★</span>RADIO &amp; PODCAST</span>
        <span class="ticker-item"><span class="ticker-star">★</span>NUMÉRIQUE &amp; 3D FABLAB</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ARTS VISUELS</span>
        <span class="ticker-item"><span class="ticker-star">★</span>BMX &amp; CULTURES URBAINES</span>
        <span class="ticker-item"><span class="ticker-star">★</span>ÉVÉNEMENTIEL CULTUREL</span>
        <span class="ticker-item"><span class="ticker-star">★</span>YAOUNDÉ &amp; DOUALA</span>
      </div>
    </div>

    <!-- GRAND HERO IMMERSIF AVEC PHOTO ET BADGES FLOTTANTS -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow on-dark">Institut français du Cameroun · Fonds Équipe France</span>
          <h1>Un programme pour révéler les <em>talents</em> de demain</h1>
          <p class="lead">
            La créativité est une force, et chaque jeune mérite de pouvoir développer son potentiel.
            Mboa Jeunes Créatifs offre aux jeunes de moins de 35 ans, à <strong>Yaoundé</strong> et à <strong>Douala</strong>,
            un espace d'apprentissage, d'expression artistique et d'insertion dans les industries culturelles et créatives.
          </p>

          <div class="actions">
            <a routerLink="/communaute" class="btn btn-primary btn-lg">
              <span>Rejoindre la communauté</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a routerLink="/activites" class="btn btn-outline btn-lg on-dark">Explorer les 7 domaines</a>
          </div>

          <div class="trust-strip">
            <div class="trust-item">
              <strong>100% Gratuit</strong>
              <span>Accès libre aux ateliers</span>
            </div>
            <div class="trust-divider" aria-hidden="true"></div>
            <div class="trust-item">
              <strong>Moins de 35 ans</strong>
              <span>Étudiants &amp; passionnés</span>
            </div>
            <div class="trust-divider" aria-hidden="true"></div>
            <div class="trust-item">
              <strong>2 Villes</strong>
              <span>Yaoundé &amp; Douala</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="photo-frame">
            <img
              src="images/hero-portrait-jeune.jpg"
              alt="Jeune créateur du programme Mboa Jeunes Créatifs"
              class="hero-img"
            />
            <div class="frame-overlay" aria-hidden="true"></div>

            <!-- Badges flottants dynamiques -->
            <div class="float-card card-badge-1 float-anim">
              <span class="float-icon">🎨</span>
              <div>
                <strong>7 Filières Créatives</strong>
                <small>Formation &amp; Ateliers</small>
              </div>
            </div>

            <div class="float-card card-badge-2">
              <span class="float-dot"></span>
              <div>
                <strong>Inscriptions ouvertes</strong>
                <small>Pool de talents 2026</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pattern-band-light" aria-hidden="true"></div>
    </section>

    <!-- LES 3 VALEURS CLÉS DU PROGRAMME -->
    <section class="messages">
      <div class="container grid3">
        <article class="msg-card">
          <div class="msg-header">
            <span class="num">01</span>
            <span class="msg-tag">Accessible à tous</span>
          </div>
          <h2>Pour les jeunes et les étudiants</h2>
          <p>
            Que vous soyez étudiant, autodidacte, débutant ou déjà engagé dans une démarche artistique,
            le programme vous accueille pour développer votre créativité sans barrière d'entrée.
          </p>
        </article>

        <article class="msg-card">
          <div class="msg-header">
            <span class="num">02</span>
            <span class="msg-tag">Pratique &amp; Métiers</span>
          </div>
          <h2>Se former, expérimenter, rencontrer</h2>
          <p>
            Des ateliers concrets animés par des professionnels reconnus : DJing, stylisme, régie événementielle,
            fabrication numérique FabLab et production de podcasts.
          </p>
        </article>

        <article class="msg-card">
          <div class="msg-header">
            <span class="num">03</span>
            <span class="msg-tag">Réseau &amp; Avenir</span>
          </div>
          <h2>Propulser vos projets créatifs</h2>
          <p>
            Rejoignez un réseau solidaire d'artistes et d'entrepreneurs pour échanger des compétences,
            participer à des résidences et accéder à des opportunités professionnelles réelles.
          </p>
        </article>
      </div>
    </section>

    <!-- SECTION DES 7 DOMAINES AVEC GRANDES PHOTOS ÉDITORIALES -->
    <section class="domains">
      <div class="container">
        <header class="section-head">
          <span class="eyebrow">Industries culturelles &amp; créatives</span>
          <h2>Sept domaines, mille façons de créer</h2>
          <p>Choisissez la filière qui fait battre votre imagination et découvrez nos ateliers spécialisés.</p>
        </header>

        <div class="domain-grid">
          @for (d of domains(); track d.key) {
            <a class="domain-card-rich" [routerLink]="['/activites']" [fragment]="d.key" [style.--c]="color(d.key)">
              <div class="domain-bg-wrap">
                @if (d.image) {
                  <img [src]="d.image" [alt]="d.name" class="domain-bg-img" loading="lazy" />
                }
                <div class="domain-overlay"></div>
              </div>

              <div class="domain-content">
                <div class="domain-top">
                  <span class="domain-icon-box">
                    <app-domain-glyph [domain]="d.key" [size]="34" />
                  </span>
                  <span class="domain-pill">{{ d.tagline }}</span>
                </div>

                <div class="domain-bottom">
                  <h3>{{ d.name }}</h3>
                  <p>{{ d.description }}</p>
                  <span class="domain-arrow">
                    <span>Explorer la filière</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- GALERIE IMMERSIVE « L'ÉNERGIE DU PROGRAMME » -->
    <section class="gallery-section">
      <div class="container">
        <div class="gallery-intro">
          <div>
            <span class="eyebrow on-dark">Immersion &amp; Communauté</span>
            <h2>Au cœur de la création camerounaise</h2>
          </div>
          <p class="gallery-desc">
            À Yaoundé comme à Douala, les ateliers Mboa Jeunes Créatifs rassemblent des énergies singulières.
            Découvrez nos espaces de répétition, studios d'enregistrement et ateliers de fabrication.
          </p>
        </div>

        <div class="gallery-mosaic">
          <div class="mosaic-col col-1">
            <div class="mosaic-card">
              <img src="images/musique-guitare.jpg" alt="Artiste en répétition musicale" loading="lazy" />
              <div class="mosaic-caption">
                <strong>Musique &amp; Pratiques artistiques</strong>
                <span>Sessions live &amp; MAO</span>
              </div>
            </div>
            <div class="mosaic-card">
              <img src="images/atelier-creation.jpg" alt="Atelier de création pratique" loading="lazy" />
              <div class="mosaic-caption">
                <strong>Ateliers de création</strong>
                <span>Expérimentation collective</span>
              </div>
            </div>
          </div>

          <div class="mosaic-col col-2">
            <div class="mosaic-card main-mosaic">
              <img src="images/communaute-etudiants.jpg" alt="Jeunes créateurs et étudiants ensemble" loading="lazy" />
              <div class="mosaic-caption">
                <strong>La Communauté Mboa</strong>
                <span>Partage, convivialité &amp; projets</span>
              </div>
            </div>
          </div>

          <div class="mosaic-col col-3">
            <div class="mosaic-card">
              <img src="images/radio-podcast-studio.jpg" alt="Enregistrement en studio radio podcast" loading="lazy" />
              <div class="mosaic-caption">
                <strong>Radio &amp; Médias</strong>
                <span>Prise de son &amp; Podcasts</span>
              </div>
            </div>
            <div class="mosaic-card">
              <img src="images/numerique-developpeur.jpg" alt="Créateur numérique sur laptop" loading="lazy" />
              <div class="mosaic-caption">
                <strong>Numérique &amp; 3D</strong>
                <span>Design graphique &amp; code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION OPPORTUNITÉS & AGENDA -->
    <section class="opps">
      <div class="container">
        <header class="section-head row">
          <div>
            <span class="eyebrow on-dark">Agenda officiel</span>
            <h2>Prochaines opportunités &amp; ateliers</h2>
          </div>
          <a routerLink="/opportunites" class="btn btn-outline on-dark">Consulter tout l'agenda →</a>
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

    <!-- BANNIÈRE D'APPEL MAJEUR AU POOL DE TALENTS -->
    <section class="cta-banner-final">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-text">
            <span class="eyebrow">Vivier de talents</span>
            <h2>Faites partie de la nouvelle vague créative</h2>
            <p>
              Vous avez moins de 35 ans, êtes basé au Cameroun et passionné par les industries culturelles ?
              Enregistrez votre profil dès aujourd'hui dans le Pool de talents pour être contacté
              lors des prochains ateliers et opportunités.
            </p>
          </div>
          <div class="cta-button-wrap">
            <a routerLink="/communaute" class="btn btn-secondary btn-lg">
              <span>Rejoindre la communauté</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* HERO */
    .hero {
      background: var(--ink);
      color: var(--text-on-dark);
      position: relative;
      overflow: hidden;
      padding-top: 2rem;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 3.5rem;
      align-items: center;
      padding-block: 4.5rem 5rem;
    }
    .hero h1 {
      color: var(--text-on-dark);
      font-size: clamp(2.5rem, 5.5vw, 4.4rem);
      margin-bottom: 1.5rem;
    }
    .hero h1 em {
      font-style: italic;
      color: var(--orange);
    }
    .lead {
      font-size: 1.18rem;
      color: var(--text-on-dark-muted);
      line-height: 1.7;
      margin-bottom: 2rem;
      max-width: 36rem;
    }
    .lead strong {
      color: var(--text-on-dark);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2.75rem;
    }
    .trust-strip {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      padding-top: 1.75rem;
      border-top: 1px solid var(--line-dark);
      flex-wrap: wrap;
    }
    .trust-item {
      display: flex;
      flex-direction: column;
    }
    .trust-item strong {
      color: var(--ochre);
      font-size: 1.05rem;
      font-family: var(--font-display);
    }
    .trust-item span {
      font-size: .8rem;
      color: var(--text-on-dark-muted);
    }
    .trust-divider {
      width: 1px;
      height: 32px;
      background: var(--line-dark);
    }

    /* Photo Frame Hero */
    .hero-visual {
      position: relative;
    }
    .photo-frame {
      position: relative;
      border-radius: var(--radius-leaf);
      overflow: visible;
      box-shadow: var(--shadow-lg);
    }
    .hero-img {
      width: 100%;
      height: 520px;
      object-fit: cover;
      object-position: center 65%;
      border-radius: var(--radius-leaf);
      display: block;
      border: 3px solid var(--line-dark);
    }
    .frame-overlay {
      position: absolute;
      inset: 0;
      border-radius: var(--radius-leaf);
      background: linear-gradient(180deg, transparent 60%, rgba(17,14,12,0.7) 100%);
      pointer-events: none;
    }

    /* Badges flottants */
    .float-card {
      position: absolute;
      background: rgba(27, 22, 19, 0.94);
      backdrop-filter: blur(12px);
      border: 1px solid var(--line-dark);
      padding: .85rem 1.25rem;
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: .85rem;
      color: var(--text-on-dark);
      box-shadow: 0 16px 36px rgba(0,0,0,0.4);
      z-index: 2;
    }
    .card-badge-1 {
      bottom: -20px;
      left: -20px;
    }
    .card-badge-2 {
      top: 30px;
      right: -20px;
    }
    .float-icon {
      font-size: 1.5rem;
    }
    .float-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px var(--green);
      animation: pulse-soft 2s infinite;
    }
    .float-card strong {
      display: block;
      font-size: .92rem;
      color: var(--ochre);
    }
    .float-card small {
      font-size: .75rem;
      color: var(--text-on-dark-muted);
    }

    /* MESSAGES */
    .messages {
      padding: 5rem 0 3rem;
    }
    .grid3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
    .msg-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .num {
      font-family: var(--font-display);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--orange);
      line-height: 1;
    }
    .msg-tag {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--text-muted);
      background: var(--paper-2);
      padding: .25rem .65rem;
      border-radius: 999px;
    }
    .msg-card h2 {
      font-size: 1.45rem;
      margin-bottom: .85rem;
    }
    .msg-card p {
      color: var(--text-muted);
      line-height: 1.65;
      margin: 0;
    }

    /* DOMAINES RICHES AVEC IMAGES */
    .domains {
      padding: 4.5rem 0 3rem;
    }
    .section-head {
      margin-bottom: 3rem;
      max-width: 44rem;
    }
    .section-head.row {
      max-width: none;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .section-head p {
      color: var(--text-muted);
      font-size: 1.15rem;
    }
    .domain-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 1.75rem;
    }
    .domain-card-rich {
      --c: var(--orange);
      position: relative;
      height: 380px;
      border-radius: var(--radius-leaf);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      box-shadow: var(--shadow-md);
      transition: all .35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .domain-card-rich:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }
    .domain-bg-wrap {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
    }
    .domain-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .5s ease;
    }
    .domain-card-rich:hover .domain-bg-img {
      transform: scale(1.08);
    }
    .domain-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(17,14,12,0.4) 0%, rgba(17,14,12,0.92) 80%);
    }
    .domain-content {
      position: relative;
      z-index: 2;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      color: var(--text-on-dark);
    }
    .domain-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: .75rem;
    }
    .domain-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 16px 4px 16px 4px;
      background: var(--c);
      color: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .domain-pill {
      font-size: .72rem;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--text-on-dark);
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(8px);
      padding: .35rem .75rem;
      border-radius: 999px;
    }
    .domain-bottom h3 {
      color: #ffffff;
      font-size: 1.4rem;
      margin-bottom: .4rem;
    }
    .domain-bottom p {
      color: var(--text-on-dark-muted);
      font-size: .9rem;
      line-height: 1.45;
      margin-bottom: 1rem;
    }
    .domain-arrow {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      font-size: .88rem;
      font-weight: 700;
      color: var(--ochre);
      transition: gap .2s ease;
    }
    .domain-card-rich:hover .domain-arrow {
      gap: .8rem;
    }

    /* MOSAÏQUE GALERIE COMMUTAUTÉ */
    .gallery-section {
      background: var(--ink);
      color: var(--text-on-dark);
      padding: 6rem 0;
      margin-top: 3rem;
    }
    .gallery-intro {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      align-items: flex-end;
      margin-bottom: 3.5rem;
    }
    .gallery-intro h2 {
      color: var(--ochre);
      margin: 0;
    }
    .gallery-desc {
      color: var(--text-on-dark-muted);
      font-size: 1.1rem;
      margin: 0;
    }
    .gallery-mosaic {
      display: grid;
      grid-template-columns: 1fr 1.35fr 1fr;
      gap: 1.5rem;
    }
    .mosaic-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .mosaic-card {
      position: relative;
      border-radius: var(--radius-leaf);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      height: 240px;
    }
    .mosaic-card.main-mosaic {
      height: 100%;
      min-height: 500px;
      border-radius: var(--radius-leaf-alt);
    }
    .mosaic-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s ease;
    }
    .mosaic-card:hover img {
      transform: scale(1.06);
    }
    .mosaic-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 1.25rem 1rem;
      background: linear-gradient(0deg, rgba(17,14,12,0.92) 0%, transparent 100%);
      color: var(--text-on-dark);
    }
    .mosaic-caption strong {
      display: block;
      font-size: 1rem;
      color: var(--ochre);
    }
    .mosaic-caption span {
      font-size: .8rem;
      color: var(--text-on-dark-muted);
    }

    /* AGENDA / OPPORTUNITÉS */
    .opps {
      padding: 5.5rem 0;
    }
    .opps h2 {
      font-size: 2.2rem;
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
    .cta-banner-final {
      padding: 2rem 0 5rem;
    }
    .cta-inner {
      background: var(--ochre);
      border-radius: var(--radius-lg);
      padding: 3.5rem 3rem;
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      align-items: center;
      gap: 3rem;
      box-shadow: var(--shadow-md);
    }
    .cta-text h2 {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      margin-bottom: 1rem;
      color: var(--ink);
    }
    .cta-text p {
      color: var(--ink-3);
      font-size: 1.1rem;
      margin: 0;
      line-height: 1.6;
    }
    .cta-text .eyebrow {
      color: var(--ink);
    }
    .cta-button-wrap {
      display: flex;
      justify-content: flex-end;
    }

    @media (max-width: 960px) {
      .hero-grid {
        grid-template-columns: 1fr;
        padding-block: 3.5rem;
      }
      .card-badge-1 { bottom: -10px; left: 10px; }
      .card-badge-2 { top: 20px; right: 10px; }
      .gallery-intro { grid-template-columns: 1fr; gap: 1rem; }
      .gallery-mosaic { grid-template-columns: 1fr; }
      .mosaic-card.main-mosaic { min-height: 350px; }
      .cta-inner { grid-template-columns: 1fr; padding: 2.5rem 1.75rem; }
      .cta-button-wrap { justify-content: flex-start; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);
  readonly opportunities = signal<Opportunity[]>([]);

  color(key: string): string {
    return DOMAIN_COLORS[key] ?? '#f28b00';
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
