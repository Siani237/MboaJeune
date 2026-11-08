import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Cadre légal" heading="Mentions légales" />
    <div class="container body">
      <p class="draft"><strong>Brouillon non validé.</strong> Ce texte doit être validé par l'IFC et son conseil juridique avant toute publication réelle.</p>

      <section><h2>1. Éditeur</h2>
        <p>Institut français du Cameroun (IFC)<br>127 Avenue du Président Ahmadou Ahidjo, Yaoundé<br>+237 222 22 09 44 · +237 690 261 970<br>info.yde&#64;ifcameroun.com</p>
        <p>Le programme Mboa Jeunes Créatifs est financé par le Fonds Équipe France de l'Ambassade de France au Cameroun.</p>
        <p class="tbd">Directeur de la publication : à définir par l'IFC.</p></section>
      <section><h2>2. Statut de cette version</h2>
        <p>Maquette de démonstration fonctionnant dans le navigateur, sans serveur. Elle ne recueille aucune candidature réelle.</p></section>
      <section><h2>3. Propriété intellectuelle</h2>
        <p>Les noms, logos et marques cités appartiennent à leurs détenteurs. Les éléments graphiques de cette maquette sont provisoires.</p></section>
      <section><h2>4. Hébergement</h2>
        <p class="tbd">À définir : l'hébergeur de la version publique n'est pas encore choisi.</p></section>
    </div>
  `,
  styles: [`
    .body { padding-block: 3rem 1rem; max-width: 50rem; }
    .draft { background: var(--ochre); border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 2.5rem; }
    section { margin-bottom: 2rem; border-left: 4px solid var(--orange); padding-left: 1.4rem; }
    h2 { font-size: 1.4rem; }
    p { color: var(--text-muted); }
    .tbd { font-style: italic; background: var(--paper-2); padding: .5rem .8rem; border-radius: 10px; }
  `]
})
export class LegalComponent {}
