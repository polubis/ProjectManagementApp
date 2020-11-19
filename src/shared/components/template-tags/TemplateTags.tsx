import React from 'react';

import { Tags } from 'ui';

import csx from './TemplateTags.scss';

const TemplateTags = ({ items, className = '', onClick }: Tags.Props) => (
  <Tags
    className={`${csx.templateTags} ${className}`}
    items={items}
    onClick={onClick}
  />
);

export default TemplateTags;
