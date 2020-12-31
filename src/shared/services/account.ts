import {
  RegisterPayload,
  Self,
  ForgottenPasswordPayload,
  ChangePasswordPayload,
  UpdateUserDataPayload,
} from 'shared/models';

import { core } from 'shared/instances';

// TODO: Refactor naming conventions talk with backend developers
const PATH = 'Account';

export const register = (payload: RegisterPayload): Promise<null> =>
  core.post<RegisterPayload, null>(`${PATH}/Register`, payload);

export const getSelf = (): Promise<Self> => core.get<Self>(`${PATH}/GetCurrentUserData`);

export const forgottenPassword = (payload: ForgottenPasswordPayload): Promise<null> =>
  core.get<null>(`${PATH}/ForgottenPassword`, { params: payload });

export const changePassword = (payload: ChangePasswordPayload): Promise<null> =>
  core.post<ChangePasswordPayload, null>(`${PATH}/ChangePassword`, payload);

export const updateUserData = (payload: UpdateUserDataPayload): Promise<null> =>
  core.put<UpdateUserDataPayload, null>(`${PATH}/UpdateUserData`, payload);
