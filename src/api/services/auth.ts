import { CORE_API_PATH } from 'consts';

import { ForgottenPasswordPayload, LogInPayload, RegisterPayload, SelfUser } from 'shared/models';

import {
  core,
  LOG_IN,
  LOG_OUT,
  LOG_IN_VIA_GITHUB,
  FORGOTTEN_PASSWORD,
  REGISTER,
  GET_SELF,
} from '..';

export const forgottenPassword = (payload: ForgottenPasswordPayload) =>
  core.get(FORGOTTEN_PASSWORD, { params: payload });

export const logIn = (payload: LogInPayload) => core.post<SelfUser>(LOG_IN, payload);

export const logInViaGithub = () => {
  window.location.href = `${CORE_API_PATH}${LOG_IN_VIA_GITHUB}?redirectUrl=${window.location.origin}/app`;
};

export const logOut = () => core.post<null>(LOG_OUT);

export const register = (payload: RegisterPayload) => core.post<null>(REGISTER, payload);

export const getSelf = () => core.get(GET_SELF);
