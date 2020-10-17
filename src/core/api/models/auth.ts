export interface SelfUser {
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface LogInPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  position?: string;
  seniority?: number;
  company?: string;
  yearsOfExperience?: number
  technologiesIds?: number[];
}

export interface ForgottenPasswordPayload {
  username: string;
}
