import React, { FC, useMemo, useEffect } from 'react';

import { useLoad } from 'utils';

import { getTemplates, getLastAddedTemplates } from 'shared/services';
import { useAuthProvider } from 'shared/providers/auth';

import {
  SectionLayout,
  TemplatesList,
  TemplatesListLoader,
  TemplatesErrorAction,
} from '../../components';
import { useMarkLastAddedReadTime } from './useMarkLastAddedReadTime';

const RecommendedTemplates: FC = () => {
  const { authorized } = useAuthProvider();

  const source = useMemo(() => (authorized ? getLastAddedTemplates : getTemplates), [authorized]);

  const [templates, loading, error, loadTemplates] = useLoad(source);

  useMarkLastAddedReadTime(authorized, templates);

  useEffect(() => {
    loadTemplates();
  }, [source]);

  return (
    <SectionLayout title={authorized ? 'Templates to explore' : 'Recommended templates'}>
      {loading ? (
        <TemplatesListLoader />
      ) : error ? (
        <TemplatesErrorAction onClick={loadTemplates} />
      ) : (
        <TemplatesList templates={templates} />
      )}
    </SectionLayout>
  );
};

export default RecommendedTemplates;
