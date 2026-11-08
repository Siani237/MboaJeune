export type DomainKey =
  | 'mode'
  | 'musique'
  | 'radio'
  | 'numerique'
  | 'arts_visuels'
  | 'sport'
  | 'evenementiel';

export interface DomainInfo {
  key: DomainKey;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
}

export type OpportunityStatus = 'draft' | 'open' | 'upcoming' | 'closed';

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  domain: DomainKey;
  domainLabel: string;
  summary: string;
  description: string;
  city: 'Yaounde' | 'Douala' | 'Yaounde et Douala';
  venue?: string;
  startDate?: string;
  endDate?: string;
  registrationStatus: 'open' | 'closed' | 'soon';
  registrationUrl?: string;
  capacity?: number;
  eligibilityNotes?: string;
  isMockData: boolean;
  status: OpportunityStatus;
  updatedAt: string;
}
