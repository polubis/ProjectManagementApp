import { User } from 'shared/models';

import { core } from 'api';

import { SetUserRolesPayload } from '../models/users';

const PATH = 'UserPermissions';

export const getUsers = (query: string): Promise<User[]> =>
  core.get<User[]>(`${PATH}/SearchUsers${query}`);

export const setUserRoles = (payload: SetUserRolesPayload): Promise<null> =>
  core.post<null>(`${PATH}/SetUserRoles`, payload);
