import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Cadre légal" heading="Politique de confidentialité" />
    <div class="container body">
      <p class="draft"><strong>Brouillon non validé.</strong> Aucune donnée réelle n'est collectée dans cette version de démonstration.
        Le dossier cite la loi camerounaise n° 2024/017 du 23 décembre 2024 ; son application précise reste à examiner par l'IFC et son conseil juridique.</p>

      <section><h2>1. Responsable du traitement</h2>
        <p class="tbd">À confirmer par l'IFC.</p></section>
      <section><h2>2. Finalités envisagées (Pool de talents)</h2>
        <ul>
          <li>Identifier les profils de jeunes intéressés par les industries culturelles et créatives ;</li>
          <li>Orienter vers des ateliers, formations et événements ;</li>
          <li>Communiquer des opportunités adaptées aux centres d'intérêt indiqués.</li>
        </ul>
        <p class="tbd">Finalités définitives à valider par l'IFC.</p></section>
      <section><h2>3. Base légale et destinataires</h2>
        <p class="tbd">À définir par l'IFC et son conseil juridique.</p></section>
      <section><h2>4. Durée de conservation</h2>
        <p class="tbd">À définir par l'IFC. Aucune durée n'est arrêtée à ce stade.</p></section>
      <section><h2>5. Droits des personnes</h2>
        <p>La procédure d'exercice des droits (accès, rectification, suppression, retrait du consentement) sera précisée après validation juridique.</p>
        <p class="tbd">Contact dédié : à définir.</p></section>
      <section><h2>6. Avertissement pour la démonstration</h2>
        <p>Le formulaire du Pool fonctionne dans votre navigateur uniquement. <strong>Ne saisissez aucune donnée personnelle réelle</strong> et ne sélectionnez aucun document confidentiel.</p></section>
    </div>
  `,
  styles: [`
    .body { padding-block: 3rem 1rem; max-width: 50rem; }
    .draft { background: var(--ochre); border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 2.5rem; }
    section { margin-bottom: 2rem; border-left: 4px solid var(--cyan); padding-left: 1.4rem; }
    h2 { font-size: 1.4rem; }
    p, li { color: var(--text-muted); }
    .tbd { font-style: italic; background: var(--paper-2); padding: .5rem .8rem; border-radius: 10px; }
  `]
})
export class PrivacyComponent {}
