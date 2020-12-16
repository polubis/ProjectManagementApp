import { RegisterPayload, Self, ForgottenPasswordPayload } from 'shared/models';

import { core } from '..';

const PATH = 'Account';

export const register = (payload: RegisterPayload): Promise<null> =>
  core.post<null>(`${PATH}/Register`, payload);

export const getSelf = (): Promise<Self> => core.get<Self>(`${PATH}/GetCurrentUserData`);

export const forgottenPassword = (payload: ForgottenPasswordPayload): Promise<null> =>
  core.get<null>(`${PATH}/ForgottenPassword`, { params: payload });
