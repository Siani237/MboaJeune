import { Injectable } from '@angular/core';
import { TalentProfile, CreateTalentInput, TalentQuery, TalentStatus } from '../../../domain/models/talent.model';
import { INITIAL_TALENTS } from '../seed/mock-data.seed';
import { environment } from '../../../../environments/environment';

const STORAGE_KEY_TALENTS = `${environment.storagePrefix}talents_v1`;

@Injectable({
  providedIn: 'root'
})
export class MockStoreService {
  private readonly delayMs = 120; // Simulation d'une latence réseau réaliste

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const existing = window.localStorage.getItem(STORAGE_KEY_TALENTS);
    if (!existing) {
      this.persistTalents(INITIAL_TALENTS);
    }
  }

  private loadTalents(): TalentProfile[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [...INITIAL_TALENTS];
    }
    try {
      const data = window.localStorage.getItem(STORAGE_KEY_TALENTS);
      return data ? (JSON.parse(data) as TalentProfile[]) : [...INITIAL_TALENTS];
    } catch {
      return [...INITIAL_TALENTS];
    }
  }

  private persistTalents(talents: TalentProfile[]): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY_TALENTS, JSON.stringify(talents));
    } catch (e) {
      console.warn('Impossible de persister dans localStorage:', e);
    }
  }

  private simulateDelay<T>(value: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), this.delayMs));
  }

  async getTalents(query?: TalentQuery): Promise<TalentProfile[]> {
    let list = this.loadTalents();

    if (query) {
      if (query.search && query.search.trim()) {
        const term = query.search.trim().toLowerCase();
        list = list.filter((t) =>
          `${t.firstName} ${t.lastName} ${t.email} ${t.skillsAndExperience} ${t.motivation}`
            .toLowerCase()
            .includes(term)
        );
      }
      if (query.city) {
        list = list.filter((t) => t.city === query.city);
      }
      if (query.domain) {
        list = list.filter((t) => t.interests.includes(query.domain as string));
      }
      if (query.situation) {
        list = list.filter((t) => t.currentSituation === query.situation);
      }
      if (query.status) {
        list = list.filter((t) => t.status === query.status);
      }
    }

    return this.simulateDelay(list);
  }

  async getTalentById(id: string): Promise<TalentProfile | null> {
    const list = this.loadTalents();
    const found = list.find((t) => t.id === id) || null;
    return this.simulateDelay(found);
  }

  async createTalent(input: CreateTalentInput): Promise<TalentProfile> {
    const list = this.loadTalents();
    const now = new Date().toISOString();
    const newProfile: TalentProfile = {
      ...input,
      id: `tal-demo-${Date.now()}`,
      status: 'new',
      createdAt: now,
      updatedAt: now
    };

    list.unshift(newProfile);
    this.persistTalents(list);
    return this.simulateDelay(newProfile);
  }

  async updateTalentStatus(id: string, status: TalentStatus): Promise<TalentProfile> {
    const list = this.loadTalents();
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Profil avec l'ID ${id} non trouvé.`);
    }

    const updated: TalentProfile = {
      ...list[index],
      status,
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    this.persistTalents(list);
    return this.simulateDelay(updated);
  }

  async resetTalents(): Promise<void> {
    this.persistTalents(INITIAL_TALENTS);
    return this.simulateDelay(undefined);
  }
}
