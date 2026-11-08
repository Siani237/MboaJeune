import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Le programme" heading="Apprendre, créer, faire grandir ses idées"
      lead="Mboa Jeunes Créatifs favorise l'expression, la formation et la créativité des jeunes dans les industries culturelles et créatives." />

    <div class="container body">
      <section class="split">
        <div>
          <h2>Un programme de l'Institut français du Cameroun</h2>
        </div>
        <div class="text">
          <p>
            Mboa Jeunes Créatifs est un programme de l'<strong>Institut français du Cameroun</strong>,
            financé par le <strong>Fonds Équipe France de l'Ambassade de France au Cameroun</strong>.
            Lancé à <strong>Yaoundé</strong> et à <strong>Douala</strong>, il s'adresse aux jeunes de moins de 35 ans.
          </p>
          <p>
            Il propose différentes activités dans plusieurs domaines : le sport, la mode, la radio,
            la musique, le numérique, les arts visuels et l'événementiel.
          </p>
          <p>
            À travers des ateliers, des formations, des rencontres et des initiatives créatives, les jeunes
            découvrent de nouvelles disciplines, développent leurs compétences et explorent des possibilités
            d'engagement et d'insertion professionnelle.
          </p>
          <p class="draft">Texte institutionnel soumis à validation de l'IFC.</p>
        </div>
      </section>

      <section class="duo">
        <article class="red">
          <h3>Notre ambition</h3>
          <p>Contribuer à l'épanouissement des jeunes en leur donnant accès à des espaces d'apprentissage, d'expérimentation et de création.</p>
        </article>
        <article class="cyan">
          <h3>Notre approche</h3>
          <p>Encourager la découverte, valoriser les initiatives locales, favoriser le partage d'expériences et rapprocher les jeunes des professionnels et des opportunités.</p>
        </article>
      </section>

      <section class="who">
        <h2>À qui s'adresse le programme ?</h2>
        <p>
          Principalement aux jeunes de moins de 35 ans, qu'ils soient étudiants, passionnés, débutants ou déjà
          engagés dans une activité créative. <strong>Il n'est pas nécessaire d'être un professionnel</strong>
          pour s'intéresser à un domaine, apprendre une nouvelle compétence ou découvrir son potentiel.
        </p>
        <div class="actions">
          <a routerLink="/activites" class="btn btn-primary">Explorer les domaines</a>
          <a routerLink="/communaute" class="btn btn-outline">Rejoindre la communauté</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 4rem 1rem; }
    .split { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; margin-bottom: 4rem; }
    .text p { font-size: 1.08rem; color: var(--text-muted); }
    .draft { font-size: .82rem; font-style: italic; color: var(--color-text-light); }
    .duo { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 4rem; }
    .duo article { padding: 2.2rem; color: #fff; border-radius: var(--radius-leaf); }
    .duo article.red { background: var(--red); }
    .duo article.cyan { background: var(--ink); border-left: 8px solid var(--cyan); }
    .duo h3 { font-size: 1.7rem; color: inherit; }
    .duo p { margin: 0; color: inherit; opacity: .95; font-size: 1.05rem; }
    .who { background: var(--paper-2); border-radius: var(--radius-lg); padding: 2.5rem; }
    .who p { font-size: 1.08rem; color: var(--text-muted); max-width: 48rem; }
    .actions { display: flex; gap: .8rem; flex-wrap: wrap; }
    @media (max-width: 800px) { .split { grid-template-columns: 1fr; gap: 1rem; } }
  `]
})
export class AboutComponent {}
