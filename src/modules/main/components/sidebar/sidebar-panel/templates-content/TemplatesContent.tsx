import React from 'react';

import { CreateTemplateButton } from 'shared/components';
import { Guard } from 'shared/guards';

import ContentHeader from '../content-header';
import TemplatesHistory from '../templates-history';

import csx from './TemplatesContent.scss';

const TemplatesContent = (): JSX.Element => {
  return (
    <div className={csx.templatesContent}>
      <ContentHeader description="Use filters and find template" title="Templates" />
      <Guard.Protected>
        {({ user: { connectedWithGithub } }) => (
          <>
            {connectedWithGithub && <CreateTemplateButton />}
            <TemplatesHistory />
          </>
        )}
      </Guard.Protected>
    </div>
  );
};

export default TemplatesContent;
