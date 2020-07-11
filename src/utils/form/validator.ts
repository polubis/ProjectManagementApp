import isGithubUrl from 'is-github-url';

import { Form } from '.';

const PATTERNS = {
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  EMAIL: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
};

namespace V {
  export interface Result {
    invalid: boolean;
    text: string;
  }

  export type Fn = (value: any, state: Form.State) => Result;
}

const makeResult = (invalid: boolean, text: string): V.Result => ({
  invalid,
  text
});

const V = {
  makeResult,

  req: (value: string | any[]) =>
    makeResult(
      Array.isArray(value) ? value.length === 0 : value.trim() === '',
      `This field is required`
    ),

  min: (ln: number, checksOnlyTruthy = true) => (value: string) =>
    makeResult(
      checksOnlyTruthy
        ? value.trim().length > 0 && value.trim().length < ln
        : value.trim().length < ln,
      `Field must have ${ln} or more characters`
    ),

  max: (ln: number) => (value: string) =>
    makeResult(value.trim().length > ln, `Field must have ${ln} or less characters`),

  url: (value: string) => makeResult(!PATTERNS.URL.test(value), `Invalid url format`),

  email: (value: string) => makeResult(!PATTERNS.EMAIL.test(value), `Invalid email format`),

  githubUrl: (value: string) => makeResult(!isGithubUrl(value), `Invalid Github url`),

  date: (checksOnlyTruthy = true) => (value: string) =>
    makeResult(
      checksOnlyTruthy
        ? value.trim().length > 0 && !PATTERNS.DATE.test(value)
        : !PATTERNS.DATE.test(value),
      `Invalid date format`
    ),

  oneTruthy: (value: { [key: string]: boolean }) =>
    makeResult(!Object.values(value).some((item) => !!item), `Atleast one field must be checked`),

  sameAs: (idx: number, label: string) => (value: any, state: Form.State) =>
    makeResult(value !== state.fields[idx].value, `Field must be same as ${label}`),

  run: (value: any, state: Form.State) => (...fns: V.Fn[]) => fns.map((fn) => fn(value, state))
};

export default V;
