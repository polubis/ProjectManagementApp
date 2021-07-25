import React, { FC, memo } from 'react';

import { Action } from 'ui';

import { CreateGroupButton } from 'shared/components';
import { Guard } from 'shared/guards';

import csx from './AddGroupAction.scss';

const AddGroupAction: FC = memo(
  () => {
    return (
      <Guard.Protected>
        {({ user: { connectedWithGithub } }) =>
          connectedWithGithub && (
            <Action
              description={`
              If you are a member of a community, work in a company or want to have private content, groups are the perfect solution`}
              operations={<CreateGroupButton />}
              title={
                <>
                  Create your own <span className={csx.group}>group</span>
                </>
              }
            />
          )
        }
      </Guard.Protected>
    );
  },
  () => true
);

export default AddGroupAction;
