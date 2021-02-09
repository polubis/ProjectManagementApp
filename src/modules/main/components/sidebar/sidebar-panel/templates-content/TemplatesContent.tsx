import React from 'react';

import { CreateTemplateButton } from 'shared/components';
import { OnlyAuthorized } from 'shared/guards';

import ContentHeader from '../content-header';

import csx from './TemplatesContent.scss';

const TemplatesContent = (): JSX.Element => {
  return (
    <div className={csx.templatesContent}>
      <ContentHeader description="Use filters and find template" title="Templates" />
      <OnlyAuthorized>
        <CreateTemplateButton />
      </OnlyAuthorized>
    </div>
  );
};

export default TemplatesContent;
