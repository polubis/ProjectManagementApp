import { core, API } from '..';

import { SignInViaCredentialsPayload } from '.';

export const signInViaCredentials = (payload: SignInViaCredentialsPayload) => {
  return core.post('Authorization/SignIn', payload);
};

export const signOut = () => {
  return core.post('Authorization/SignOut');
};

export const signInViaGithub = () => {
  window.location.href = `${API.CORE}/GithubAuthorization/SignIn?redirectUrl=${window.location.href}`;
};