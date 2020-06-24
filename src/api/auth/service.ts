import { CORE_API_PATH } from 'consts';

import { core } from 'core/api';

import { LogInPayload, User } from '..';

export const logIn = (credentials: LogInPayload) =>
  core.post<User>('Authorization/SignIn', credentials);

export const logOut = () => core.post<null>('Authorization/SignOut');

export const getAuthorizedUser = () => core.get('Account/GetCurrentUserData');

export const signInViaGithub = () => {
  window.location.href = `${CORE_API_PATH}GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};
