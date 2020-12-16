import { CORE_API_PATH } from 'consts';

import { Credentials, Self, User } from 'shared/models';

import { core } from '..';

const PATH = 'Authorization';

// TODO: TELL BACKEND TO RENAME
export const logIn = (payload: Credentials): Promise<User> =>
  core.post<Self>(`${PATH}/SignIn`, payload);

// TODO: TELL BACKEND TO RENAME
export const logInViaGithub = (): void => {
  window.location.href = `${CORE_API_PATH}GithubAuthorization/SignIn?redirectUrl=${window.location.origin}/app`;
};

// TODO: TELL BACKEND TO RENAME
export const logOut = (): Promise<null> => core.post<null>(`${PATH}/SignOut`);
