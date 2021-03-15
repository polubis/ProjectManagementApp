import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Disclaimer, Button } from 'ui';

import csx from './NoTemplatesToExplore.scss';

const NoTemplatesToExplore: FC = memo(
  () => {
    return (
      <div className={csx.noTemplatesToExplore}>
        <Disclaimer
          description="You have already seen all the templates that 
match your profile"
          title="No templates to explore"
        />
        <CheckCircleIcon className={csx.checkIcon} />
        <Link to="/account/profile">
          <Button>UPDATE SETTINGS</Button>
        </Link>
      </div>
    );
  },
  () => true
);

export default NoTemplatesToExplore;
