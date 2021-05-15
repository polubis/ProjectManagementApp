import { Account, Technology } from '.';

export interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  position: string | null;
  seniority: number | null;
  githubAvatarUrl: string;
  yearsOfExperience: number | null;
  technologies: Technology[];
  lastAddedTemplatesReadDateUtc: string | null;
}

export interface UpdateUserDataPayload {
  position: string;
  seniority: number;
  company: string;
  yearsOfExperience: number;
  technologiesIds: number[];
}

export type User = Account & UserProfile;
