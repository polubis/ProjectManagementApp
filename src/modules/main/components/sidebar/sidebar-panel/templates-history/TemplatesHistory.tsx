import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';

import { TemplateTileSmall } from 'shared/components';
import { TemplateCategory } from 'shared/models';
import { useTemplatesHistoryProvider } from 'shared/providers/templates-history';

import csx from './TemplatesHistory.scss';

const TemplatesHistory: FC = () => {
  const { push } = useHistory();

  const { templates } = useTemplatesHistoryProvider();

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget.dataset;

    push(`/app/templates/${TemplateCategory.ALL}/${id}`);
  }, []);

  if (templates.length === 0) {
    return null;
  }

  return (
    <div className={csx.templatesHistory}>
      <h5 className={csx.label}>History</h5>
      {templates.map((template) => (
        <TemplateTileSmall
          className={csx.template}
          key={template.id}
          data-id={template.id}
          template={template}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default TemplatesHistory;
