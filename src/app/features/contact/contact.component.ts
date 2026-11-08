import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Contact" heading="Parlons de vos idées"
      lead="Une question sur le programme, les ateliers ou la participation ? Écrivez-nous." />

    <div class="container body">
      <aside class="info">
        <h2>Institut français du Cameroun</h2>
        <dl>
          <dt>Adresse</dt><dd>127 Avenue du Président Ahmadou Ahidjo<br>Yaoundé, Cameroun</dd>
          <dt>Téléphone</dt><dd>+237 222 22 09 44<br>+237 690 261 970</dd>
          <dt>E-mail</dt><dd><a href="mailto:info.yde&#64;ifcameroun.com">info.yde&#64;ifcameroun.com</a></dd>
        </dl>
        <p class="note">Coordonnées à faire valider par l'IFC avant publication.</p>
      </aside>

      <section class="form-card">
        <h2>Écrire un message</h2>
        <p class="demo"><strong>Mode démonstration :</strong> aucun message n'est réellement envoyé.</p>

        @if (sent()) {
          <div class="ok" role="status">
            <h3>Message simulé enregistré</h3>
            <p>Rien n'a été transmis à un serveur.</p>
            <button type="button" class="btn btn-secondary btn-sm" (click)="reset()">Écrire un autre message</button>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-group">
              <label for="name" class="form-label">Nom complet <span class="required">*</span></label>
              <input id="name" class="form-control" formControlName="name" autocomplete="name">
              @if (bad('name')) { <div class="form-error">Le nom est obligatoire.</div> }
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Adresse e-mail <span class="required">*</span></label>
              <input id="email" type="email" class="form-control" formControlName="email" autocomplete="email">
              @if (bad('email')) { <div class="form-error">Adresse e-mail invalide.</div> }
            </div>
            <div class="form-group">
              <label for="subject" class="form-label">Sujet <span class="required">*</span></label>
              <input id="subject" class="form-control" formControlName="subject">
              @if (bad('subject')) { <div class="form-error">Le sujet est obligatoire.</div> }
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message <span class="required">*</span></label>
              <textarea id="message" rows="5" class="form-control" formControlName="message"></textarea>
              @if (bad('message')) { <div class="form-error">Message trop court (10 caractères minimum).</div> }
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="busy()">{{ busy() ? 'Envoi simulé…' : 'Envoyer' }}</button>
          </form>
        }
      </section>
    </div>
  `,
  styles: [`
    .body { padding-block: 3rem 1rem; display: grid; grid-template-columns: 1fr 1.4fr; gap: 2.5rem; align-items: start; }
    .info { background: var(--ink); color: var(--text-on-dark); border-radius: var(--radius-leaf); padding: 2.2rem; }
    .info h2 { color: var(--ochre); font-size: 1.6rem; }
    dt { font-size: .72rem; letter-spacing: .16em; text-transform: uppercase; color: var(--orange); font-weight: 700; margin-top: 1.2rem; }
    dd { margin: .2rem 0 0; color: var(--text-on-dark); }
    dd a { color: var(--ochre); }
    .note { margin: 1.8rem 0 0; font-size: .78rem; font-style: italic; color: var(--text-on-dark-muted); }
    .form-card { background: var(--white); border: 1px solid var(--line); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; padding: 2.2rem; }
    .demo { background: var(--ochre); border-radius: 12px; padding: .6rem .9rem; font-size: .85rem; margin-bottom: 1.5rem; }
    .ok { background: var(--color-status-selected-bg); color: var(--color-status-selected); border-radius: 16px; padding: 1.5rem; }
    .ok h3 { color: inherit; }
    @media (max-width: 800px) { .body { grid-template-columns: 1fr; } }
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

  bad(c: string): boolean { const x = this.form.get(c); return !!x && x.invalid && (x.touched || x.dirty); }

  async submit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.busy.set(true);
    await new Promise(r => setTimeout(r, 400));
    this.busy.set(false);
    this.sent.set(true);
  }
  reset(): void { this.form.reset(); this.sent.set(false); }
}
