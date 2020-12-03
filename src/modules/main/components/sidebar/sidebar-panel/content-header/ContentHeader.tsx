import React, { memo } from 'react';

import csx from './ContentHeader.scss';

namespace ContentHeader {
  export interface Props {
    description: string;
    title: string;
  }
}

const ContentHeader = memo(
  ({ description, title }: ContentHeader.Props): JSX.Element => {
    return (
      <>
        <h3 className={csx.title}>{title}</h3>
        <span className={csx.description}>{description}</span>
      </>
    );
  }
);

export default ContentHeader;
