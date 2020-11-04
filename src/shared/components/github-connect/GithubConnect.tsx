import React, { useCallback, useState, useEffect } from 'react';

import { Modal, Button } from 'ui';

import { useAuthProvider } from 'core/auth';
import { useCookiesProvider } from 'core/cookies';

import csx from './GithubConnect.scss';

const [NAME, APPROVED] = ['github-connection', '1'];

const GithubConnect = () => {
  const [success, setSuccess] = useState(false);

  const { user, logInViaGithub } = useAuthProvider();

  const { cookies, setCookies, removeCookie } = useCookiesProvider();

  useEffect(() => {
    user && user.connectedWithGithub && setSuccess(true);
  }, [user]);

  const handleConnect = useCallback(() => {
    setCookies(NAME, user.id);
    logInViaGithub();
  }, [user]);

  const handleClearCookies = useCallback(() => {
    setSuccess(false);
    removeCookie(NAME);
  }, []);

  const handleNotNow = useCallback(() => {
    setCookies(NAME, APPROVED);
  }, []);

  const visible =
    user &&
    ((!user.connectedWithGithub && cookies[NAME] !== APPROVED) ||
      (cookies[NAME] === user.id && success));

  return visible ? (
    <Modal className={csx.githubConnect}>
      {success ? (
        <>
          <h3>
            Your account is <span className={csx.success}>connected</span> !
          </h3>
          <p>
            You can now log in through <span>Github</span> and use all the website functionalities
          </p>
          <footer>
            <Button onClick={handleClearCookies}>OK</Button>
          </footer>
        </>
      ) : (
        <>
          <h3>
            Connect your account to <span>Github</span>
          </h3>
          <p>
            Our system has detected that you are not yet connected to <span>Github</span>. This is
            not a problem if you want to use basic features.
          </p>
          <p>You can connect now or do it later.</p>
          <footer>
            <Button theme="primaryTransparent" onClick={handleNotNow}>
              NOT NOW
            </Button>
            <Button onClick={handleConnect}>CONNECT</Button>
          </footer>
        </>
      )}
    </Modal>
  ) : null;
};

export default GithubConnect;
