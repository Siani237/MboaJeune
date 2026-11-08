import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Échange & Orientation</span>
        <h1>Contacter l'équipe</h1>
        <p class="lead">
          Vous avez une question sur les formations, souhaitez proposer un partenariat ou en savoir plus sur Mboa Jeunes Créatifs ?
        </p>
      </header>

      <div class="contact-layout">
        <div class="contact-info card">
          <h2>Coordonnées du programme</h2>
          <p class="subtitle">Institut français du Cameroun (IFC)</p>

          <div class="info-block">
            <strong>Adresse physique :</strong>
            <p>127 Avenue du Président Ahmadou Ahidjo<br>Yaoundé, Cameroun</p>
          </div>

          <div class="info-block">
            <strong>Téléphone & WhatsApp :</strong>
            <p>+237 222 22 09 44<br>+237 690 261 970</p>
          </div>

          <div class="info-block">
            <strong>Courrier électronique :</strong>
            <p><a href="mailto:info.yde@ifcameroun.com">info.yde&#64;ifcameroun.com</a></p>
          </div>

          <div class="disclaimer-note">
            <p><em>* Remarque : Ces coordonnées institutionnelles sont fournies à titre indicatif et restent sujettes à validation formelle par l'IFC.</em></p>
          </div>
        </div>

        <div class="contact-form-card card">
          <h2>Envoyer un message (Simulation)</h2>
          <p class="form-disclaimer">
            <strong>Mode démonstration :</strong> Ce formulaire simule un envoi de message. Aucun courriel réel n'est expédié.
          </p>

          <div *ngIf="sentSuccess()" class="alert-success">
            <strong>Message simulé avec succès !</strong>
            <p>Votre demande fictive a été enregistrée dans la session locale.</p>
            <button type="button" class="btn btn-secondary btn-sm" (click)="resetForm()">Envoyer un autre message</button>
          </div>

          <form *ngIf="!sentSuccess()" [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name" class="form-label">Votre nom complet <span class="required">*</span></label>
              <input id="name" type="text" class="form-control" formControlName="name" placeholder="Ex: Jean Dupont">
              <div *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.invalid" class="form-error">
                Le nom est obligatoire.
              </div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Votre adresse email <span class="required">*</span></label>
              <input id="email" type="email" class="form-control" formControlName="email" placeholder="nom@exemple.cm">
              <div *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid" class="form-error">
                Veuillez renseigner une adresse email valide.
              </div>
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Sujet de votre demande <span class="required">*</span></label>
              <input id="subject" type="text" class="form-control" formControlName="subject" placeholder="Ex: Renseignement atelier numérique">
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Votre message <span class="required">*</span></label>
              <textarea id="message" rows="5" class="form-control" formControlName="message" placeholder="Détaillez votre question..."></textarea>
              <div *ngIf="contactForm.get('message')?.touched && contactForm.get('message')?.invalid" class="form-error">
                Le message est obligatoire.
              </div>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="contactForm.invalid || isSubmitting()">
              {{ isSubmitting() ? 'Envoi simulé en cours...' : 'Envoyer mon message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 960px;
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
    .lead {
      font-size: 1.15rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-top: 0.75rem;
    }
    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 2rem;
    }
    .contact-info {
      padding: 2rem;
      background-color: var(--color-surface-subtle);
      height: fit-content;
    }
    .contact-info h2 {
      font-size: 1.4rem;
      margin-bottom: 0.25rem;
    }
    .subtitle {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .info-block {
      margin-bottom: 1.25rem;
      font-size: 0.95rem;
    }
    .info-block strong {
      display: block;
      color: var(--color-text-main);
      margin-bottom: 0.25rem;
    }
    .info-block p {
      color: var(--color-text-muted);
      margin: 0;
    }
    .disclaimer-note {
      font-size: 0.8rem;
      color: var(--color-text-light);
      margin-top: 2rem;
      border-top: 1px solid var(--color-border);
      padding-top: 1rem;
    }
    .contact-form-card {
      padding: 2rem;
    }
    .contact-form-card h2 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .form-disclaimer {
      font-size: 0.85rem;
      color: var(--color-demo-banner);
      background-color: var(--color-demo-banner-bg);
      padding: 0.65rem 0.85rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.5rem;
    }
    .alert-success {
      background-color: var(--color-status-selected-bg);
      color: var(--color-status-selected);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.5rem;
    }
    .alert-success strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.35rem;
    }
    .alert-success p {
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .contact-layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  private readonly fb = new FormBuilder();
  readonly isSubmitting = signal(false);
  readonly sentSuccess = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) return;
    this.isSubmitting.set(true);
    // Simulation réseau
    await new Promise((r) => setTimeout(r, 400));
    this.isSubmitting.set(false);
    this.sentSuccess.set(true);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.sentSuccess.set(false);
  }
}
