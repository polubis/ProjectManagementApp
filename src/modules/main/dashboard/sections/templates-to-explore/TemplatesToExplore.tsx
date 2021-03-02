import React, { FC, useMemo } from 'react';

import { useLoad } from 'utils';

import { getLastAddedTemplates } from 'shared/services';
import { Guard } from 'shared/guards';

import {
  SectionLayout,
  TemplatesList,
  NoTemplatesToExplore,
  TemplatesListLoader,
  TemplatesErrorAction,
} from '../../components';

const TemplatesToExplore: FC = () => {
  const source = useMemo(() => getLastAddedTemplates(), []);
  const [templates, loading, error] = useLoad(source);

  return (
    <SectionLayout title="Templates to explore">
      {loading ? (
        <TemplatesListLoader />
      ) : error ? (
        <TemplatesErrorAction onClick={() => {}} />
      ) : (
        <>
          {templates.length > 0 ? (
            <TemplatesList templates={templates} />
          ) : (
            <NoTemplatesToExplore />
          )}
        </>
      )}
    </SectionLayout>
  );
};

const ProtectedTemplatesToExplore: FC = () => (
  <Guard.Protected>
    <TemplatesToExplore />
  </Guard.Protected>
);

export default ProtectedTemplatesToExplore;
