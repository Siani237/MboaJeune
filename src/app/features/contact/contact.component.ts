import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Contact &amp; Orientation"
      heading="Parlons de vos idées"
      lead="Une question sur les filières, les critères d'accès ou les partenariats ? Écrivez à l'équipe du programme."
    />

    <div class="container body">
      <aside class="info card-leaf">
        <h2>Institut français du Cameroun</h2>
        <p class="info-intro">Notre équipe vous accueille et vous oriente du lundi au vendredi.</p>
        <dl>
          <dt>Adresse</dt>
          <dd>127 Avenue du Président Ahmadou Ahidjo<br>Yaoundé, Cameroun</dd>
          
          <dt>Téléphone &amp; WhatsApp</dt>
          <dd>+237 222 22 09 44<br>+237 690 261 970</dd>
          
          <dt>E-mail officiel</dt>
          <dd><a href="mailto:info.yde&#64;ifcameroun.com">info.yde&#64;ifcameroun.com</a></dd>

          <dt>Villes de déploiement</dt>
          <dd>Yaoundé et Douala</dd>
        </dl>
      </aside>

      <section class="form-card card">
        <h2>Envoyer un message</h2>
        <p class="form-lead">Remplissez le formulaire ci-dessous, notre équipe vous répond sous 48h ouvrées.</p>

        @if (sent()) {
          <div class="ok" role="status">
            <h3>Message envoyé avec succès !</h3>
            <p>Merci pour votre prise de contact. Un membre de l'équipe Mboa Jeunes Créatifs vous répondra dans les plus brefs délais.</p>
            <button type="button" class="btn btn-secondary btn-sm" (click)="reset()">Envoyer un autre message</button>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-group">
              <label for="name" class="form-label">Nom complet <span class="required">*</span></label>
              <input id="name" class="form-control" formControlName="name" placeholder="Ex: Jean Paul Ndjomo" autocomplete="name">
              @if (bad('name')) { <div class="form-error">Le nom est obligatoire.</div> }
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Adresse courriel <span class="required">*</span></label>
              <input id="email" type="email" class="form-control" formControlName="email" placeholder="nom@exemple.cm" autocomplete="email">
              @if (bad('email')) { <div class="form-error">Adresse courriel invalide.</div> }
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Objet de la demande <span class="required">*</span></label>
              <input id="subject" class="form-control" formControlName="subject" placeholder="Ex: Renseignement atelier Musique & DJing">
              @if (bad('subject')) { <div class="form-error">Le sujet est obligatoire.</div> }
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Message <span class="required">*</span></label>
              <textarea id="message" rows="5" class="form-control" formControlName="message" placeholder="Détaillez votre question ou votre projet..."></textarea>
              @if (bad('message')) { <div class="form-error">Message trop court (10 caractères minimum).</div> }
            </div>

            <button type="submit" class="btn btn-primary btn-lg" [disabled]="busy()">
              {{ busy() ? 'Envoi en cours…' : 'Envoyer mon message' }}
            </button>
          </form>
        }
      </section>
    </div>
  `,
  styles: [`
    .body {
      padding-block: 4.5rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 3rem;
      align-items: start;
    }
    .info {
      background: var(--ink);
      color: var(--text-on-dark);
      padding: 3rem 2.5rem;
      box-shadow: var(--shadow-md);
    }
    .info h2 { color: var(--ochre); font-size: 1.85rem; margin-bottom: .5rem; }
    .info-intro { color: var(--text-on-dark-muted); font-size: .95rem; margin-bottom: 2rem; }
    dt {
      font-size: .75rem;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--orange);
      font-weight: 800;
      margin-top: 1.4rem;
    }
    dd { margin: .25rem 0 0; color: var(--text-on-dark); font-size: 1.05rem; line-height: 1.5; }
    dd a { color: var(--ochre); }

    .form-card {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius-leaf);
      padding: 3rem;
      box-shadow: var(--shadow-md);
    }
    .form-card h2 { font-size: 2rem; margin-bottom: .5rem; }
    .form-lead { color: var(--text-muted); font-size: 1.02rem; margin-bottom: 2rem; }

    .ok {
      background: var(--color-status-selected-bg);
      color: var(--color-status-selected);
      border-radius: 18px;
      padding: 2rem;
    }
    .ok h3 { color: inherit; font-size: 1.5rem; margin-bottom: .5rem; }
    .ok p { margin-bottom: 1.5rem; }

    @media (max-width: 860px) {
      .body { grid-template-columns: 1fr; }
      .form-card { padding: 2rem; }
      .info { padding: 2rem; }
    }
  `]
})
export class ContactComponent {
  private readonly fb = new FormBuilder();
  readonly busy = signal(false);
  readonly sent = signal(false);
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  bad(c: string): boolean {
    const x = this.form.get(c);
    return !!x && x.invalid && (x.touched || x.dirty);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    await new Promise(r => setTimeout(r, 450));
    this.busy.set(false);
    this.sent.set(true);
  }

  reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}
