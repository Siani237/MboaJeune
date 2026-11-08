import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TalentService } from '../../core/services/talent.service';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo } from '../../domain/models/activity.model';
import { CreateTalentInput, TalentProfile } from '../../domain/models/talent.model';
import { environment } from '../../../environments/environment';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-talent-pool-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Rejoindre la communauté"
      heading="Rejoignez le Pool de talents"
      lead="Faites-vous identifier auprès de l'Institut français du Cameroun pour accéder en priorité aux ateliers, formations et résidences artistiques."
    />

    <div class="container page-content">
      <!-- ÉCRAN DE CONFIRMATION SUCCÈS -->
      @if (createdProfile(); as profile) {
        <div class="confirmation-card card">
          <div class="confirm-badge">INSCRIPTION VALIDÉE</div>
          <h2>Bienvenue dans le Pool Mboa Jeunes Créatifs !</h2>
          <p class="confirm-lead">
            Merci <strong>{{ profile.firstName }} {{ profile.lastName }}</strong>, vos informations ont bien été enregistrées.
            Notre équipe examinera votre profil et vous contactera dès qu'une session correspondant à vos centres d'intérêt sera programmée.
          </p>

          <div class="summary-box">
            <h3>Récapitulatif de votre inscription :</h3>
            <ul>
              <li><strong>Numéro de dossier :</strong> <code>{{ profile.id }}</code></li>
              <li><strong>Ville de rattachement :</strong> {{ profile.city === 'Other' ? profile.cityOther : profile.city }}</li>
              <li><strong>Filières choisies :</strong> {{ profile.interests.join(', ') }}</li>
              <li><strong>Statut du dossier :</strong> <span class="badge badge-new">En cours d'examen</span></li>
            </ul>
          </div>

          <div class="confirm-actions">
            <a routerLink="/" class="btn btn-secondary">Retour à l'accueil</a>
            <a routerLink="/opportunites" class="btn btn-primary">Consulter les prochains ateliers →</a>
          </div>
        </div>
      } @else {
        <!-- FORMULAIRE PRINCIPAL -->
        <form [formGroup]="talentForm" (ngSubmit)="onSubmit()" class="talent-form">
          <!-- Section 1 : Informations personnelles -->
          <fieldset class="form-section card">
            <legend class="section-title">1. Informations personnelles &amp; Contact</legend>
            <p class="section-desc">Renseignez vos coordonnées directes pour recevoir les convocations aux ateliers.</p>

            <div class="form-row">
              <div class="form-group flex-1">
                <label for="lastName" class="form-label">Nom de famille <span class="required">*</span></label>
                <input id="lastName" type="text" class="form-control" formControlName="lastName" placeholder="Ex: Ewane">
                @if (isInvalid('lastName')) { <div class="form-error">Le nom est obligatoire.</div> }
              </div>

              <div class="form-group flex-1">
                <label for="firstName" class="form-label">Prénom(s) <span class="required">*</span></label>
                <input id="firstName" type="text" class="form-control" formControlName="firstName" placeholder="Ex: Amina">
                @if (isInvalid('firstName')) { <div class="form-error">Le prénom est obligatoire.</div> }
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label for="birthDate" class="form-label">Date de naissance <span class="required">*</span></label>
                <input id="birthDate" type="date" class="form-control" formControlName="birthDate">
                <div class="form-hint">Le programme s'adresse en priorité aux jeunes de moins de 35 ans.</div>
                @if (isInvalid('birthDate')) { <div class="form-error">Veuillez renseigner votre date de naissance.</div> }
              </div>

              <div class="form-group flex-1">
                <label for="city" class="form-label">Ville de résidence <span class="required">*</span></label>
                <select id="city" class="form-control" formControlName="city">
                  <option value="Yaounde">Yaoundé</option>
                  <option value="Douala">Douala</option>
                  <option value="Other">Autre localité (Cameroun)</option>
                </select>
              </div>
            </div>

            @if (talentForm.get('city')?.value === 'Other') {
              <div class="form-group">
                <label for="cityOther" class="form-label">Précisez votre ville <span class="required">*</span></label>
                <input id="cityOther" type="text" class="form-control" formControlName="cityOther" placeholder="Ex: Bafoussam, Garoua, Buea...">
              </div>
            }

            <div class="form-row">
              <div class="form-group flex-1">
                <label for="email" class="form-label">Adresse courriel <span class="required">*</span></label>
                <input id="email" type="email" class="form-control" formControlName="email" placeholder="amina.ewane@gmail.com">
                @if (isInvalid('email')) { <div class="form-error">Adresse courriel invalide.</div> }
              </div>

              <div class="form-group flex-1">
                <label for="phone" class="form-label">Téléphone / WhatsApp <span class="required">*</span></label>
                <input id="phone" type="tel" class="form-control" formControlName="phone" placeholder="+237 690 00 00 00">
                @if (isInvalid('phone')) { <div class="form-error">Numéro de téléphone obligatoire.</div> }
              </div>
            </div>
          </fieldset>

          <!-- Section 2 : Parcours & Situation -->
          <fieldset class="form-section card">
            <legend class="section-title">2. Situation &amp; Parcours</legend>

            <div class="form-row">
              <div class="form-group flex-1">
                <label for="currentSituation" class="form-label">Situation actuelle <span class="required">*</span></label>
                <select id="currentSituation" class="form-control" formControlName="currentSituation">
                  <option value="student">Étudiant(e)</option>
                  <option value="graduate">Jeune diplômé(e)</option>
                  <option value="entrepreneur">Entrepreneur(e) / Porteur de projet</option>
                  <option value="other">Autre situation</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label for="educationLevel" class="form-label">Niveau d'études / formation préparée <span class="required">*</span></label>
                <input id="educationLevel" type="text" class="form-control" formControlName="educationLevel" placeholder="Ex: Licence, BTS, Baccalauréat, Autodidacte...">
                @if (isInvalid('educationLevel')) { <div class="form-error">Ce champ est requis.</div> }
              </div>
            </div>

            @if (talentForm.get('currentSituation')?.value === 'other') {
              <div class="form-group">
                <label for="currentSituationOther" class="form-label">Précisez votre situation</label>
                <input id="currentSituationOther" type="text" class="form-control" formControlName="currentSituationOther">
              </div>
            }

            <div class="form-group">
              <label for="background" class="form-label">Résumé de votre parcours <span class="required">*</span></label>
              <textarea id="background" rows="3" class="form-control" formControlName="background" placeholder="Présentez brièvement vos études, vos passions créatives ou vos premières réalisations..."></textarea>
              @if (isInvalid('background')) { <div class="form-error">Veuillez décrire brièvement votre parcours.</div> }
            </div>
          </fieldset>

          <!-- Section 3 : Domaines créatifs & Compétences -->
          <fieldset class="form-section card">
            <legend class="section-title">3. Filières d'intérêt &amp; Motivations</legend>
            <p class="section-desc">Cochez les disciplines qui vous intéressent (une ou plusieurs) :</p>

            <div class="interests-grid">
              @for (domain of availableDomains(); track domain.key) {
                <label class="checkbox-card">
                  <input
                    type="checkbox"
                    [checked]="isDomainSelected(domain.key)"
                    (change)="onDomainToggle(domain.key, $event)"
                  >
                  <div class="check-content">
                    <strong>{{ domain.name }}</strong>
                    <span>{{ domain.tagline }}</span>
                  </div>
                </label>
              }
            </div>
            @if (interestsTouched && selectedInterests.length === 0) {
              <div class="form-error">Veuillez sélectionner au moins un domaine d'intérêt.</div>
            }

            <div class="form-group" style="margin-top: 1.75rem;">
              <label for="skillsAndExperience" class="form-label">Compétences et expériences préalables <span class="required">*</span></label>
              <textarea id="skillsAndExperience" rows="3" class="form-control" formControlName="skillsAndExperience" placeholder="Quels outils ou techniques utilisez-vous déjà ? Même débutant, décrivez votre curiosité et vos projets personnels."></textarea>
              @if (isInvalid('skillsAndExperience')) { <div class="form-error">Ce champ est obligatoire.</div> }
            </div>

            <div class="form-group">
              <label for="motivation" class="form-label">Vos motivations pour intégrer Mboa Jeunes Créatifs <span class="required">*</span></label>
              <textarea id="motivation" rows="3" class="form-control" formControlName="motivation" placeholder="Pourquoi souhaitez-vous participer aux activités du programme ?"></textarea>
              @if (isInvalid('motivation')) { <div class="form-error">La motivation est obligatoire.</div> }
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label for="learningGoals" class="form-label">Objectif d'apprentissage visé</label>
                <input id="learningGoals" type="text" class="form-control" formControlName="learningGoals" placeholder="Ex: Perfectionner mon mixage audio, apprendre le patronage couture...">
              </div>

              <div class="form-group flex-1">
                <label for="availability" class="form-label">Disponibilité horaire <span class="required">*</span></label>
                <input id="availability" type="text" class="form-control" formControlName="availability" placeholder="Ex: Temps partiel, week-ends, après-midis...">
                @if (isInvalid('availability')) { <div class="form-error">Veuillez indiquer vos disponibilités.</div> }
              </div>
            </div>
          </fieldset>

          <!-- Section 4 : Pièce jointe & Portfolio (Facultatif) -->
          <fieldset class="form-section card">
            <legend class="section-title">4. CV ou Portfolio (Facultatif)</legend>
            <div class="form-group">
              <label for="cvFile" class="form-label">Document d'illustration (PDF, JPG, PNG)</label>
              <input id="cvFile" type="file" class="form-control" (change)="onFileSimulated($event)">
              <div class="form-hint">Vous pouvez joindre votre CV ou un extrait de vos créations.</div>
              @if (simulatedFileName()) {
                <div class="simulated-file-info">
                  Fichier sélectionné : <strong>{{ simulatedFileName() }}</strong>
                </div>
              }
            </div>

            <div class="form-group">
              <label for="portfolioUrl" class="form-label">Lien vers votre portfolio ou vos réalisations en ligne</label>
              <input id="portfolioUrl" type="url" class="form-control" formControlName="portfolioUrl" placeholder="https://instagram.com/votre_profil ou lien Behance, SoundCloud...">
            </div>
          </fieldset>

          <!-- Section 5 : Consentement éclairé -->
          <fieldset class="form-section consent-section card">
            <legend class="section-title">5. Consentement et engagement</legend>
            <div class="consent-box">
              <p class="consent-text">
                En soumettant ce formulaire, j'accepte que les données renseignées soient traitées par l'Institut français du Cameroun 
                dans le cadre exclusif du programme Mboa Jeunes Créatifs, pour m'orienter vers les ateliers et formations adaptés. 
                Conformément à la législation en vigueur sur la protection des données à caractère personnel, vous disposez d'un droit d'accès, 
                de modification et de suppression de vos données personnelles sur simple demande.
              </p>

              <label class="checkbox-label">
                <input type="checkbox" formControlName="consentGranted">
                <span><strong>J'ai lu et j'accepte les conditions de participation <span class="required">*</span></strong></span>
              </label>
              @if (isInvalid('consentGranted')) {
                <div class="form-error">Le consentement est requis pour valider votre inscription.</div>
              }
            </div>

            <div class="submit-row">
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                [disabled]="talentForm.invalid || selectedInterests.length === 0 || isSubmitting()"
              >
                {{ isSubmitting() ? 'Traitement en cours...' : 'Confirmer mon inscription au Pool de talents' }}
              </button>
            </div>
          </fieldset>
        </form>
      }
    </div>
  `,
  styles: [`
    .page-content { padding-block: 3.5rem 2rem; max-width: 54rem; }
    .talent-form { display: flex; flex-direction: column; gap: 2.25rem; }
    .form-section {
      border: 1px solid var(--line);
      background: var(--white);
      border-radius: var(--radius-leaf);
      padding: 2.5rem;
      margin: 0;
      box-shadow: var(--shadow-sm);
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      padding: .4rem 1.25rem;
      background: var(--ink);
      color: var(--ochre);
      border-radius: 999px;
    }
    .section-desc {
      color: var(--text-muted);
      font-size: .95rem;
      margin: .8rem 0 1.5rem;
    }
    .form-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: .6rem; }
    .flex-1 { flex: 1; min-width: 250px; }

    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: .85rem;
      margin-top: .75rem;
    }
    .checkbox-card {
      display: flex;
      align-items: flex-start;
      gap: .75rem;
      background: var(--paper-2);
      border: 2px solid transparent;
      padding: 1rem 1.15rem;
      border-radius: 16px;
      cursor: pointer;
      font-size: .92rem;
      transition: all .2s ease;
    }
    .checkbox-card:hover { border-color: var(--orange); }
    .checkbox-card:has(input:checked) {
      background: #fdecd2;
      border-color: var(--orange);
    }
    .checkbox-card input {
      margin-top: .25rem;
      accent-color: var(--orange-deep);
      width: 18px;
      height: 18px;
    }
    .check-content strong { display: block; color: var(--text); }
    .check-content span { display: block; font-size: .8rem; color: var(--text-muted); }

    .simulated-file-info {
      margin-top: .65rem;
      font-size: .88rem;
      background: var(--color-status-selected-bg);
      color: var(--color-status-selected);
      padding: .5rem .95rem;
      border-radius: 10px;
    }

    .consent-section {
      background: var(--paper-2);
      border-color: var(--ochre);
    }
    .consent-text {
      font-size: .94rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: .75rem;
      cursor: pointer;
      font-size: .95rem;
    }
    .checkbox-label input {
      accent-color: var(--orange-deep);
      width: 20px;
      height: 20px;
    }
    .submit-row {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    /* Confirmation */
    .confirmation-card {
      padding: 4rem 2.5rem;
      text-align: center;
      border-top: 8px solid var(--green);
      border-radius: var(--radius-leaf);
    }
    .confirm-badge {
      display: inline-block;
      font-size: .75rem;
      font-weight: 800;
      letter-spacing: .12em;
      color: var(--green-deep);
      background: var(--color-status-selected-bg);
      padding: .35rem 1rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
    }
    .confirmation-card h2 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }
    .confirm-lead {
      color: var(--text-muted);
      font-size: 1.15rem;
      max-width: 40rem;
      margin: 0 auto 2.5rem;
      line-height: 1.6;
    }
    .summary-box {
      background: var(--paper-2);
      border-radius: 20px;
      padding: 2rem;
      max-width: 34rem;
      margin: 0 auto 2.5rem;
      text-align: left;
    }
    .summary-box h3 { font-size: 1.1rem; margin-bottom: 1rem; }
    .summary-box ul {
      margin: 0;
      padding-left: 1.25rem;
      font-size: .95rem;
      color: var(--text-muted);
    }
    .summary-box li { margin-bottom: .6rem; }
    .confirm-actions {
      display: flex;
      justify-content: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .form-section { padding: 1.75rem; }
      .confirmation-card { padding: 2.5rem 1.5rem; }
    }
  `]
})
export class TalentPoolFormComponent implements OnInit {
  private readonly fb = new FormBuilder();
  private readonly talentService = inject(TalentService);
  private readonly activityRepo = inject(ACTIVITY_REPOSITORY);

  readonly currentNoticeVersion = environment.noticeVersion;
  readonly availableDomains = signal<DomainInfo[]>([]);
  readonly selectedInterests: string[] = [];
  interestsTouched = false;

  readonly simulatedFileName = signal<string | null>(null);
  readonly isSubmitting = signal(false);
  readonly createdProfile = signal<TalentProfile | null>(null);

  readonly talentForm = this.fb.group({
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', Validators.required],
    city: ['Yaounde', Validators.required],
    cityOther: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    currentSituation: ['student', Validators.required],
    currentSituationOther: [''],
    educationLevel: ['', Validators.required],
    background: ['', [Validators.required, Validators.minLength(10)]],
    skillsAndExperience: ['', [Validators.required, Validators.minLength(5)]],
    motivation: ['', [Validators.required, Validators.minLength(10)]],
    learningGoals: [''],
    availability: ['', Validators.required],
    portfolioUrl: [''],
    consentGranted: [false, Validators.requiredTrue]
  });

  async ngOnInit(): Promise<void> {
    const list = await this.activityRepo.getDomains();
    this.availableDomains.set(list);
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.talentForm.get(controlName);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  isDomainSelected(key: string): boolean {
    return this.selectedInterests.includes(key);
  }

  onDomainToggle(key: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.interestsTouched = true;
    if (checked) {
      if (!this.selectedInterests.includes(key)) {
        this.selectedInterests.push(key);
      }
    } else {
      const idx = this.selectedInterests.indexOf(key);
      if (idx > -1) {
        this.selectedInterests.splice(idx, 1);
      }
    }
  }

  onFileSimulated(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.simulatedFileName.set(input.files[0].name);
    } else {
      this.simulatedFileName.set(null);
    }
  }

  async onSubmit(): Promise<void> {
    this.interestsTouched = true;
    if (this.talentForm.invalid || this.selectedInterests.length === 0) {
      this.talentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const val = this.talentForm.value;
    const input: CreateTalentInput = {
      lastName: val.lastName || '',
      firstName: val.firstName || '',
      birthDate: val.birthDate || '',
      city: (val.city as any) || 'Yaounde',
      cityOther: val.city === 'Other' ? val.cityOther || '' : undefined,
      email: val.email || '',
      phone: val.phone || '',
      currentSituation: (val.currentSituation as any) || 'student',
      currentSituationOther: val.currentSituation === 'other' ? val.currentSituationOther || '' : undefined,
      educationLevel: val.educationLevel || '',
      background: val.background || '',
      interests: [...this.selectedInterests],
      skillsAndExperience: val.skillsAndExperience || '',
      motivation: val.motivation || '',
      learningGoals: val.learningGoals || undefined,
      availability: val.availability || '',
      portfolioUrl: val.portfolioUrl || undefined,
      cvFileNameSimulated: this.simulatedFileName() || undefined,
      consent: {
        granted: true,
        noticeVersion: this.currentNoticeVersion,
        acceptedAt: new Date().toISOString()
      }
    };

    try {
      const created = await this.talentService.registerTalent(input);
      this.createdProfile.set(created);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.talentForm.reset({
      city: 'Yaounde',
      currentSituation: 'student',
      consentGranted: false
    });
    this.selectedInterests.length = 0;
    this.interestsTouched = false;
    this.simulatedFileName.set(null);
    this.createdProfile.set(null);
  }
}
