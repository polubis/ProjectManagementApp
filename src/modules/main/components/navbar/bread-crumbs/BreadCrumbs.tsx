import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { BreadCrumbsFactory } from '../../../utils';

import csx from './BreadCrumbs.scss';

namespace BreadCrumbs {
  export interface Props {
    pathname: string;
  }
}

const BreadCrumbs = memo(
  ({ pathname }: BreadCrumbs.Props) => (
    <div className={csx.breadCrumbs}>
      {BreadCrumbsFactory.create(pathname).map((item, idx) => (
        <React.Fragment key={idx}>
          <Link to={item.path}>{item.label}</Link>
          <div className={csx.divider}>{'>'}</div>
        </React.Fragment>
      ))}
    </div>
  ),
  (prev, curr) => prev.pathname === curr.pathname
);

export default BreadCrumbs;
