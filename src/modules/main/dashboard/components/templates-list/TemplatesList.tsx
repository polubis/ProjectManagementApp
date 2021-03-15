import React, { FC, useCallback, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';

import { Disclaimer } from 'ui';

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
    <div className={csx.list}>
      {templates.length > 0 ? (
        <>
          <h3>
            We found <span>{templates.length}</span>{' '}
            {templates.length > 1 ? 'templates' : 'template'}{' '}
          </h3>

          <div className={csx.items}>
            {templates.map((template) => (
              <TemplateTileSmall
                className={csx.item}
                data-id={template.id}
                key={template.id}
                template={template}
                onClick={handleTemplateClick}
              />
            ))}
          </div>
        </>
      ) : (
        <Disclaimer
          description="
          We currently don't have any templates to recommend"
          title="No templates"
        />
      )}
    </div>
  );
};

export default TemplatesList;
