import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RouterLink, EmptyStateComponent, PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Témoignages" heading="Leurs expériences, bientôt ici"
      lead="Les parcours des jeunes qui participent au programme seront publiés avec leur accord." />
    <div class="container body">
      <app-empty-state title="Aucun témoignage publié pour l'instant"
        message="Les témoignages seront affichés ici une fois recueillis et autorisés. Revenez bientôt.">
        <a routerLink="/communaute" class="btn btn-primary" style="margin-top:1.25rem">Rejoindre la communauté</a>
      </app-empty-state>
    </div>
  `,
  styles: [`.body { padding-block: 3rem 1rem; max-width: 52rem; }`]
})
export class TestimonialsComponent {}
