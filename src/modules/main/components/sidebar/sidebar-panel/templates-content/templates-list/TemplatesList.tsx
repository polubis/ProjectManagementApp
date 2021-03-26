import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';

import { TemplateTileSmall } from 'shared/components';
import { TemplateCategory, Template } from 'shared/models';

import csx from './TemplatesList.scss';

namespace TemplatesList {
  export interface Props {
    templates: Template[];
    onDelete(templateId: string): void;
  }
}

const TemplatesList: FC<TemplatesList.Props> = ({ templates, onDelete }) => {
  const { push } = useHistory();

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget.dataset;

    push(`/app/templates/${TemplateCategory.ALL}/${id}`);
  }, []);

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { id } = e.currentTarget.dataset;

      e.stopPropagation();
      onDelete(id);
    },
    [onDelete]
  );

  if (templates.length === 0) {
    return null;
  }

  return (
    <div className={csx.templatesList}>
      {templates.map((template) => (
        <TemplateTileSmall
          className={csx.template}
          key={template.id}
          data-id={template.id}
          template={template}
          onClick={handleClick}
        >
          <div data-id={template.id} onClick={handleDelete}>
            REMOVE
          </div>
        </TemplateTileSmall>
      ))}
    </div>
  );
};

export default TemplatesList;
