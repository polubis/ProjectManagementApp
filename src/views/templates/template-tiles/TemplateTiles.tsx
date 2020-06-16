import React, { useContext, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { TemplatesContext } from 'core/templates';

import { TemplateTile, Placeholder } from '.';

import csx from './TemplateTiles.scss';

export const TemplateTiles = () => {
  const { push, location } = useHistory();

  const { templates, loading } = useContext(TemplatesContext);

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
