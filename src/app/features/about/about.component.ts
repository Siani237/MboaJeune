import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Présentation institutionnelle</span>
        <h1>À propos de Mboa Jeunes Créatifs</h1>
        <p class="lead">
          Un programme pour favoriser l'expression, la formation et la créativité des jeunes dans les industries culturelles et créatives.
        </p>
      </header>

      <section class="content-block">
        <h2>Origine et partenariats</h2>
        <p>
          <strong>Mboa Jeunes Créatifs</strong> est un programme de l'<strong>Institut français du Cameroun (IFC)</strong>, 
          financé par le <strong>Fonds Équipe France de l'Ambassade de France au Cameroun</strong>. 
          Lancé à <strong>Yaoundé</strong> et à <strong>Douala</strong>, il s'adresse prioritairement aux jeunes de moins de 35 ans.
        </p>
        <p>
          Le programme propose des activités diversifiées dans plusieurs filières artistiques et techniques : 
          le sport, la mode, la radio, la musique, le numérique, les arts visuels et l'événementiel.
        </p>
      </section>

      <section class="content-block">
        <div class="values-grid">
          <div class="value-card">
            <h3>Notre ambition</h3>
            <p>
              Contribuer à l'épanouissement des jeunes en leur donnant accès à des espaces d'apprentissage, 
              d'expérimentation et de création contemporaine.
            </p>
          </div>
          <div class="value-card">
            <h3>Notre approche</h3>
            <p>
              Encourager la découverte, valoriser les initiatives locales camerounaises, favoriser le partage d'expériences 
              et rapprocher les jeunes des professionnels des industries créatives.
            </p>
          </div>
        </div>
      </section>

      <section class="content-block">
        <h2>À qui s'adresse le programme ?</h2>
        <p>
          Principalement aux jeunes de moins de 35 ans résidant au Cameroun (particulièrement à Yaoundé et Douala), 
          qu'ils soient étudiants, passionnés, débutants ou déjà engagés dans une pratique créative.
        </p>
        <div class="note-box">
          <p>
            <strong>Il n'est pas nécessaire d'être un professionnel :</strong> 
            Le programme a été conçu pour donner la chance à chacun de tester une idée, d'apprendre une compétence technique 
            ou de développer son réseau dans un cadre bienveillant et stimulant.
          </p>
        </div>
      </section>

      <div class="page-cta">
        <a routerLink="/activites" class="btn btn-primary">Explorer les 7 filières</a>
        <a routerLink="/communaute" class="btn btn-secondary">Rejoindre le Pool de talents</a>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 860px;
    }
    .page-header {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 2rem;
    }
    .section-tag {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lead {
      font-size: 1.2rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-top: 0.75rem;
    }
    .content-block {
      margin-bottom: 2.5rem;
    }
    .content-block h2 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: var(--color-text-main);
    }
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 1.5rem 0;
    }
    .value-card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-primary);
      padding: 1.5rem;
      border-radius: var(--radius-md);
    }
    .value-card h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .note-box {
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      padding: 1.25rem 1.5rem;
      border-radius: var(--radius-md);
      margin-top: 1rem;
    }
    .note-box p {
      margin: 0;
    }
    .page-cta {
      display: flex;
      gap: 1rem;
      margin-top: 3rem;
      flex-wrap: wrap;
    }
  `]
})
export class AboutComponent {}
