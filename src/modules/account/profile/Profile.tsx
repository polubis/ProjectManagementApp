import React from 'react';
import { Link } from 'react-router-dom';

import { Img, Button } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';

import csx from './Profile.scss';

const Profile = (): JSX.Element => {
  const { user } = useAuthProvider();

  return (
    <div className={csx.profile}>
      <h3>Profile</h3>
    </div>
  );
};

export default Profile;
