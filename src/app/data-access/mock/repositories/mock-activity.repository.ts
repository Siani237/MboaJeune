import { Injectable } from '@angular/core';
import { ActivityRepository } from '../../../domain/repositories/activity.repository';
import { DomainInfo, DomainKey, Opportunity } from '../../../domain/models/activity.model';
import { INITIAL_DOMAINS, INITIAL_OPPORTUNITIES } from '../seed/mock-data.seed';

@Injectable({
  providedIn: 'root'
})
export class MockActivityRepository implements ActivityRepository {
  private readonly delayMs = 80;

  private simulate<T>(val: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(val), this.delayMs));
  }

  getDomains(): Promise<DomainInfo[]> {
    return this.simulate([...INITIAL_DOMAINS]);
  }

  getDomainByKey(key: DomainKey): Promise<DomainInfo | null> {
    const found = INITIAL_DOMAINS.find((d) => d.key === key) || null;
    return this.simulate(found);
  }

  getOpportunities(domain?: DomainKey): Promise<Opportunity[]> {
    let list = [...INITIAL_OPPORTUNITIES];
    if (domain) {
      list = list.filter((o) => o.domain === domain);
    }
    return this.simulate(list);
  }

  getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
    const found = INITIAL_OPPORTUNITIES.find((o) => o.slug === slug) || null;
    return this.simulate(found);
  }
}
