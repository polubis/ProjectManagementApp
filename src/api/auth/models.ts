export interface LogInPayload {
  login: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}
