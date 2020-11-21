import { CORE_API_PATH } from 'consts';

import { makeInstance, makePaths, Api, CoreResponse } from '.';

export const LOG_IN_VIA_GITHUB = 'GithubAuthorization/SignIn';

export const [LOG_IN, LOG_OUT] = makePaths('Authorization')('SignIn', 'SignOut');

export const [FORGOTTEN_PASSWORD, REGISTER, GET_SELF] = makePaths('Account')(
  'ForgottenPassword',
  'Register',
  'GetCurrentUserData'
);

export const [GET_PATTERNS, EDIT_PATTERN, ADD_PATTERN, GET_PATTERN, DELETE_PATTERN] = makePaths(
  'TemplatePatterns'
)('Search', 'Update', 'Add', 'Get', 'Delete');

export const [
  ADD_TECHNOLOGY,
  EDIT_TECHNOLOGY,
  GET_TECHNOLOGIES,
  DELETE_TECHNOLOGY,
  GET_TECHNOLOGY,
] = makePaths('TemplateTechnologies')('Add', 'Update', 'Search', 'Delete', 'Get');

export const [
  GET_TEMPLATES,
  FORK_TEMPLATE,
  GET_TEMPLATE_DETAILS,
  EDIT_TEMPLATE,
  DELETE_TEMPLATE,
] = makePaths('Templates')('Search', 'Fork', '', '', '');

export const [ADD_TEMPLATE] = makePaths('Templates')('');

const makeCoreInstance = () => {
  const parseSuccess: Api.Parser.Success<CoreResponse> = ({ data: { data } }) => data;

  const parseError: Api.Parser.Error<CoreResponse> = ({ response: { data, statusText } }) => {
    if (data && data.hasErrors) {
      return data.errors[0];
    }

    return statusText;
  };

  const ERRORS_BLACK_LIST = [GET_SELF, FORK_TEMPLATE];

  return makeInstance({
    baseURL: CORE_API_PATH,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })(
    parseSuccess,
    parseError
  )(ERRORS_BLACK_LIST);
};

export const core = makeCoreInstance();
