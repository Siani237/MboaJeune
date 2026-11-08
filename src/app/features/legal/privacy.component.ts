import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Protection des données" heading="Politique de confidentialité" />
    <div class="container body">
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données est l'<strong>Institut français du Cameroun (IFC)</strong>,
          situé au 127 Avenue du Président Ahmadou Ahidjo, Yaoundé.
        </p>
      </section>

      <section>
        <h2>2. Cadre légal</h2>
        <p>
          Cette politique de confidentialité s'inscrit en stricte conformité avec la <strong>Loi camerounaise n° 2024/017
          du 23 décembre 2024</strong> relative à la protection des données à caractère personnel, garantissant la
          sécurité, l'intégrité et la confidentialité des informations recueillies.
        </p>
      </section>

      <section>
        <h2>3. Finalités de la collecte (Pool de talents)</h2>
        <p>Les données transmises lors de votre inscription au Pool de talents sont utilisées exclusivement pour :</p>
        <ul>
          <li>Qualifier les compétences créatives des jeunes candidats (&lt; 35 ans) ;</li>
          <li>Orienter les participants vers les ateliers et formations adaptés à leurs centres d'intérêt ;</li>
          <li>Informer les membres de la communauté des appels à candidatures, résidences et opportunités professionnelles.</li>
        </ul>
      </section>

      <section>
        <h2>4. Base légale et destinataires</h2>
        <p>
          Le traitement repose sur le consentement préalable et éclairé du candidat. Les données sont réservées
          à l'équipe de pilotage de Mboa Jeunes Créatifs au sein de l'Institut français du Cameroun et ne font l'objet
          d'aucune cession commerciale à des tiers.
        </p>
      </section>

      <section>
        <h2>5. Durée de conservation et exercice de vos droits</h2>
        <p>
          Les dossiers sont conservés pendant toute la durée active du programme Mboa Jeunes Créatifs.
          Vous disposez d'un droit permanent d'accès, de rectification, de portabilité et de suppression de vos données.
          Pour exercer ces droits ou retirer votre consentement, contactez notre équipe à l'adresse suivante :
          <a href="mailto:info.yde@ifcameroun.com">info.yde&#64;ifcameroun.com</a>.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 4rem 2rem; max-width: 52rem; }
    section { margin-bottom: 2.5rem; border-left: 4px solid var(--cyan); padding-left: 1.75rem; }
    h2 { font-size: 1.5rem; margin-bottom: .6rem; }
    p, li { color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; }
    ul { margin: .5rem 0 1rem 1.25rem; }
    li { margin-bottom: .4rem; }
  `]
})
export class PrivacyComponent {}
