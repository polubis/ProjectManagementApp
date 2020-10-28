import Cookies, { CookieAttributes } from 'js-cookie'

export const getCookies = () => Cookies.get();

export const setCookie = (name: string, value: string, options: CookieAttributes = {}) =>
  Cookies.set(name, value, options);

