import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container header-container">
        <a routerLink="/" class="brand" aria-label="Mboa Jeunes Créatifs - Accueil">
          <span class="brand-title">Mboa Jeunes Créatifs</span>
          <span class="brand-sub">Institut français du Cameroun</span>
        </a>

        <button
          type="button"
          class="mobile-toggle"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="primary-nav"
          aria-label="Basculer le menu de navigation"
        >
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
        </button>

        <nav id="primary-nav" class="nav" [class.is-open]="menuOpen()">
          <ul class="nav-list">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Accueil</a></li>
            <li><a routerLink="/programme" routerLinkActive="active" (click)="closeMenu()">À propos</a></li>
            <li><a routerLink="/activites" routerLinkActive="active" (click)="closeMenu()">Activités</a></li>
            <li><a routerLink="/opportunites" routerLinkActive="active" (click)="closeMenu()">Opportunités</a></li>
            <li><a routerLink="/actualites" routerLinkActive="active" (click)="closeMenu()">Actualités</a></li>
            <li><a routerLink="/faq" routerLinkActive="active" (click)="closeMenu()">FAQ</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
          </ul>

          <div class="header-cta">
            <a routerLink="/communaute" class="btn btn-primary btn-sm" (click)="closeMenu()">Rejoindre le Pool</a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4.25rem;
    }
    .brand {
      display: flex;
      flex-direction: column;
      text-decoration: none;
    }
    .brand-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-primary-dark);
      letter-spacing: -0.01em;
      line-height: 1.1;
    }
    .brand-sub {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      letter-spacing: 0.02em;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1.25rem;
    }
    .nav-list a {
      color: var(--color-text-main);
      font-size: 0.925rem;
      font-weight: 500;
      text-decoration: none;
      padding: 0.25rem 0;
      position: relative;
    }
    .nav-list a:hover {
      color: var(--color-primary);
    }
    .nav-list a.active {
      color: var(--color-primary);
      font-weight: 700;
    }
    .nav-list a.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-primary);
      border-radius: 2px;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      flex-direction: column;
      gap: 4px;
    }
    .toggle-bar {
      width: 22px;
      height: 2px;
      background-color: var(--color-text-main);
      border-radius: 1px;
    }
    @media (max-width: 960px) {
      .mobile-toggle {
        display: flex;
      }
      .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        flex-direction: column;
        padding: 1.5rem;
        display: none;
        box-shadow: var(--shadow-md);
      }
      .nav.is-open {
        display: flex;
      }
      .nav-list {
        flex-direction: column;
        width: 100%;
        gap: 0.75rem;
      }
      .header-cta {
        width: 100%;
        margin-top: 1rem;
      }
      .header-cta .btn {
        width: 100%;
      }
    }
  `]
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
