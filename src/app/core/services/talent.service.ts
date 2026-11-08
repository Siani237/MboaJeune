import { Injectable, inject } from '@angular/core';
import { TALENT_REPOSITORY } from '../../domain/repositories/talent.repository';
import { TalentProfile, CreateTalentInput, TalentQuery, TalentStatus } from '../../domain/models/talent.model';

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  private readonly talentRepo = inject(TALENT_REPOSITORY);

  /**
   * Calcule l'âge d'un candidat à partir de sa date de naissance et d'une date de référence donnée.
   */
  calculateAge(birthDateStr: string, referenceDate: Date = new Date()): number {
    if (!birthDateStr) return 0;
    const birth = new Date(birthDateStr);
    if (isNaN(birth.getTime())) return 0;

    let age = referenceDate.getFullYear() - birth.getFullYear();
    const m = referenceDate.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && referenceDate.getDate() < birth.getDate())) {
      age--;
    }
    return Math.max(0, age);
  }

  /**
   * Vérifie si le candidat respecte la règle d'âge pour une limite donnée (par défaut 35 ans).
   */
  isEligibleAge(birthDateStr: string, maxAge: number = 35, referenceDate: Date = new Date()): boolean {
    const age = this.calculateAge(birthDateStr, referenceDate);
    return age > 0 && age <= maxAge;
  }

  getTalents(query?: TalentQuery): Promise<TalentProfile[]> {
    return this.talentRepo.list(query);
  }

  getTalentById(id: string): Promise<TalentProfile | null> {
    return this.talentRepo.getById(id);
  }

  registerTalent(input: CreateTalentInput): Promise<TalentProfile> {
    return this.talentRepo.create(input);
  }

  updateStatus(id: string, status: TalentStatus): Promise<TalentProfile> {
    return this.talentRepo.updateStatus(id, status);
  }

  resetDemoData(): Promise<void> {
    return this.talentRepo.resetMockData();
  }

  /**
   * Génère une chaîne CSV pour l'export de profils fictifs.
   */
  async generateTalentsCsv(query?: TalentQuery): Promise<string> {
    const talents = await this.talentRepo.exportData(query);
    const headers = [
      'ID',
      'Nom',
      'Prénom',
      'Âge',
      'Date de Naissance',
      'Email',
      'Téléphone',
      'Ville',
      'Situation',
      'Niveau d’études',
      'Domaines d’intérêt',
      'Statut',
      'Date inscription'
    ];

    const escapeCsv = (val: string | number | undefined) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = talents.map((t) => [
      escapeCsv(t.id),
      escapeCsv(t.lastName),
      escapeCsv(t.firstName),
      escapeCsv(this.calculateAge(t.birthDate)),
      escapeCsv(t.birthDate),
      escapeCsv(t.email),
      escapeCsv(t.phone),
      escapeCsv(t.city === 'Other' ? t.cityOther || 'Autre' : t.city),
      escapeCsv(t.currentSituation === 'other' ? t.currentSituationOther || 'Autre' : t.currentSituation),
      escapeCsv(t.educationLevel),
      escapeCsv(t.interests.join(', ')),
      escapeCsv(t.status),
      escapeCsv(t.createdAt)
    ]);

    const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    return csvContent;
  }
}
