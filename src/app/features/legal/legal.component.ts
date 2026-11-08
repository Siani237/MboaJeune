import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Cadre institutionnel</span>
        <h1>Mentions légales</h1>
        <div class="alert-draft">
          <strong>Document de travail provisoire :</strong>
          Ces mentions légales constituent une version de cadrage technique pour la démonstration.
          Elles doivent être formellement validées par la direction de l'Institut français du Cameroun et son conseil juridique avant tout lancement public réel.
        </div>
      </header>

      <section class="legal-section">
        <h2>1. Éditeur du site</h2>
        <p>
          <strong>Institut français du Cameroun (IFC)</strong><br>
          127 Avenue du Président Ahmadou Ahidjo, Yaoundé, Cameroun.<br>
          Téléphone : +237 222 22 09 44 / +237 690 261 970<br>
          Courriel : info.yde&#64;ifcameroun.com
        </p>
        <p>
          Le programme <strong>Mboa Jeunes Créatifs</strong> est financé par le Fonds Équipe France de l'Ambassade de France au Cameroun.
        </p>
      </section>

      <section class="legal-section">
        <h2>2. Statut de la version actuelle</h2>
        <p>
          Cette version est une <strong>maquette technique et fonctionnelle de démonstration</strong> (Angular standalone + Mock Backend côté navigateur).
          Elle ne comporte aucun serveur de traitement de données personnelles et n'est pas habilitée à recueillir de réelles candidatures.
        </p>
      </section>

      <section class="legal-section">
        <h2>3. Propriété intellectuelle</h2>
        <p>
          Les logos, appellations et marques cités (Institut français, Ambassade de France, Mboa Jeunes Créatifs) 
          demeurent la propriété exclusive de leurs détenteurs respectifs.
        </p>
      </section>

      <section class="legal-section">
        <h2>4. Hébergement</h2>
        <p>
          Environnement de développement et démonstration locale.
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
    .legal-section {
      margin-bottom: 2rem;
    }
    .legal-section h2 {
      font-size: 1.35rem;
      margin-bottom: 0.5rem;
    }
    .legal-section p {
      color: var(--color-text-muted);
      line-height: 1.6;
    }
  `]
})
export class LegalComponent {}
