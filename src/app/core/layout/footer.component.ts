import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container footer-content">
        <div class="footer-grid">
          <div class="footer-col">
            <h3 class="footer-title">Mboa Jeunes Créatifs</h3>
            <p class="footer-desc">
              Programme de l'Institut français du Cameroun (IFC), financé par le Fonds Équipe France de l'Ambassade de France au Cameroun.
            </p>
            <p class="footer-tagline">
              Un espace pour apprendre, créer et faire grandir ses idées.
            </p>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title">Navigation</h4>
            <ul class="footer-links">
              <li><a routerLink="/programme">À propos du programme</a></li>
              <li><a routerLink="/activites">7 Domaines d'activités</a></li>
              <li><a routerLink="/opportunites">Agenda & Opportunités</a></li>
              <li><a routerLink="/actualites">Actualités</a></li>
              <li><a routerLink="/communaute">Pool de talents (Démo)</a></li>
              <li><a routerLink="/faq">Foire aux questions</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title">Contact & Villes</h4>
            <p class="footer-info">
              <strong>Villes :</strong> Yaoundé et Douala<br>
              <strong>Siège :</strong> 127 Avenue du Président Ahmadou Ahidjo, Yaoundé<br>
              <strong>Tél :</strong> +237 222 22 09 44 / +237 690 261 970<br>
              <strong>Email :</strong> info.yde&#64;ifcameroun.com
            </p>
            <p class="footer-disclaimer">
              <em>* Coordonnées institutionnelles en attente de validation officielle par l'IFC.</em>
            </p>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title">Cadre légal & Démo</h4>
            <p class="footer-legal-notice">
              Plateforme en mode démonstration. Conforme aux principes de protection des données (Loi n° 2024/017 du 23 décembre 2024).
            </p>
            <ul class="footer-links">
              <li><a routerLink="/mentions-legales">Mentions légales (Brouillon)</a></li>
              <li><a routerLink="/confidentialite">Politique de confidentialité</a></li>
              <li><a routerLink="/admin/demo-login" class="admin-link">⚙️ Administration démo</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 Mboa Jeunes Créatifs — Institut français du Cameroun. Version de démonstration technique.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: #1c1917;
      color: #d6d3d1;
      padding: 3.5rem 0 1.5rem;
      margin-top: 4rem;
      font-size: 0.9rem;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      margin-bottom: 2.5rem;
    }
    .footer-title {
      color: #ffffff;
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    .footer-desc {
      color: #a8a29e;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .footer-tagline {
      color: #fbbf24;
      font-weight: 500;
      font-size: 0.85rem;
    }
    .footer-col-title {
      color: #ffffff;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-links li {
      margin-bottom: 0.5rem;
    }
    .footer-links a {
      color: #a8a29e;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .footer-links a:hover {
      color: #ffffff;
      text-decoration: underline;
    }
    .footer-links a.admin-link {
      color: #f59e0b;
      font-weight: 600;
    }
    .footer-info {
      color: #a8a29e;
      line-height: 1.6;
      font-size: 0.85rem;
    }
    .footer-disclaimer {
      font-size: 0.75rem;
      color: #78716c;
      margin-top: 0.5rem;
    }
    .footer-legal-notice {
      font-size: 0.8rem;
      color: #a8a29e;
      line-height: 1.4;
      margin-bottom: 0.75rem;
    }
    .footer-bottom {
      border-top: 1px solid #292524;
      padding-top: 1.5rem;
      text-align: center;
      font-size: 0.8rem;
      color: #78716c;
    }
  `]
})
export class FooterComponent {}
