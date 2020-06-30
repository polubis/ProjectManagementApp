import { CORE_API_PATH } from 'consts';

import { core, LogInPayload, SelfUser } from '..';

export const logIn = (payload: LogInPayload) =>
  core.post<SelfUser>('Authorization/SignIn', payload);

export const logInViaGithub = () => {
  window.location.href = `${CORE_API_PATH}GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};

export const logOut = () => core.post<null>('Authorization/SignOut');

export const getSelf = () => core.get('Account/GetCurrentUserData');
