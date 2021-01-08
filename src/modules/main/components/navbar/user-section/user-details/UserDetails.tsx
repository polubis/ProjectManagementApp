import React, { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import { Button, Img } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';
import { SENIORITY_ITEMS } from 'shared/consts';

import csx from './UserDetails.scss';

const getYearsLabel = (value: number): string =>
  value > 1 ? `${value} years` : value === 1 ? `${value} year` : 'Unknown';

const UserDetails = forwardRef(() => {
  const { user, logOut, logInViaGithub } = useAuthProvider();
  const {
    company,
    yearsOfExperience,
    username,
    seniority,
    email,
    position,
    technologies,
    connectedWithGithub,
  } = user;

  const profileDetails = useMemo(
    (): [string, React.ReactText][] =>
      Object.entries({
        Company: company || 'Unknown',
        'Years of experience': getYearsLabel(yearsOfExperience),
        Seniority: seniority !== null ? SENIORITY_ITEMS[seniority] : 'Unknown',
        Position: position || 'Unknown',
      }),
    [user]
  );

  return (
    <div className={csx.userDetails}>
      <header>
        <Img className={csx.avatar} src={user.githubAvatarUrl} size="50px:50px">
          {username.charAt(0).toUpperCase()}
        </Img>

        <div className={csx.personality}>
          <span>{username}</span>
          <span>{email}</span>
        </div>

        <Link to="/account/general" className={csx.generalLink}>
          <Button variant="icon" theme="primaryTransparent">
            <SettingsIcon />
          </Button>
        </Link>

        <Link to="/account/profile" className={csx.profileLink}>
          <Button variant="icon" theme="primaryTransparent">
            <AccountIcon />
          </Button>
        </Link>
      </header>

      <div className={csx.details}>
        {profileDetails.map(([key, value]) => (
          <div className={csx.detail} key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}

        <div className={csx.detail}>
          <span>Technologies {technologies.length > 0 ? `(${technologies.length})` : ''}</span>

          <div className={csx.technologies}>
            {technologies.length > 0 ? (
              technologies.map(({ id, name, pictureUrl }) => (
                <Img key={id} alt={name} size="24px:24px" src={pictureUrl} />
              ))
            ) : (
              <span>Unknown</span>
            )}
          </div>
        </div>
      </div>

      <div className={csx.github}>
        {connectedWithGithub ? (
          <div>
            <span className={csx.success}>Connected</span> with{' '}
            <span className={csx.primary}>Github</span>
          </div>
        ) : (
          <>
            <div>
              <span className={csx.error}>No connection</span> with{' '}
              <span className={csx.primary}>Github</span>
            </div>
            <Button onClick={logInViaGithub}>CONNECT TO GITHUB</Button>
          </>
        )}
      </div>

      <Button className={csx.logout} onClick={logOut}>
        LOGOUT
      </Button>
    </div>
  );
});

export default UserDetails;
