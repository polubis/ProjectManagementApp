import { coreInstance } from '..';

import { LogInViaCredentialsPayload } from '.';

import { API } from 'consts';

export const logInViaCredentials = (payload: LogInViaCredentialsPayload) => {
  return coreInstance.post('Authorization/SignIn', payload);
};

export const signOut = () => {
  return coreInstance.post('Authorization/SignOut');
};

export const signInViaGithub = () => {
  window.location.href = `${API}/GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};
