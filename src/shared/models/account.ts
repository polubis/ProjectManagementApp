export enum AccountRole {
  Admin = 'Administrator',
  User = 'User',
}

export interface Account {
  email: string;
  id: string;
  roles: AccountRole[];
  username: string;
  connectedWithGithub?: boolean;
  emailConfirmed?: boolean;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
