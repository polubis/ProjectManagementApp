import React, { createContext, ReactNode, useContext } from 'react';

import { getCookies, setCookie } from './cookies';

import { CookieConsent } from "../../ui/cookies-consent";

namespace CookiesProvider {
  export interface State {
    cookies: {[key: string]: string};
    setCookie?: (key: string, value: string) => void
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: CookiesProvider.State = {
  cookies: getCookies()
};

const Context = createContext(STATE);

class Provider extends React.Component<CookiesProvider.Props, typeof STATE> {
  private _getCookies = () => {
      const cookies = getCookies();
      this.setState({ ...STATE, cookies });
  };

  setCookie = (key: string, value: string) => {
    setCookie(key, value);
    this._getCookies();
  };

  readonly state: typeof STATE = {
    ...STATE,
    setCookie: this.setCookie
  };

  render = () => (
    <Context.Provider value={this.state}>
      <CookieConsent />
      {this.props.children}
    </Context.Provider>
  );
}

const CookiesProvider = Provider;

export const useCookiesProvider = () => useContext(Context);

export default CookiesProvider;
