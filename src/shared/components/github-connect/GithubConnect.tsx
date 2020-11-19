import React, { useCallback } from 'react';

import { Modal, Button } from 'ui';

import { useAuthProvider } from 'core/auth';
import { useCookiesProvider } from 'core/cookies';

import csx from './GithubConnect.scss';

const [NAME, APPROVED] = ['github-connection', '1'];

const GithubConnect = () => {
  const { user, logInViaGithub } = useAuthProvider();

  const { cookies, setCookies } = useCookiesProvider();

  const handleConnect = useCallback(() => {
    setCookies(NAME, user.id);
    logInViaGithub();
  }, [user]);

  const handleClose = useCallback(() => {
    setCookies(NAME, APPROVED);
  }, []);

  return user && !user.connectedWithGithub && cookies[NAME] !== APPROVED ? (
    <Modal className={csx.githubConnect}>
      <h3>
        Connect your account to <span>Github</span>
      </h3>

      <p>
        Our system has detected that you have not yet linked your account to{' '}
        <span>Github</span>. It will give you access to key functionalities of
        the platform.
      </p>

      <p>You can connect now or do it later.</p>

      <footer>
        <Button theme="primaryTransparent" onClick={handleClose}>
          NOT NOW
        </Button>
        <Button onClick={handleConnect}>CONNECT</Button>
      </footer>
    </Modal>
  ) : null;
};

export default GithubConnect;
