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
