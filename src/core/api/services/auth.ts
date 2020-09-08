import { CORE_API_PATH } from 'consts';

import {
  core,
  ForgotPasswordPayload,
  LogInPayload,
  RegisterPayload,
  SelfUser,
  LOG_IN,
  LOG_OUT,
  LOG_IN_VIA_GITHUB,
  FORGOT_PASSWORD,
  REGISTER,
  GET_SELF
} from '..';

export const forgotPassword = (payload: ForgotPasswordPayload) => core.get(FORGOT_PASSWORD, { params: payload });

export const logIn = (payload: LogInPayload) => core.post<SelfUser>(LOG_IN, payload);

export const logInViaGithub = () => {
  window.location.href = `${CORE_API_PATH}${LOG_IN_VIA_GITHUB}?redirectUrl=${window.location.origin}/app`;
};

export const logOut = () => core.post<null>(LOG_OUT);

export const register = (payload: RegisterPayload) => core.post<null>(REGISTER, payload);

export const getSelf = () => core.get(GET_SELF);
