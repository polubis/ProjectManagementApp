import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import csx from './BreadCrumbs.scss';

interface Item {
  children: string;
  to: string;
}

const isGuid = (url: string) => url.includes('-');

const makeBreadCrumbs = (url: string): Item[] => {
  const urls = url.replace('/app/', '').split('/');

  return urls
    .map((part) => (isGuid(part) ? 'details' : part))
    .map(
      (part, i) =>
        ({
          children: part,
          to: `/app/${urls.slice(0, i + 1).join('/')}`
        } as Item)
    );
};

namespace BreadCrumbs {
  export interface Props {
    pathname: string;
  }
}

const BreadCrumbs = memo(
  ({ pathname }: BreadCrumbs.Props) => (
    <div className={csx.breadCrumbs}>
      {makeBreadCrumbs(pathname).map((item, idx) => (
        <React.Fragment key={idx}>
          <Link {...item} />
          <div className={csx.divider}>{'>'}</div>
        </React.Fragment>
      ))}
    </div>
  ),
  (prev, curr) => prev.pathname === curr.pathname
);

export default BreadCrumbs;
