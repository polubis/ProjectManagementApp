import { coreInstance, call, LogInPayload, User } from '..';

import { API } from 'consts';

export const logIn = (credentials: LogInPayload) => {
  return call<User>(coreInstance.post('Authorization/SignIn', credentials));
};

export const logOut = () => {
  return call<null>(coreInstance.post('Authorization/SignOut'));
};

export const signInViaGithub = () => {
  window.location.href = `${API}GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};

export const getAuthorizedUser = () => {
  return call<User>(coreInstance.get('Account/GetCurrentUserData'));
};
