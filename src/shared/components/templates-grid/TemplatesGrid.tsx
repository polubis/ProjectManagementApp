import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router';

import { Spaceholder } from 'ui';

import { Template } from 'core/api';

import { TemplateTile } from '..';

import csx from './TemplatesGrid.scss';

namespace TemplatesGrid {
  export interface Props {
    loading: boolean;
    templates: Template[];
    spaceholdersCount?: number;
    pathname?: string;
  }
}

const renderSpaceholders = (loading: boolean, spaceholdersCount: number) => () =>
  loading
    ? Array.from({ length: spaceholdersCount }, (_, idx) => (
        <Spaceholder key={idx} className={csx.spaceholder} />
      ))
    : null;

/** 
 * Renders grid components based on given data
 * 
 * @param props
 * @param props.loading Displays spaceholders if truthy
 * @param props.templates Templates to display
 * @param props.path Path prefix to rediect
 * @param props.spaceholdersCount Numbers of spaceholders to render when `loading` is truthy
 */
const TemplatesGrid = ({
  loading,
  templates,
  pathname,
  spaceholdersCount = 12
}: TemplatesGrid.Props) => {
  const { push, location } = useHistory();

  const goToDetails = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const templateId = e.currentTarget.getAttribute('data-idx');
      push(`${pathname ? pathname : location.pathname}/${templateId}`);
    },
    [location.pathname]
  );

  const spaceholders = useMemo(renderSpaceholders(loading, spaceholdersCount), [loading]);

  return (
    <section className={csx.templatesGrid}>
      {templates.map(template => (
        <TemplateTile key={template.id} template={template} onClick={goToDetails} />
      ))}
      {spaceholders}
    </section>
  );
};

export default TemplatesGrid;
