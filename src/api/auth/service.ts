import { core, API } from '..';

import { LogInViaCredentials } from '.';

export const logInViaCredentials = (payload: LogInViaCredentials) => {
  return core.post('Authorization/SignIn', payload);
};

export const signOut = () => {
  return core.post('Authorization/SignOut');
};

export const signInViaGithub = () => {
  window.location.href = `${API.CORE}/GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};
