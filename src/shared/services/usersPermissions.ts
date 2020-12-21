import { User } from 'shared/models';
import { core } from 'shared/instances';

import { SetUserRolesPayload } from 'shared/models';

// TODO TELL BE TO RENAME
const PATH = 'UserPermissions';

export const getUsers = (query: string): Promise<User[]> =>
  core.get<User[]>(`${PATH}/SearchUsers${query}`);

export const setUserRoles = (payload: SetUserRolesPayload): Promise<null> =>
  core.post<SetUserRolesPayload, null>(`${PATH}/SetUserRoles`, payload);
