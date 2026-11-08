import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container bar">
        <a routerLink="/" class="brand" aria-label="Mboa Jeunes Créatifs — accueil">
          <span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="brand-text">
            <span class="brand-title">Mboa</span>
            <span class="brand-sub">Jeunes Créatifs</span>
          </span>
        </a>

        <button type="button" class="toggle" (click)="toggle()" [attr.aria-expanded]="open()"
                aria-controls="primary-nav" aria-label="Ouvrir ou fermer le menu">
          <span></span><span></span><span></span>
        </button>

        <nav id="primary-nav" class="nav" [class.open]="open()">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="close()">Accueil</a></li>
            <li><a routerLink="/programme" routerLinkActive="active" (click)="close()">Le programme</a></li>
            <li><a routerLink="/activites" routerLinkActive="active" (click)="close()">Domaines</a></li>
            <li><a routerLink="/opportunites" routerLinkActive="active" (click)="close()">Opportunités</a></li>
            <li><a routerLink="/actualites" routerLinkActive="active" (click)="close()">Actualités</a></li>
            <li><a routerLink="/faq" routerLinkActive="active" (click)="close()">FAQ</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" (click)="close()">Contact</a></li>
          </ul>
          <a routerLink="/communaute" class="btn btn-primary btn-sm" (click)="close()">Rejoindre la communauté</a>
        </nav>
      </div>
      <div class="pattern-band" aria-hidden="true"></div>
    </header>
  `,
  styles: [`
    .site-header { background: var(--ink); position: sticky; top: 0; z-index: 50; }
    .bar { display: flex; align-items: center; justify-content: space-between; height: 4.5rem; gap: 1rem; }
    .brand { display: flex; align-items: center; gap: .7rem; text-decoration: none; }
    .brand:hover { text-decoration: none; }
    .mark { display: grid; grid-template-columns: repeat(3, 8px); gap: 3px; transform: skewX(-14deg); }
    .mark i { display: block; width: 8px; height: 30px; border-radius: 8px; }
    .mark i:nth-child(1) { background: var(--red); }
    .mark i:nth-child(2) { background: var(--orange); height: 36px; margin-top: -3px; }
    .mark i:nth-child(3) { background: var(--cyan); }
    .brand-text { display: flex; flex-direction: column; line-height: 1; }
    .brand-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--ochre); }
    .brand-sub { font-size: .7rem; letter-spacing: .22em; text-transform: uppercase; color: var(--text-on-dark-muted); margin-top: .2rem; }
    .nav { display: flex; align-items: center; gap: 1.5rem; }
    ul { display: flex; list-style: none; margin: 0; padding: 0; gap: 1.3rem; }
    ul a { color: var(--text-on-dark); font-size: .92rem; font-weight: 500; padding: .35rem 0; position: relative; }
    ul a:hover { color: var(--ochre); text-decoration: none; }
    ul a.active { color: var(--ochre); font-weight: 700; }
    ul a.active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 3px; border-radius: 3px; background: var(--orange); }
    .toggle { display: none; background: none; border: 2px solid var(--line-dark); border-radius: 12px; padding: .55rem .6rem; cursor: pointer; flex-direction: column; gap: 4px; }
    .toggle span { width: 22px; height: 2px; background: var(--ochre); border-radius: 2px; }
    @media (max-width: 1040px) {
      .toggle { display: flex; }
      .nav { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: stretch;
             background: var(--ink); padding: 1.25rem 1.5rem 1.5rem; border-bottom: 3px solid var(--orange); }
      .nav.open { display: flex; }
      ul { flex-direction: column; gap: .2rem; }
      ul a { display: block; padding: .7rem 0; border-bottom: 1px solid var(--line-dark); }
      ul a.active::after { display: none; }
    }
  `]
})
export class HeaderComponent {
  readonly open = signal(false);
  toggle(): void { this.open.update(v => !v); }
  close(): void { this.open.set(false); }
}
