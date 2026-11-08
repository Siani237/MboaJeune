import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Cadre institutionnel" heading="Mentions légales" />
    <div class="container body">
      <section>
        <h2>1. Éditeur de la plateforme</h2>
        <p>
          <strong>Institut français du Cameroun (IFC)</strong><br>
          127 Avenue du Président Ahmadou Ahidjo, Yaoundé, Cameroun<br>
          Téléphone : +237 222 22 09 44 · +237 690 261 970<br>
          Courriel : info.yde&#64;ifcameroun.com
        </p>
        <p>
          Le programme <strong>Mboa Jeunes Créatifs</strong> est mis en œuvre par l'Institut français du Cameroun
          avec le soutien financier du <strong>Fonds Équipe France de l'Ambassade de France au Cameroun</strong>.
        </p>
      </section>

      <section>
        <h2>2. Directeur de la publication</h2>
        <p>
          La direction générale de l'Institut français du Cameroun.
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus (textes, photographies, pictogrammes, logos, vidéos et éléments graphiques)
          présents sur cette plateforme sont la propriété exclusive de l'Institut français du Cameroun ou font
          l'objet d'une autorisation préalable de diffusion. Toute reproduction totale ou partielle sans accord
          écrit préalable est strictement interdite.
        </p>
      </section>

      <section>
        <h2>4. Données à caractère personnel</h2>
        <p>
          La gestion des données des utilisateurs et candidats au Pool de talents s'effectue dans le respect de
          la législation camerounaise applicable, notamment la <strong>Loi n° 2024/017 du 23 décembre 2024</strong>
          relative à la protection des données à caractère personnel. Pour toute information relative à vos droits,
          veuillez vous référer à notre politique de confidentialité.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 4rem 2rem; max-width: 52rem; }
    section { margin-bottom: 2.5rem; border-left: 4px solid var(--orange); padding-left: 1.75rem; }
    h2 { font-size: 1.5rem; margin-bottom: .6rem; }
    p { color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; }
  `]
})
export class LegalComponent {}
