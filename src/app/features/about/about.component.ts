import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Le programme"
      heading="Apprendre, créer, faire grandir ses idées"
      lead="Mboa Jeunes Créatifs favorise l'expression, la formation professionnelle et la créativité des jeunes camerounais dans les industries culturelles et créatives."
    />

    <div class="container body">
      <section class="split">
        <div class="split-lead">
          <span class="eyebrow">Origine &amp; Financement</span>
          <h2>Un partenariat stratégique pour la jeunesse créative</h2>

          <div class="institution-lockup">
            <div class="lockup-badge">
              <img src="/logos/logo-mboa-color.png" alt="Logo Mboa Jeunes Créatifs" class="lockup-mboa" />
            </div>
            <span class="lockup-plus">+</span>
            <div class="lockup-badge">
              <img src="/logos/logo-ifc-color.png" alt="Institut français du Cameroun" class="lockup-ifc" />
            </div>
          </div>
        </div>
        <div class="text">
          <p>
            <strong>Mboa Jeunes Créatifs</strong> est un programme d'envergure porté par l'<strong>Institut français du Cameroun (IFC)</strong>,
            financé par le <strong>Fonds Équipe France de l'Ambassade de France au Cameroun</strong>.
            Déployé prioritairement à <strong>Yaoundé</strong> et à <strong>Douala</strong>, il s'adresse à tous les jeunes créateurs de moins de 35 ans.
          </p>
          <p>
            Il fédère sept filières d'excellence : le sport urbain, la mode et le stylisme, la radio et les médias,
            la musique contemporaine, le numérique et la fabrication FabLab, les arts visuels et la régie événementielle.
          </p>
          <p>
            À travers des ateliers intensifs, des masterclasses, des résidences artistiques et des rencontres professionnelles,
            le programme ouvre des perspectives concrètes d'insertion et de développement de carrière.
          </p>
        </div>
      </section>

      <!-- Grille visuelle photographique -->
      <section class="photo-banner-grid">
        <div class="banner-img-box">
          <img src="images/equipe-collaboration.jpg" alt="Équipe de jeunes créateurs en réunion de projet" loading="lazy">
          <div class="box-caption">Intelligence collective &amp; Gestion de projet</div>
        </div>
        <div class="banner-img-box">
          <img src="images/atelier-creation.jpg" alt="Atelier de création pratique" loading="lazy">
          <div class="box-caption">Expérimentation &amp; Savoir-faire</div>
        </div>
      </section>

      <!-- Deux piliers -->
      <section class="duo">
        <article class="red card-leaf">
          <span class="duo-badge">Pilier 01</span>
          <h3>Notre ambition</h3>
          <p>
            Contribuer à l'épanouissement des jeunes en leur donnant accès à des espaces d'apprentissage moderne,
            d'expérimentation technologique et de création artistique connectés aux standards internationaux.
          </p>
        </article>

        <article class="cyan card-leaf-alt">
          <span class="duo-badge">Pilier 02</span>
          <h3>Notre approche</h3>
          <p>
            Encourager la découverte, valoriser les savoirs et matières locales, favoriser le mentorat entre générations
            et rapprocher directement les talents des opportunités économiques réelles.
          </p>
        </article>
      </section>

      <!-- À qui s'adresse le programme -->
      <section class="who card">
        <div class="who-content">
          <span class="eyebrow">Profils recherchés</span>
          <h2>À qui s'adresse le programme ?</h2>
          <p>
            Principalement aux jeunes de moins de 35 ans résidant au Cameroun, qu'ils soient étudiants, passionnés,
            débutants curieux ou déjà porteurs d'un projet créatif.
          </p>
          <p class="highlight-quote">
            « Il n'est pas nécessaire d'être un professionnel aguerri pour participer : la curiosité, l'assiduité
            et l'envie d'apprendre constituent les premiers critères de sélection. »
          </p>
          <div class="actions">
            <a routerLink="/activites" class="btn btn-primary">Explorer les 7 domaines</a>
            <a routerLink="/communaute" class="btn btn-secondary">Rejoindre la communauté</a>
          </div>
        </div>
        <div class="who-media">
          <img src="images/etudiants-campus.jpg" alt="Étudiants sur le campus" loading="lazy">
        </div>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 4.5rem 2rem; }
    .split { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3.5rem; margin-bottom: 4rem; align-items: flex-start; }
    .split-lead h2 { font-size: 2.3rem; margin-top: .4rem; line-height: 1.2; }
    .institution-lockup {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1.75rem;
      flex-wrap: wrap;
    }
    .lockup-badge {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: .65rem 1.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
    }
    .lockup-mboa {
      height: 36px;
      width: auto;
      object-fit: contain;
    }
    .lockup-ifc {
      height: 30px;
      width: auto;
      object-fit: contain;
    }
    .lockup-plus {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--orange-deep);
    }
    .text p { font-size: 1.12rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.2rem; }

    .photo-banner-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 1.75rem;
      margin-bottom: 4.5rem;
    }
    .banner-img-box {
      position: relative;
      height: 340px;
      border-radius: var(--radius-leaf);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }
    .banner-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s ease;
    }
    .banner-img-box:hover img {
      transform: scale(1.05);
    }
    .box-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 1.5rem 1rem;
      background: linear-gradient(0deg, rgba(17,14,12,0.85) 0%, transparent 100%);
      color: #fff;
      font-weight: 700;
      font-size: .95rem;
    }

    .duo {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 4.5rem;
    }
    .duo article {
      padding: 2.75rem 2.25rem;
      color: #fff;
      box-shadow: var(--shadow-md);
    }
    .duo article.red { background: var(--red); }
    .duo article.cyan { background: var(--ink); border-left: 10px solid var(--cyan); }
    .duo-badge {
      display: inline-block;
      font-size: .75rem;
      font-weight: 800;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(0, 0, 0, 0.2);
      padding: .25rem .75rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .duo h3 { font-size: 1.85rem; color: #fff; margin-bottom: .8rem; }
    .duo p { margin: 0; color: inherit; opacity: .95; font-size: 1.08rem; line-height: 1.65; }

    .who {
      background: var(--paper-2);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 3rem;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 3rem;
      align-items: center;
    }
    .who-content h2 { font-size: 2.2rem; margin-bottom: 1rem; }
    .who-content p { font-size: 1.08rem; color: var(--text-muted); line-height: 1.65; }
    .highlight-quote {
      font-family: var(--font-display);
      font-style: italic;
      color: var(--orange-deep) !important;
      font-size: 1.2rem !important;
      border-left: 4px solid var(--orange);
      padding-left: 1.25rem;
      margin: 1.5rem 0 !important;
    }
    .who-media {
      height: 320px;
      border-radius: var(--radius-leaf);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }
    .who-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; }

    @media (max-width: 900px) {
      .split { grid-template-columns: 1fr; gap: 1.5rem; }
      .photo-banner-grid { grid-template-columns: 1fr; }
      .banner-img-box { height: 260px; }
      .who { grid-template-columns: 1fr; padding: 2rem; }
      .who-media { height: 240px; }
    }
  `]
})
export class AboutComponent {}
