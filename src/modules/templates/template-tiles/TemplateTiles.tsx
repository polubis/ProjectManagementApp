import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useTemplatesProvider } from '../TemplatesProvider';

import Placeholder from './placeholder';
import TemplateTile from './template-tile';

import csx from './TemplateTiles.scss';

const TemplateTiles = () => {
  const { push, location } = useHistory();

  const { templates, loading } = useTemplatesProvider();

  const goToDetails = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const templateId = e.currentTarget.getAttribute('data-id');
      push(`${location.pathname}/${templateId}`);
    },
    [location]
  );

  const placeholders = useMemo(() => {
    return loading ? Array.from({ length: 12 }, (_, idx) => <Placeholder key={idx} />) : null;
  }, [loading]);

  return (
    <section className={csx.templateTiles}>
      {templates.map((template) => (
        <TemplateTile key={template.id} template={template} onClick={goToDetails} />
      ))}
      {placeholders}
    </section>
  );
};

export default TemplateTiles;
