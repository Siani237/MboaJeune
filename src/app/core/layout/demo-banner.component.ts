import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="demo-banner" role="status" aria-label="Avertissement mode démonstration">
      <div class="container inner">
        <span class="tag">Démonstration</span>
        <p>
          <strong>Données fictives.</strong>
          Maquette sans serveur réel : ne saisissez aucune donnée personnelle.
        </p>
        <a routerLink="/admin/demo-login">Espace équipe →</a>
      </div>
    </aside>
  `,
  styles: [`
    .demo-banner { background: var(--ochre); color: var(--ink); font-size: .82rem; padding: .45rem 0; }
    .inner { display: flex; align-items: center; gap: .9rem; flex-wrap: wrap; }
    .tag { background: var(--ink); color: var(--ochre); font-weight: 700; font-size: .68rem;
           letter-spacing: .12em; text-transform: uppercase; padding: .2rem .55rem; border-radius: 999px; }
    p { margin: 0; flex: 1; min-width: 240px; }
    a { color: var(--ink); font-weight: 700; text-decoration: underline; white-space: nowrap; }
  `]
})
export class DemoBannerComponent {}
