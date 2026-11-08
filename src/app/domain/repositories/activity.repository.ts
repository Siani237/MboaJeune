import { InjectionToken } from '@angular/core';
import { Opportunity, DomainInfo, DomainKey } from '../models/activity.model';

export interface ActivityRepository {
  getDomains(): Promise<DomainInfo[]>;
  getDomainByKey(key: DomainKey): Promise<DomainInfo | null>;
  getOpportunities(domain?: DomainKey): Promise<Opportunity[]>;
  getOpportunityBySlug(slug: string): Promise<Opportunity | null>;
}

export const ACTIVITY_REPOSITORY = new InjectionToken<ActivityRepository>('ACTIVITY_REPOSITORY');
