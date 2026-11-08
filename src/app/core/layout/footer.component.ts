import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="pattern-band" aria-hidden="true"></div>
      <div class="container">
        <div class="grid">
          <section class="about">
            <p class="wordmark">Mboa <span>Jeunes Créatifs</span></p>
            <p class="muted">
              Programme de l'Institut français du Cameroun, financé par le Fonds Équipe France
              de l'Ambassade de France au Cameroun.
            </p>
            <p class="slogan">Un espace pour apprendre, créer et faire grandir ses idées.</p>
          </section>

          <nav aria-label="Navigation du pied de page">
            <h2>Explorer</h2>
            <ul>
              <li><a routerLink="/programme">Le programme</a></li>
              <li><a routerLink="/activites">Les 7 domaines</a></li>
              <li><a routerLink="/opportunites">Opportunités</a></li>
              <li><a routerLink="/actualites">Actualités</a></li>
              <li><a routerLink="/temoignages">Témoignages</a></li>
              <li><a routerLink="/communaute">Rejoindre la communauté</a></li>
            </ul>
          </nav>

          <section>
            <h2>Nous joindre</h2>
            <p class="muted">
              Yaoundé &amp; Douala<br>
              127 Avenue du Président Ahmadou Ahidjo, Yaoundé<br>
              +237 222 22 09 44 · +237 690 261 970<br>
              info.yde&#64;ifcameroun.com
            </p>
            <p class="note">Coordonnées en attente de validation par l'IFC.</p>
          </section>

          <nav aria-label="Informations légales">
            <h2>Cadre légal</h2>
            <ul>
              <li><a routerLink="/mentions-legales">Mentions légales (brouillon)</a></li>
              <li><a routerLink="/confidentialite">Confidentialité (brouillon)</a></li>
              <li><a routerLink="/faq">FAQ</a></li>
              <li><a routerLink="/admin/demo-login" class="admin">Espace équipe (démo)</a></li>
            </ul>
          </nav>
        </div>

        <p class="legal">© 2026 Mboa Jeunes Créatifs — version de démonstration. Contenus soumis à validation de l'IFC.</p>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer { background: var(--ink); color: var(--text-on-dark); margin-top: 5rem; }
    .grid { display: grid; grid-template-columns: 1.4fr 1fr 1.3fr 1fr; gap: 2.5rem; padding: 3.5rem 0 2rem; }
    .wordmark { font-family: var(--font-display); font-size: 1.9rem; font-weight: 800; color: var(--ochre); margin-bottom: .6rem; line-height: 1; }
    .wordmark span { display: block; font-family: var(--font-sans); font-size: .72rem; letter-spacing: .22em; text-transform: uppercase; color: var(--text-on-dark-muted); font-weight: 500; margin-top: .35rem; }
    .muted { color: var(--text-on-dark-muted); font-size: .9rem; }
    .slogan { font-family: var(--font-display); font-style: italic; color: var(--ochre); font-size: 1.05rem; }
    h2 { font-family: var(--font-sans); font-size: .75rem; letter-spacing: .18em; text-transform: uppercase; color: var(--orange); margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { margin-bottom: .55rem; }
    a { color: var(--text-on-dark); font-size: .92rem; }
    a:hover { color: var(--ochre); }
    a.admin { color: var(--cyan); }
    .note { font-size: .75rem; color: #8d8073; font-style: italic; }
    .legal { border-top: 1px solid var(--line-dark); padding: 1.25rem 0 1.75rem; font-size: .78rem; color: #8d8073; margin: 0; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class FooterComponent {}
