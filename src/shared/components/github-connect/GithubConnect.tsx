import React, { useCallback, useState, useEffect } from 'react';

import { Modal, Button } from 'ui';

import { useAuthProvider } from 'core/auth';
import { useCookiesProvider } from 'core/cookies';

import csx from './GithubConnect.scss';

interface State {
  success: boolean;
}

const STATE: State = {
  success: false
};

const NAME = 'github-connection';
const NOT_NOW_VALUE = 'not now';

const GithubConnect = () => {
  const [state, setState] = useState(STATE);
  const { success } = state;

  const { user, logInViaGithub } = useAuthProvider();

  const { cookies, setCookies, removeCookie } = useCookiesProvider();

  useEffect(() => {
    user && user.connectedWithGithub && setState({ success: true });
  }, [user]);

  const connect = useCallback(() => {
    setCookies(NAME, user.id);
    logInViaGithub();
  }, [user]);

  const clearCookies = useCallback(() => {
    setState(STATE);
    removeCookie(NAME);
  }, []);

  const notNow = useCallback(() => {
    setCookies(NAME, NOT_NOW_VALUE);
  }, []);

  const shouldShowScreen =
    (user && !user.connectedWithGithub && cookies[NAME] !== NOT_NOW_VALUE) ||
    (user && cookies[NAME] === user.id && success);

  return (
    shouldShowScreen && (
      <Modal className={csx.githubConnect}>
        {!success ? (
          <>
            <h3>
              Connect your account to <span>Github</span>
            </h3>
            <p>
              Our system has detected that you are not yet connected to <span>Github</span>. This is
              not a problem if you want to use basic features.
            </p>
            <p>You can connect now or do it later.</p>
            <div className={csx.buttons}>
              <Button theme="primaryTransparent" onClick={notNow}>
                NOT NOW
              </Button>
              <Button onClick={connect}>CONNECT</Button>
            </div>
          </>
        ) : (
          <>
            <h3>
              Your account is <span className={csx.success}>connected</span> !
            </h3>
            <p>
              You can now log in through <span>Github</span> and use all the website functionalities
            </p>
            <div className={csx.buttons}>
              <Button onClick={clearCookies}>OK</Button>
            </div>
          </>
        )}
      </Modal>
    )
  );
};

export default GithubConnect;
