export type TalentStatus = 'new' | 'to_review' | 'pending' | 'selected';

export type City = 'Yaounde' | 'Douala' | 'Other';

export type CurrentSituation = 'student' | 'graduate' | 'entrepreneur' | 'other';

export interface ConsentRecord {
  granted: boolean;
  noticeVersion: string;
  acceptedAt: string; // ISO 8601 - simulation en mode mock
}

export interface TalentProfile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  email: string;
  phone: string; // Téléphone ou WhatsApp
  city: City;
  cityOther?: string;
  currentSituation: CurrentSituation;
  currentSituationOther?: string;
  educationLevel: string;
  background: string;
  interests: string[];
  skillsAndExperience: string;
  motivation: string;
  learningGoals?: string;
  availability: string;
  portfolioUrl?: string; // Lien externe éventuel
  cvFileNameSimulated?: string; // Nom de fichier simulé sans stockage de fichier
  status: TalentStatus;
  consent: ConsentRecord;
  createdAt: string;
  updatedAt: string;
}

export type CreateTalentInput = Omit<TalentProfile, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export interface TalentQuery {
  search?: string;
  city?: string;
  domain?: string;
  situation?: string;
  status?: TalentStatus | '';
  minAge?: number;
  maxAge?: number;
}
