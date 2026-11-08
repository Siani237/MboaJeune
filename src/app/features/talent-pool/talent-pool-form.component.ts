import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TalentService } from '../../core/services/talent.service';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo } from '../../domain/models/activity.model';
import { CreateTalentInput, TalentProfile } from '../../domain/models/talent.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-talent-pool-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Rejoindre la communauté</span>
        <h1>Formulaire du Pool de talents</h1>
        <p class="lead">
          Intégrez le vivier de jeunes créateurs de Mboa Jeunes Créatifs à Yaoundé, Douala et au Cameroun.
          Faites-vous identifier pour nos prochains ateliers, résidences artistiques et opportunités de formation.
        </p>

        <!-- Avertissement démonstration obligatoire -->
        <div class="demo-alert" role="alert">
          <div class="demo-alert-badge">MAQUETTE DE DÉMONSTRATION</div>
          <p>
            <strong>Attention :</strong> Ce formulaire fonctionne avec un <strong>Mock Backend</strong> local dans votre navigateur.
            <strong>Ne saisissez aucune donnée personnelle confidentielle réelle.</strong> 
            Aucun fichier de CV n'est envoyé sur un serveur.
          </p>
        </div>
      </header>

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
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 860px;
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
    .demo-alert {
      background-color: var(--color-demo-banner-bg);
      border: 1px solid #fde68a;
      border-left: 5px solid var(--color-demo-banner);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: var(--color-demo-banner);
    }
    .demo-alert-badge {
      font-weight: 800;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
    }
    .demo-alert p {
      margin: 0;
    }
    .talent-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .form-section {
      border: 1px solid var(--color-border);
      padding: 2rem;
    }
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-main);
      padding: 0 0.5rem;
    }
    .section-desc {
      color: var(--color-text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
    }
    .form-row {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .flex-1 {
      flex: 1;
      min-width: 250px;
    }
    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .checkbox-card {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      padding: 0.85rem;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 0.9rem;
    }
    .checkbox-card input[type="checkbox"] {
      margin-top: 0.2rem;
      cursor: pointer;
    }
    .check-content strong {
      display: block;
      color: var(--color-text-main);
    }
    .check-content span {
      display: block;
      font-size: 0.775rem;
      color: var(--color-text-muted);
    }
    .simulated-file-info {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: var(--color-primary-dark);
      background-color: var(--color-primary-light);
      padding: 0.4rem 0.75rem;
      border-radius: var(--radius-sm);
    }
    .consent-section {
      background-color: #fffbeb;
      border-color: #fde68a;
    }
    .consent-box {
      margin-bottom: 1.5rem;
    }
    .consent-text {
      font-size: 0.9rem;
      color: #92400e;
      line-height: 1.5;
    }
    .consent-disclaimer {
      font-size: 0.8rem;
      color: #b45309;
      margin-bottom: 1rem;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      cursor: pointer;
      font-size: 0.95rem;
    }
    .submit-row {
      display: flex;
      justify-content: flex-end;
    }
    .confirmation-card {
      padding: 3rem 2rem;
      text-align: center;
      background-color: var(--color-surface);
      border-top: 4px solid var(--color-status-selected);
    }
    .confirm-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-status-selected);
      background-color: var(--color-status-selected-bg);
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1rem;
    }
    .confirmation-card h2 {
      font-size: 1.85rem;
      margin-bottom: 0.75rem;
    }
    .confirm-lead {
      color: var(--color-text-muted);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .summary-box {
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      max-width: 500px;
      margin: 0 auto 2rem;
      text-align: left;
    }
    .summary-box h3 {
      font-size: 1rem;
      margin-bottom: 0.75rem;
    }
    .summary-box ul {
      margin: 0;
      padding-left: 1.25rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }
    .summary-box li {
      margin-bottom: 0.4rem;
    }
    .confirm-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
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
