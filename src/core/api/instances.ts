import { CORE_API_PATH } from 'consts';

import { makeInstance, makePaths, Api, CoreResponse } from '.';

export const LOG_IN_VIA_GITHUB = 'GithubAuthorization/SignIn';

export const [LOG_IN, LOG_OUT] = makePaths('Authorization')('SignIn', 'SignOut');

export const [REGISTER, GET_SELF] = makePaths('Account')('Register', 'GetCurrentUserData');

export const [GET_PATTERNS] = makePaths('TemplatePatterns')('Search');

export const [GET_TECHNOLOGIES] = makePaths('TemplateTechnologies')('Search');

export const [GET_TEMPLATES, GET_TEMPLATE_DETAILS, EDIT_TEMPLATE, DELETE_TEMPLATE] = makePaths(
  'Templates'
)('Search', '', '', '');

export const [ADD_TEMPLATE] = makePaths('Templates')('');

const makeCoreInstance = () => {
  const parseSuccess: Api.Parser.Success<CoreResponse> = ({ data: { data } }) => data;

  const parseError: Api.Parser.Error<CoreResponse> = ({ response: { data, statusText } }) => {
    if (data && data.hasErrors) {
      return data.errors[0];
    }

    return statusText;
  };

  const ERRORS_BLACK_LIST = [GET_SELF];

  return makeInstance({
    baseURL: CORE_API_PATH,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })(
    parseSuccess,
    parseError
  )(ERRORS_BLACK_LIST);
};

export const core = makeCoreInstance();
