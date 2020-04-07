import { core, API } from '..';

import { LogInViaCredentialsPayload } from '.';

export const logInViaCredentials = (payload: LogInViaCredentialsPayload) => {
  return core.post('Authorization/SignIn', payload);
};

export const signOut = () => {
  return core.post('Authorization/SignOut');
};

export const signInViaGithub = () => {
  window.location.href = `${API.CORE}/GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};
