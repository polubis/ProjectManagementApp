import React from 'react';
import { Link } from 'react-router-dom';

import { Img, Button } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';

import csx from './General.scss';

const General = (): JSX.Element => {
  const { user, logInViaGithub } = useAuthProvider();

  return (
    <div className={csx.general}>
      <h3>General</h3>

      <div className={csx.user}>
        <header>
          <Img className={csx.avatar} size="74px:74px" src={user.githubAvatarUrl}>
            {user.username.charAt(0).toUpperCase()}
          </Img>
          <b>{user.id}</b>
        </header>

        <div className={csx.details}>
          <div className={csx.detail}>
            <span>Username</span>
            <span>{user.username}</span>
          </div>

          <div className={csx.detail}>
            <span>Email</span>
            <span>{user.email}</span>
          </div>

          <div className={csx.detail}>
            <span>Roles</span>
            <span>{user.roles.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={csx.divider} />

      <div className={csx.passwordSetup}>
        <span className={csx.title}>Password setup</span>

        <Link to="/account/general/change-password">
          <Button>CHANGE PASSWORD</Button>
        </Link>
      </div>

      <div className={csx.divider} />

      <div className={csx.githubConnection}>
        <span className={csx.title}>Github connection</span>

        {user.connectedWithGithub ? (
          <>
            <div className={csx.connectionLabel}>
              <span className={csx.green}>Connected</span> with{' '}
              <span className={csx.primary}>Github</span>
            </div>
          </>
        ) : (
          <>
            <div className={csx.connectionLabel}>
              <span className={csx.red}>No connection</span> with{' '}
              <span className={csx.primary}>Github</span>
            </div>

            <Button onClick={logInViaGithub}>CONNECT TO GITHUB</Button>
          </>
        )}
      </div>

      <div className={csx.divider} />

      {/* TODO UNCOMMENT THIS LATER AND CONNECT WITH BACKEND */}
      {/* <div className={csx.dangerZone}>
        <span className={csx.title}>Danger zone</span>

        <span className={csx.description}>
          Along with the deletion of your account, your templates and all data added by you will be
          also deleted
        </span>

        <Button theme="danger">DELETE ACCOUNT</Button>
      </div> */}
    </div>
  );
};

export default General;
