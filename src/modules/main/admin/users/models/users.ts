import { AccountRole } from 'shared/models';

export interface SetUserRolesPayload {
  roles: AccountRole[];
  username: string;
}
