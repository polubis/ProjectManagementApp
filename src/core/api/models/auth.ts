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
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface ForgottenPasswordPayload {
  username: string;
}
