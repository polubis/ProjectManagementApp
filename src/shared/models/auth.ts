import { User } from '.';

export type Self = User;

export interface Credentials {
  password: string;
  username: string;
}

export type RegisterPayload = Credentials & {
  email: string;
  confirmPassword: string;
  position?: string;
  seniority?: number;
  company?: string;
  yearsOfExperience?: number;
  technologiesIds?: number[];
};

export interface ForgottenPasswordPayload {
  username: string;
}
