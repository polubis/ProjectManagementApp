import React from 'react';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';

import { Img, Button } from 'ui';

import { SENIORITY_ITEMS } from 'shared/consts';
import { useAuthProvider } from 'shared/providers/auth';

import csx from './Profile.scss';

const getYearsLabel = (value: number): string =>
  value > 1 ? `${value} years` : value === 1 ? `${value} year` : 'Unknown';

const Profile = (): JSX.Element => {
  const { user } = useAuthProvider();

  const hasTechnologies = user.technologies.length > 0;

  return (
    <div className={csx.profile}>
      <header>
        <span>Profile</span>
        <Link to="/account/profile/management">
          <Button>
            <EditIcon />
            EDIT
          </Button>
        </Link>
      </header>

      <div className={`${csx.user} ${hasTechnologies ? csx.sliced : ''}`}>
        <header>
          <Img className={csx.avatar} size="74px:74px" src={user.githubAvatarUrl}>
            {user.username.charAt(0).toUpperCase()}
          </Img>
          <b>{user.username}</b>
        </header>

        <div className={csx.details}>
          <div className={csx.detail}>
            <span>Position</span>
            <span>{user.position || 'Unknown'}</span>
          </div>

          <div className={csx.detail}>
            <span>Seniority</span>
            <span>{user.seniority !== null ? SENIORITY_ITEMS[user.seniority] : 'Unknown'}</span>
          </div>

          <div className={csx.detail}>
            <span>Company</span>
            <span>{user.company || 'Unknown'}</span>
          </div>

          <div className={csx.detail}>
            <span>Years of experience</span>
            <span>{getYearsLabel(user.yearsOfExperience)}</span>
          </div>
        </div>

        {hasTechnologies && (
          <div className={csx.technologies}>
            <span>Technologies</span>

            <div className={csx.technologiesList}>
              {user.technologies.map((technology) => (
                <Img key={technology.id} size="32px:32px" src={technology.pictureUrl} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
