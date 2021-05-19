import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'ui';

import csx from './AdminContentLinks.scss';

interface Link {
  label: string;
  path: string;
}

namespace AdminContentLinks {
  export interface Props {
    onLinkClick?(): void;
  }
}

const LINKS: Link[] = [
  { label: 'Dictionary', path: 'dictionaries' },
  { label: 'Surveys', path: 'surveys' },
  { label: 'Users', path: 'users' },
];

const AdminContentLinks: FC<AdminContentLinks.Props> = ({ onLinkClick }) => {
  return (
    <div className={csx.adminContentLinks}>
      {LINKS.map(({ label, path }) => (
        <NavLink
          key={label}
          activeClassName={csx.active}
          to={`/app/admin/${path}`}
          onClick={onLinkClick}
        >
          <Button theme="primaryTransparent">{label}</Button>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminContentLinks;
