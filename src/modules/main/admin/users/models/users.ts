import { AccountRole } from 'shared/models';

export interface SetUserRolesPayload {
  roles: AccountRole[];
  username: string;
}

export interface GetUsersPayload {
  limit: number;
  page: number;
  role: AccountRole;
  query: string;
}
