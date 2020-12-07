import { Technology } from '.';

export enum UserRole {
  Admin = 'Administrator',
  User = 'User',
}

export interface User {
  email: string;
  firstName: string | null;
  lastName: string | null;
  id: string;
  roles: UserRole[];
  username: string;
}

export interface UserProfile {
  company: string | null;
  position: string | null;
  seniority: number | null;
  yearsOfExperience: number | null;
  technologies: Technology[];
}
