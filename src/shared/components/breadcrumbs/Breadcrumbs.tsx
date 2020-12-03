import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import csx from './Breadcrumbs.scss';

namespace Breadcrumbs {
  export interface Item {
    label: string;
    path: string;
  }

  export interface Props {
    className?: string;
    divider: string;
  }
}

const isGuid = (url: string) => url.includes('-');

const createBreadcrumbs = (pathname: string): Breadcrumbs.Item[] => {
  const urls = pathname.replace('/app/', '').split('/');

  return urls
    .map((part) => (isGuid(part) ? 'details' : part))
    .map(
      (part, i) =>
        ({
          label: part,
          path: `/app/${urls.slice(0, i + 1).join('/')}`,
        } as Breadcrumbs.Item)
    );
};

const Breadcrumbs = ({ className = '', divider }: Breadcrumbs.Props): JSX.Element => {
  const { pathname } = useLocation();

  const breadcrumbs = createBreadcrumbs(pathname);

  return (
    <div className={`${csx.breadcrumbs} ${className}`}>
      {breadcrumbs.map(({ label, path }) => (
        <React.Fragment key={label}>
          <Link to={path}>{label}</Link>
          <div className={csx.divider}>{divider}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
