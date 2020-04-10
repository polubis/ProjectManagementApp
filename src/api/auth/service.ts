import { coreInstance, API } from '..';

import { LogInViaCredentialsPayload } from '.';

export const logInViaCredentials = (payload: LogInViaCredentialsPayload) => {
  return coreInstance.post('Authorization/SignIn', payload);
};

export const signOut = () => {
  return coreInstance.post('Authorization/SignOut');
};

export const signInViaGithub = () => {
  window.location.href = `${API.CORE}/GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};
