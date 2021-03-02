import React, { FC, useCallback, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';

import { TemplateTileSmall } from 'shared/components';
import { Template, TemplateCategory } from 'shared/models';

import csx from './TemplatesList.scss';

namespace TemplatesList {
  export interface Props {
    templates: Template[];
  }
}

const TemplatesList: FC<TemplatesList.Props> = ({ templates }) => {
  const { push } = useHistory();

  const handleTemplateClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const { id } = e.currentTarget.dataset;

    push(`/app/templates/${TemplateCategory.ALL}/${id}`);
  }, []);

  return (
    <>
      {templates.map((template) => (
        <TemplateTileSmall
          className={csx.item}
          data-id={template.id}
          key={template.id}
          template={template}
          onClick={handleTemplateClick}
        />
      ))}
    </>
  );
};

export default TemplatesList;
