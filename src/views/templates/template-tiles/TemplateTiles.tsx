import React from 'react';
import { useHistory } from 'react-router';

import { TemplateTile } from '.';

import { templatesMock } from 'mocks';

import csx from './TemplateTiles.scss';

export const TemplateTiles = () => {
  const { push, location } = useHistory();

  const redirectToDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const templateId = e.currentTarget.getAttribute('data-id');
    push(`${location.pathname}/${templateId}`);
  };

  return (
    <section className={csx.templateTiles}>
      {templatesMock.map((template) => (
        <TemplateTile template={template} onTemplateClick={redirectToDetails} />
      ))}
    </section>
  );
};
