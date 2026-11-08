import { TestBed } from '@angular/core/testing';
import { TalentService } from './talent.service';
import { TALENT_REPOSITORY } from '../../domain/repositories/talent.repository';
import { MockTalentRepository } from '../../data-access/mock/repositories/mock-talent.repository';

describe('TalentService (Business Rules & Age Calculation)', () => {
  let service: TalentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TalentService,
        { provide: TALENT_REPOSITORY, useClass: MockTalentRepository }
      ]
    });
    service = TestBed.inject(TalentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateAge', () => {
    it('should accurately calculate age based on an explicit reference date', () => {
      const refDate = new Date('2026-11-08');
      
      // Personne née le 8 novembre 2000 -> 26 ans révolus
      expect(service.calculateAge('2000-11-08', refDate)).toBe(26);

      // Personne née le 9 novembre 2000 -> 25 ans (anniversaire demain)
      expect(service.calculateAge('2000-11-09', refDate)).toBe(25);

      // Personne née le 7 novembre 2000 -> 26 ans (anniversaire hier)
      expect(service.calculateAge('2000-11-07', refDate)).toBe(26);
    });

    it('should return 0 for invalid or empty dates', () => {
      expect(service.calculateAge('')).toBe(0);
      expect(service.calculateAge('invalid-date')).toBe(0);
    });
  });

  describe('isEligibleAge', () => {
    const refDate = new Date('2026-11-08');

    it('should approve age less than or equal to maxAge', () => {
      // 25 ans avec maxAge 35
      expect(service.isEligibleAge('2001-01-01', 35, refDate)).toBeTrue();
      // 35 ans tout juste
      expect(service.isEligibleAge('1991-11-08', 35, refDate)).toBeTrue();
    });

    it('should reject candidates strictly older than maxAge', () => {
      // 36 ans
      expect(service.isEligibleAge('1990-11-07', 35, refDate)).toBeFalse();
    });
  });

  describe('generateTalentsCsv', () => {
    it('should generate properly formatted CSV data with headers', async () => {
      const csv = await service.generateTalentsCsv();
      expect(csv).toContain('ID;Nom;Prénom;Âge');
      expect(csv).toContain('Amina');
      expect(csv).toContain('Douala');
    });
  });
});
