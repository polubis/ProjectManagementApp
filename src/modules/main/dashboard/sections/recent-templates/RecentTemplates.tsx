import React, { FC, useMemo } from 'react';

import { Disclaimer } from 'ui';

import { useLoad } from 'utils';

import { getTemplates } from 'shared/services';
import { Guard } from 'shared/guards';

import {
  SectionLayout,
  TemplatesList,
  TemplatesListLoader,
  TemplatesErrorAction,
} from '../../components';

const RecentTemplates: FC = () => {
  const source = useMemo(() => getTemplates(''), []);
  const [templates, loading, error] = useLoad(source);

  return (
    <SectionLayout title="Recent templates">
      {loading ? (
        <TemplatesListLoader />
      ) : error ? (
        // TODO ADD OPTION TO RETRY
        // IMPLEMENT LAST COMPONENT
        // WRITE UNIT TESTS FOR useLoad
        // ADD RWD TO THIS VIEW
        <TemplatesErrorAction onClick={() => {}} />
      ) : (
        <>
          {templates.length > 0 ? (
            <TemplatesList templates={templates} />
          ) : (
            <Disclaimer
              description="
        Nobody added new templates. Don't worry, new ones appear over time"
              title="There are currently no new templates"
            />
          )}
        </>
      )}
    </SectionLayout>
  );
};

const UnprotectedRecentTemplates: FC = () => (
  <Guard.Unprotected>
    <RecentTemplates />
  </Guard.Unprotected>
);

export default UnprotectedRecentTemplates;
