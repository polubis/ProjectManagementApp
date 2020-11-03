import React, { createContext, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';

namespace CookiesProvider {
  export type Cookies = {
    [key: string]: string;
  };

  export type SetCookies = (name: string, value: string | object) => void;
  export type RemoveCookie = (name: string) => void;

  export interface State {
    cookies: Cookies;
    removeCookie?: RemoveCookie;
    setCookies?: SetCookies;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: CookiesProvider.State = {
  cookies: Cookies.get()
};

const Context = createContext(STATE);

class Provider extends React.Component<CookiesProvider.Props, typeof STATE> {
  removeCookie: CookiesProvider.RemoveCookie = (name) => {
    Cookies.remove(name);

    this.setState({ cookies: Cookies.get() });
  };

  setCookies: CookiesProvider.SetCookies = (name, value) => {
    Cookies.set(name, value);

    this.setState({ cookies: Cookies.get() });
  };

  readonly state: typeof STATE = {
    ...STATE,
    removeCookie: this.removeCookie,
    setCookies: this.setCookies
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const CookiesProvider = Provider;

export const useCookiesProvider = () => useContext(Context);

export default CookiesProvider;
