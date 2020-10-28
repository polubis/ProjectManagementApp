import React from 'react';
import { useHistory } from 'react-router-dom';

import { Avatar } from '@material-ui/core';

import { Button, Img } from 'ui';

import { TemplateCategory } from 'core/api';
import { useAuthProvider } from 'core/auth';

import csx from './UserDetails.scss';

const MAX_VISIBLE_TECHNOLOGIES = 16;

const UserDetails = () => {
  const {
    user: {
      username,
      email,
      company,
      seniority,
      technologies,
      yearsOfExperience,
      position,
      connectedWithGithub
    },
    logOut
  } = useAuthProvider();

  const { replace } = useHistory();

  const DETAILS: Record<string, string | number> = {
    Company: company || 'Unknown',
    'Years of experience': yearsOfExperience || 'Unknown',
    Seniority: seniority || 'Unknown',
    Position: position || 'Unknown'
  };

  return (
    <div className={csx.userDetails}>
      <div className={csx.header}>
        <Avatar className={csx.avatar}>{username.charAt(0).toUpperCase()}</Avatar>
        <div className={csx.headerDetails}>
          <span>{username}</span>
          <span>{email}</span>
        </div>
      </div>

      <div className={csx.details}>
        {Object.keys(DETAILS).map((detail, idx) => {
          const value = Object.values(DETAILS)[idx];

          return (
            <div className={csx.detail} key={idx}>
              <span>{detail}</span>
              <span>{`${value} ${
                detail === 'Years of experience' && value != 'Unknown' ? 'years' : ''
              }`}</span>
            </div>
          );
        })}

        {technologies.length > 0 ? (
          <div className={csx.detail}>
            <span>{`Technologies ${
              technologies.length > MAX_VISIBLE_TECHNOLOGIES ? `(${technologies.length})` : ''
            }`}</span>

            <div className={csx.technologies}>
              {technologies.map((technology, idx) => {
                const { name, pictureUrl } = technology;

                if (idx < MAX_VISIBLE_TECHNOLOGIES)
                  return <Img alt={name} size="24px:24px" src={pictureUrl} key={idx} />;
                else return null;
              })}
            </div>

            <div>
              {technologies.length > MAX_VISIBLE_TECHNOLOGIES && (
                <span
                  className={csx.seeAll}
                  onClick={() => {
                    /* SEE ALL LOGIC HERE */
                  }}
                >
                  SEE ALL
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className={csx.detail}>
            <span>Technologies</span>
            <span>Unknown</span>
          </div>
        )}
      </div>

      <div className={csx.github}>
        {connectedWithGithub ? (
          <span>
            <span className={csx.success}>Connected</span> with <span>Github</span>
          </span>
        ) : (
          <>
            <span>
              <span className={csx.error}>No connection</span> with <span>Github</span>
            </span>
            <Button
              onClick={() => {
                /* CONNECT TO GITHUB LOGIC HERE */
              }}
            >
              CONNECT TO GITHUB
            </Button>
          </>
        )}
      </div>

      <div className={csx.logout}>
        <Button
          onClick={() => {
            replace(`/app/templates/${TemplateCategory.ALL}`);
            logOut();
          }}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
