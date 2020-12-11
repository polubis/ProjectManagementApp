import { Account, Technology } from '.';

export type User = Account & UserProfile;

export interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  position: string | null;
  seniority: number | null;
  githubAvatarUrl: string;
  yearsOfExperience: number | null;
  technologies: Technology[];
}
