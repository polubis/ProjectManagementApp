import { AccountRole } from 'shared/models';

export const isValidRole = (role: AccountRole): boolean =>
  Object.values(AccountRole).includes(role);
