import React, { forwardRef, useMemo } from 'react';

import { Avatar } from '@material-ui/core';

import { Button, Img } from 'ui';

import { useAuthProvider } from 'core/auth';

import csx from './UserDetails.scss';

const getYearsLabel = (value: number): string =>
  value > 1 ? `${value} years` : value === 1 ? `${value} year` : 'Unknown';

const UserDetails = forwardRef(() => {
  const { user, logOut } = useAuthProvider();
  const {
    company,
    yearsOfExperience,
    username,
    seniority,
    email,
    position,
    technologies,
    connectedWithGithub
  } = user;

  const profileDetails = useMemo(
    (): [string, React.ReactText][] =>
      Object.entries({
        Company: company || 'Unknown',
        'Years of experience': getYearsLabel(yearsOfExperience),
        Seniority: getYearsLabel(seniority),
        Position: position || 'Unknown'
      }),
    [user]
  );

  return (
    <div className={csx.userDetails}>
      <header>
        <Avatar className={csx.avatar}>{username.charAt(0).toUpperCase()}</Avatar>

        <div className={csx.personality}>
          <span>{username}</span>
          <span>{email}</span>
        </div>
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
            <span className={csx.success}>Connected</span> with <span>Github</span>
          </div>
        ) : (
          <>
            <div>
              <span className={csx.error}>No connection</span> with <span>Github</span>
            </div>
            <Button
              onClick={() => {
                /* TODO: CONNECT TO GITHUB LOGIC HERE */
              }}
            >
              CONNECT TO GITHUB
            </Button>
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
