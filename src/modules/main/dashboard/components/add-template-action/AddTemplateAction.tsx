import React, { FC, memo } from 'react';

import { Action } from 'ui';

import { CreateTemplateButton } from 'shared/components';
import { Guard } from 'shared/guards';

import csx from './AddTemplateAction.scss';

const AddTemplateAction: FC = memo(
  () => {
    return (
      <Guard.Protected>
        <Action
          description="We know how important it is to start a project quickly. 
          Create your own template and share with others"
          operations={<CreateTemplateButton />}
          title={
            <>
              Create your own <span className={csx.templates}>templates</span>
            </>
          }
        />
      </Guard.Protected>
    );
  },
  () => true
);

export default AddTemplateAction;
