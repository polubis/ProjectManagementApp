import { CORE_API_PATH } from 'consts';

import { core } from 'core/api';

import { Auth } from '.';

export const logIn = (payload: Auth.Credentials) =>
  core.post<Auth.User>('Authorization/SignIn', payload);

export const logInViaGithub = () => {
  window.location.href = `${CORE_API_PATH}GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};

export const logOut = () => core.post<null>('Authorization/SignOut');

export const getSelf = () => core.get('Account/GetCurrentUserData');
