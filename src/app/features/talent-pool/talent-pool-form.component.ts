import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
    <app-page-hero eyebrow="Rejoindre la communauté" heading="Rejoignez le Pool de talents"
        lead="Faites-vous identifier pour les prochains ateliers et opportunités. L'inscription au Pool ne vaut pas candidature à une activité." />

    <div class="container page-content">
      <div class="demo-alert" role="alert">
        <span class="demo-alert-badge">Maquette de démonstration</span>
        <p><strong>Ne saisissez aucune donnée personnelle réelle.</strong> Ce formulaire fonctionne uniquement dans votre navigateur (Mock Backend). Aucun CV n'est envoyé ni conservé.</p>
      </div>

      <!-- Écran de confirmation après soumission -->
      <div *ngIf="createdProfile() as profile" class="confirmation-card card">
        <div class="confirm-badge">SIMULATION RÉUSSIE</div>
        <h2>Inscription de démonstration enregistrée !</h2>
        <p class="confirm-lead">
          Votre profil fictif <strong>{{ profile.firstName }} {{ profile.lastName }}</strong> a été créé avec succès 
          dans le magasin de données local de démonstration.
        </p>

        <div class="summary-box">
          <h3>Récapitulatif des données de démo :</h3>
          <ul>
            <li><strong>Identifiant généré :</strong> <code>{{ profile.id }}</code></li>
            <li><strong>Statut initial :</strong> <span class="badge badge-new">Nouveau</span></li>
            <li><strong>Ville :</strong> {{ profile.city === 'Other' ? profile.cityOther : profile.city }}</li>
            <li><strong>Filières d'intérêt :</strong> {{ profile.interests.join(', ') }}</li>
            <li><strong>Notice de consentement :</strong> {{ profile.consent.noticeVersion }}</li>
          </ul>
        </div>

        <div class="confirm-actions">
          <button type="button" class="btn btn-secondary" (click)="resetForm()">
            Remplir un nouveau profil de test
          </button>
          <a routerLink="/admin/talents" class="btn btn-primary">
            Voir le profil dans l'espace admin démo →
          </a>
        </div>
      </div>

      <!-- Formulaire principal -->
      <form *ngIf="!createdProfile()" [formGroup]="talentForm" (ngSubmit)="onSubmit()" class="talent-form">
        <!-- Section 1 : État civil & contact -->
        <fieldset class="form-section card">
          <legend class="section-title">1. Informations personnelles & Contact</legend>
          <p class="section-desc">Coordonnées de base pour le suivi du profil.</p>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="lastName" class="form-label">Nom de famille <span class="required">*</span></label>
              <input id="lastName" type="text" class="form-control" formControlName="lastName" placeholder="Ex: Dupont (Fictif)">
              <div *ngIf="isInvalid('lastName')" class="form-error">Le nom est obligatoire.</div>
            </div>

            <div class="form-group flex-1">
              <label for="firstName" class="form-label">Prénom(s) <span class="required">*</span></label>
              <input id="firstName" type="text" class="form-control" formControlName="firstName" placeholder="Ex: Alex">
              <div *ngIf="isInvalid('firstName')" class="form-error">Le prénom est obligatoire.</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="birthDate" class="form-label">Date de naissance <span class="required">*</span></label>
              <input id="birthDate" type="date" class="form-control" formControlName="birthDate">
              <div class="form-hint">Le programme s'adresse en priorité aux moins de 35 ans.</div>
              <div *ngIf="isInvalid('birthDate')" class="form-error">Veuillez renseigner une date de naissance valide.</div>
            </div>

            <div class="form-group flex-1">
              <label for="city" class="form-label">Ville de résidence <span class="required">*</span></label>
              <select id="city" class="form-control" formControlName="city">
                <option value="Yaounde">Yaoundé</option>
                <option value="Douala">Douala</option>
                <option value="Other">Autre ville</option>
              </select>
            </div>
          </div>

          <div class="form-group" *ngIf="talentForm.get('city')?.value === 'Other'">
            <label for="cityOther" class="form-label">Précisez votre ville <span class="required">*</span></label>
            <input id="cityOther" type="text" class="form-control" formControlName="cityOther" placeholder="Ex: Bafoussam, Garoua...">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="email" class="form-label">Adresse courriel <span class="required">*</span></label>
              <input id="email" type="email" class="form-control" formControlName="email" placeholder="test@exemple.cm">
              <div *ngIf="isInvalid('email')" class="form-error">Courriel invalide.</div>
            </div>

            <div class="form-group flex-1">
              <label for="phone" class="form-label">Téléphone / WhatsApp <span class="required">*</span></label>
              <input id="phone" type="tel" class="form-control" formControlName="phone" placeholder="+237 600 00 00 00">
              <div *ngIf="isInvalid('phone')" class="form-error">Numéro de contact obligatoire.</div>
            </div>
          </div>
        </fieldset>

        <!-- Section 2 : Parcours & Situation -->
        <fieldset class="form-section card">
          <legend class="section-title">2. Situation & Parcours</legend>

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
              <label for="educationLevel" class="form-label">Niveau d'études / diplôme préparé <span class="required">*</span></label>
              <input id="educationLevel" type="text" class="form-control" formControlName="educationLevel" placeholder="Ex: Licence, BTS, Autodidacte...">
              <div *ngIf="isInvalid('educationLevel')" class="form-error">Ce champ est requis.</div>
            </div>
          </div>

          <div class="form-group" *ngIf="talentForm.get('currentSituation')?.value === 'other'">
            <label for="currentSituationOther" class="form-label">Précisez votre situation</label>
            <input id="currentSituationOther" type="text" class="form-control" formControlName="currentSituationOther">
          </div>

          <div class="form-group">
            <label for="background" class="form-label">Résumé de votre parcours <span class="required">*</span></label>
            <textarea id="background" rows="3" class="form-control" formControlName="background" placeholder="Présentez brièvement vos études ou vos premières expériences..."></textarea>
            <div *ngIf="isInvalid('background')" class="form-error">Veuillez décrire brièvement votre parcours.</div>
          </div>
        </fieldset>

        <!-- Section 3 : Domaines créatifs & Compétences -->
        <fieldset class="form-section card">
          <legend class="section-title">3. Domaines d'intérêt & Motivations</legend>
          <p class="section-desc">Cochez les disciplines qui vous intéressent (au moins une) :</p>

          <div class="interests-grid">
            <label *ngFor="let domain of availableDomains()" class="checkbox-card">
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
          </div>
          <div *ngIf="interestsTouched && selectedInterests.length === 0" class="form-error">
            Veuillez choisir au moins un domaine d'intérêt.
          </div>

          <div class="form-group" style="margin-top: 1.5rem;">
            <label for="skillsAndExperience" class="form-label">Compétences et expériences préalables <span class="required">*</span></label>
            <textarea id="skillsAndExperience" rows="3" class="form-control" formControlName="skillsAndExperience" placeholder="Quelles techniques ou outils connaissez-vous déjà ? Même débutant, décrivez votre curiosité."></textarea>
            <div *ngIf="isInvalid('skillsAndExperience')" class="form-error">Ce champ est obligatoire.</div>
          </div>

          <div class="form-group">
            <label for="motivation" class="form-label">Vos motivations pour rejoindre Mboa Jeunes Créatifs <span class="required">*</span></label>
            <textarea id="motivation" rows="3" class="form-control" formControlName="motivation" placeholder="Pourquoi souhaitez-vous participer à nos sessions ?"></textarea>
            <div *ngIf="isInvalid('motivation')" class="form-error">La motivation est obligatoire.</div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="learningGoals" class="form-label">Objectif d'apprentissage visé</label>
              <input id="learningGoals" type="text" class="form-control" formControlName="learningGoals" placeholder="Ex: Maîtriser le mixage son, apprendre la découpe laser...">
            </div>

            <div class="form-group flex-1">
              <label for="availability" class="form-label">Disponibilité horaire <span class="required">*</span></label>
              <input id="availability" type="text" class="form-control" formControlName="availability" placeholder="Ex: Temps plein, week-ends, soirées...">
              <div *ngIf="isInvalid('availability')" class="form-error">Veuillez indiquer vos disponibilités.</div>
            </div>
          </div>
        </fieldset>

        <!-- Section 4 : Pièce jointe facultative (Simulation sans stockage) -->
        <fieldset class="form-section card">
          <legend class="section-title">4. CV ou Portfolio (Optionnel - Simulation)</legend>
          <div class="form-group">
            <label for="cvFile" class="form-label">Fichier CV ou portfolio (PDF, JPG, PNG)</label>
            <input id="cvFile" type="file" class="form-control" (change)="onFileSimulated($event)">
            <div class="form-hint">
              <strong>Garantie de confidentialité démo :</strong> Le fichier sélectionné ne sera <strong>jamais téléversé</strong>. 
              Seul le nom fictif du fichier sera conservé pour la simulation d'affichage dans la table admin.
            </div>
            <div *ngIf="simulatedFileName()" class="simulated-file-info">
              Fichier détecté pour démo : <code>{{ simulatedFileName() }}</code>
            </div>
          </div>

          <div class="form-group">
            <label for="portfolioUrl" class="form-label">Lien externe facultatif (portfolio en ligne, réseaux, SoundCloud, etc.)</label>
            <input id="portfolioUrl" type="url" class="form-control" formControlName="portfolioUrl" placeholder="https://...">
          </div>
        </fieldset>

        <!-- Section 5 : Consentement éclairé (Loi camerounaise n° 2024/017) -->
        <fieldset class="form-section consent-section card">
          <legend class="section-title">5. Consentement et validation</legend>
          <div class="consent-box">
            <p class="consent-text">
              En cochant cette case, j'accepte que les informations saisies soient traitées par l'Institut français du Cameroun 
              dans le cadre strict du programme Mboa Jeunes Créatifs (orientation vers des ateliers, opportunités de formation). 
              Conformément à la <strong>loi n° 2024/017 du 23 décembre 2024</strong>, je dispose d'un droit d'accès, 
              de rectification et de suppression de mes données.
            </p>
            <p class="consent-disclaimer">
              <em>* Version de la notice d'information : {{ currentNoticeVersion }} (simulation frontend).</em>
            </p>

            <label class="checkbox-label">
              <input type="checkbox" formControlName="consentGranted">
              <span><strong>J'ai lu et j'accepte les conditions de traitement de démonstration <span class="required">*</span></strong></span>
            </label>
            <div *ngIf="isInvalid('consentGranted')" class="form-error">
              Le consentement est obligatoire pour valider la simulation d'inscription.
            </div>
          </div>

          <div class="submit-row">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              [disabled]="talentForm.invalid || selectedInterests.length === 0 || isSubmitting()"
            >
              {{ isSubmitting() ? 'Enregistrement fictif en cours...' : 'Valider mon inscription au Pool de talents' }}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  `,
  styles: [`
    .page-content { padding-block: 2.5rem 1rem; max-width: 52rem; }
    .demo-alert { background: var(--ochre); border-radius: 18px 4px 18px 4px; padding: 1.1rem 1.4rem; margin-bottom: 2.5rem; }
    .demo-alert-badge { display: inline-block; background: var(--ink); color: var(--ochre); font-size: .68rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: .15rem .6rem; border-radius: 999px; margin-bottom: .4rem; }
    .demo-alert p { margin: 0; font-size: .92rem; }
    .talent-form { display: flex; flex-direction: column; gap: 1.75rem; }
    .form-section { border: 1px solid var(--line); background: var(--white); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; padding: 2rem; margin: 0; }
    .section-title { font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; padding: 0 .6rem; background: var(--ink); color: var(--ochre); border-radius: 999px; }
    .section-desc { color: var(--text-muted); font-size: .9rem; margin: .8rem 0 1.25rem; }
    .form-row { display: flex; gap: 1.25rem; flex-wrap: wrap; margin-top: .6rem; }
    .flex-1 { flex: 1; min-width: 240px; }
    .interests-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: .7rem; margin-top: .5rem; }
    .checkbox-card { display: flex; align-items: flex-start; gap: .7rem; background: var(--paper-2); border: 2px solid transparent; padding: .85rem 1rem; border-radius: 14px; cursor: pointer; font-size: .9rem; transition: border-color .15s, background .15s; }
    .checkbox-card:hover { border-color: var(--orange); }
    .checkbox-card:has(input:checked) { background: #fdebd0; border-color: var(--orange); }
    .checkbox-card input { margin-top: .25rem; accent-color: var(--orange-deep); width: 18px; height: 18px; }
    .check-content strong { display: block; }
    .check-content span { display: block; font-size: .78rem; color: var(--text-muted); }
    .simulated-file-info { margin-top: .5rem; font-size: .85rem; background: var(--paper-2); padding: .4rem .8rem; border-radius: 10px; }
    .consent-section { background: var(--paper-2); border-color: var(--ochre); }
    .consent-text { font-size: .92rem; color: var(--text-muted); margin-top: 1rem; }
    .consent-disclaimer { font-size: .8rem; color: var(--color-text-light); margin-bottom: 1rem; }
    .checkbox-label { display: flex; align-items: center; gap: .7rem; cursor: pointer; }
    .checkbox-label input { accent-color: var(--orange-deep); width: 20px; height: 20px; }
    .submit-row { display: flex; justify-content: flex-end; margin-top: 1.5rem; }
    .confirmation-card { padding: 3rem 2rem; text-align: center; border-top: 8px solid var(--green); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; }
    .confirm-badge { display: inline-block; font-size: .72rem; font-weight: 800; letter-spacing: .12em; color: var(--green-deep); background: var(--color-status-selected-bg); padding: .25rem .8rem; border-radius: 999px; margin-bottom: 1rem; }
    .confirm-lead { color: var(--text-muted); font-size: 1.1rem; max-width: 36rem; margin: 0 auto 2rem; }
    .summary-box { background: var(--paper-2); border-radius: 18px; padding: 1.5rem; max-width: 30rem; margin: 0 auto 2rem; text-align: left; }
    .summary-box h3 { font-size: 1.05rem; }
    .summary-box ul { margin: 0; padding-left: 1.2rem; font-size: .9rem; color: var(--text-muted); }
    .summary-box li { margin-bottom: .4rem; }
    .confirm-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
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
      // Stockage uniquement du nom pour la simulation, aucun fichier réel
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
