import { InjectionToken } from '@angular/core';
import { TalentProfile, CreateTalentInput, TalentQuery, TalentStatus } from '../models/talent.model';

export interface TalentRepository {
  list(query?: TalentQuery): Promise<TalentProfile[]>;
  getById(id: string): Promise<TalentProfile | null>;
  create(input: CreateTalentInput): Promise<TalentProfile>;
  updateStatus(id: string, status: TalentStatus): Promise<TalentProfile>;
  resetMockData(): Promise<void>;
  exportData(query?: TalentQuery): Promise<TalentProfile[]>;
}

export const TALENT_REPOSITORY = new InjectionToken<TalentRepository>('TALENT_REPOSITORY');
