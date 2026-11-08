import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Protection des données personnelles</span>
        <h1>Politique de confidentialité</h1>
        <div class="alert-draft">
          <strong>Projet de politique — Version de démonstration :</strong>
          Ce texte encadre les principes applicables au futur traitement réel de données, 
          conformément à la <strong>Loi camerounaise n° 2024/017 du 23 décembre 2024</strong>.
          Aucune donnée réelle n'est collectée dans cette version mock.
        </div>
      </header>

      <section class="privacy-section">
        <h2>1. Responsable de traitement</h2>
        <p>
          Institut français du Cameroun (IFC) — Antenne de Yaoundé / Douala.
        </p>
      </section>

      <section class="privacy-section">
        <h2>2. Finalités du futur traitement (Pool de talents)</h2>
        <p>
          Le traitement aura pour finalités exclusives :
        </p>
        <ul>
          <li>L'identification des compétences et des profils créatifs des jeunes camerounais (&lt; 35 ans) ;</li>
          <li>L'orientation vers des ateliers, formations, rencontres professionnelles et événements ;</li>
          <li>La communication d'opportunités adaptées aux centres d'intérêt renseignés.</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>3. Données concernées & Base légale</h2>
        <p>
          Données d'identification, de contact, de formation académique, compétences artistiques et motivations.
        </p>
        <p>
          <strong>Base légale :</strong> Le consentement libre, éclairé, univoque et préalable du participant.
        </p>
      </section>

      <section class="privacy-section">
        <h2>4. Durée de conservation</h2>
        <p>
          Sous réserve d'arbitrage définitif par l'IFC, les profils inactifs seront conservés pour une durée maximale 
          de deux (2) ans avant purge ou renouvellement explicite du consentement.
        </p>
      </section>

      <section class="privacy-section">
        <h2>5. Droits des personnes</h2>
        <p>
          Conformément à la Loi n° 2024/017, chaque participant disposera d'un droit d'accès, de rectification, 
          d'effacement, d'opposition et de retrait de son consentement sur simple demande à 
          <code>info.yde&#64;ifcameroun.com</code>.
        </p>
      </section>

      <section class="privacy-section">
        <h2>6. Avertissement de sécurité spécifique au mode démo</h2>
        <p>
          Le formulaire du présent site est une simulation frontend stockée dans le navigateur (Mock Store).
          <strong>Il est strictement interdit de saisir des données personnelles ou d'importer des documents confidentiels.</strong>
        </p>
      </section>
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
    .alert-draft {
      background-color: var(--color-demo-banner-bg);
      border-left: 4px solid var(--color-demo-banner);
      padding: 1rem 1.25rem;
      border-radius: var(--radius-sm);
      margin-top: 1rem;
      font-size: 0.9rem;
      color: var(--color-demo-banner);
    }
    .privacy-section {
      margin-bottom: 2rem;
    }
    .privacy-section h2 {
      font-size: 1.35rem;
      margin-bottom: 0.5rem;
    }
    .privacy-section p, .privacy-section ul {
      color: var(--color-text-muted);
      line-height: 1.6;
    }
  `]
})
export class PrivacyComponent {}
