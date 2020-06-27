import isGithubUrl from 'is-github-url';

const PATTERNS = {
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
};

namespace V {
  export interface Result {
    invalid: boolean;
    text: string;
  }

  export type Fn = (value: any, label: string) => Result;
}

const makeResult = (invalid: boolean, text: string): V.Result => ({
  invalid,
  text
});

const V = {
  makeResult,

  req: (value: string | any[], label: string) =>
    makeResult(
      Array.isArray(value) ? value.length === 0 : value.trim() === '',
      `Please enter your ${label}`
    ),

  min: (ln: number) => (value: string, label: string) =>
    makeResult(value.trim().length < ln, `${label} must have ${ln} or more characters`),

  max: (ln: number) => (value: string, label: string) =>
    makeResult(value.trim().length > ln, `${label} must have ${ln} or less characters`),

  url: (value: string, label: string) =>
    makeResult(!PATTERNS.URL.test(value), `${label} must have valid url format`),

  githubUrl: (value: string, label: string) => 
      makeResult(!isGithubUrl(value), `${label} must be valid Github url`),

  date: (value: string, label: string) =>
    makeResult(!PATTERNS.DATE.test(value), `${label} must have valid date format`),

  oneTruthy: (key: string, label: string) => (items: any[]) =>
    makeResult(!items.some((item) => !!item[key]), `Atleast one ${label} must be checked`),

  run: (value: any, label: string) => (...fns: V.Fn[]) => fns.map((fn) => fn(value, label))
};

export default V;
