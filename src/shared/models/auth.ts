import { User, UserProfile } from '.';

export type SelfUser = User &
  UserProfile & { connectedWithGithub: boolean; emailConfirmed: boolean };

export interface LogInPayload {
  password: string;
  username: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  position?: string;
  seniority?: number;
  company?: string;
  yearsOfExperience?: number;
  technologiesIds?: number[];
}

export interface ForgottenPasswordPayload {
  username: string;
}
