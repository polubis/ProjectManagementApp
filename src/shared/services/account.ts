import {
  RegisterPayload,
  Self,
  ForgottenPasswordPayload,
  ChangePasswordPayload,
} from 'shared/models';

import { core } from 'shared/instances';

const PATH = 'Account';

export const register = (payload: RegisterPayload): Promise<null> =>
  core.post<RegisterPayload, null>(`${PATH}/Register`, payload);

export const getSelf = (): Promise<Self> => core.get<Self>(`${PATH}/GetCurrentUserData`);

export const forgottenPassword = (payload: ForgottenPasswordPayload): Promise<null> =>
  core.get<null>(`${PATH}/ForgottenPassword`, { params: payload });

export const changePassword = (payload: ChangePasswordPayload): Promise<null> =>
  core.post<ChangePasswordPayload, null>(`${PATH}/ChangePassword`, payload);
