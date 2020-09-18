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

export enum Gender {
  MALE = 0,
  FEMALE = 1
}

export enum Seniority {
  Junior = 0,
  Mid = 1,
  Regular = 2,
  Pro = 3,
  Senior = 4
}

export interface RegisterPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  sex: Gender;
  position: string;
  seniority: Seniority;
  company: string;
  yearsOfExperience: number;
  technologiesIds: number[];
  companyRegulations: boolean;
  commercialInfo: boolean;
}

export interface ForgottenPasswordPayload {
  username: string;
}
