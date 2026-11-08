import { Injectable, inject } from '@angular/core';
import { TalentRepository } from '../../../domain/repositories/talent.repository';
import { TalentProfile, CreateTalentInput, TalentQuery, TalentStatus } from '../../../domain/models/talent.model';
import { MockStoreService } from '../mock-store/mock-store.service';

@Injectable({
  providedIn: 'root'
})
export class MockTalentRepository implements TalentRepository {
  private readonly store = inject(MockStoreService);

  list(query?: TalentQuery): Promise<TalentProfile[]> {
    return this.store.getTalents(query);
  }

  getById(id: string): Promise<TalentProfile | null> {
    return this.store.getTalentById(id);
  }

  create(input: CreateTalentInput): Promise<TalentProfile> {
    return this.store.createTalent(input);
  }

  updateStatus(id: string, status: TalentStatus): Promise<TalentProfile> {
    return this.store.updateTalentStatus(id, status);
  }

  resetMockData(): Promise<void> {
    return this.store.resetTalents();
  }

  exportData(query?: TalentQuery): Promise<TalentProfile[]> {
    return this.store.getTalents(query);
  }
}
