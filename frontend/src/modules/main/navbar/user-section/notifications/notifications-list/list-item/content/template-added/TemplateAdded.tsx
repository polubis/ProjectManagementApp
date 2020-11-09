import React from 'react';

import AddTemplateIcon from '@material-ui/icons/Queue';

import Content from '..';

import csx from './TemplateAdded.scss';

const TemplateAdded: Content.Component = item => {
  return (
    <div className={csx.templateAdded}>
      <figure>
        <AddTemplateIcon />
      </figure>

      <span className={csx.content}>
        <b>{item.author} </b>
        {item.content}
      </span>

      <div className={csx.divider} />

      <span className={csx.date}>{item.creationDate}</span>
    </div>
  );
};

export default TemplateAdded;
