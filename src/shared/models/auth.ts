import { Technology } from '.';

export enum UserRole {
  Admin = 'Administrator',
  User = 'User',
}

export interface SelfUser {
  company: string | null;
  connectedWithGithub: boolean;
  email: string;
  emailConfirmed: boolean;
  firstName: string | null;
  lastName: string | null;
  id: string;
  position: string | null;
  seniority: number | null;
  roles: UserRole[];
  username: string;
  yearsOfExperience: number | null;
  technologies: Technology[];
}

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
