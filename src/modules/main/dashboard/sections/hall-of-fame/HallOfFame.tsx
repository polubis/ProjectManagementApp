import React, { FC, useMemo, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import { ErrorAction, Button } from 'ui';

import { useLoad } from 'utils';

import { getRandomTemplate, getRandomTemplateByTechnologies } from 'shared/services';
import { useAuthProvider } from 'shared/providers/auth';
import { TemplateCategory } from 'shared/models';

import { SectionLayout, TemplateDetails, TemplateDetailsLoader } from '../../components';

const HallOfFame: FC = () => {
  const { push } = useHistory();

  const { authorized } = useAuthProvider();

  const source = useMemo(() => (authorized ? getRandomTemplateByTechnologies : getRandomTemplate), [
    authorized,
  ]);

  const [template, loading, error, loadTemplate] = useLoad(source);

  useEffect(() => {
    loadTemplate();
  }, [source]);

  const handleSeeDetailsClick = useCallback(() => {
    push(`/app/templates/${TemplateCategory.ALL}/${template.id}`);
  }, [template]);

  return (
    <SectionLayout title="Hall of fame">
      {loading ? (
        <TemplateDetailsLoader />
      ) : error ? (
        <ErrorAction
          description="Right now we cannot template. Please try again later"
          operations={<Button onClick={loadTemplate}>RELOAD</Button>}
          title="Template load failed"
        />
      ) : (
        <TemplateDetails
          template={template}
          onSeeDetailsClick={handleSeeDetailsClick}
          onShowOtherClick={loadTemplate}
        />
      )}
    </SectionLayout>
  );
};

export default HallOfFame;
