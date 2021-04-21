import React, { FC, useState } from 'react';

import WidgetsIcon from '@material-ui/icons/Widgets';
import DashboardIcon from '@material-ui/icons/Dashboard';

import NavigationSearch from './navigation-search';
import NavigationList from './navigation-list';
import NavigationHeader from './navigation-header';

import csx from './Navigation.scss';

const ITEMS: NavigationList.ParentItem[] = [
  {
    id: 0,
    label: 'Its me',
    active: true,
    icon: <WidgetsIcon />,
    expanded: true,
    children: [
      {
        id: 0,
        label: 'Header 1',
      },
      {
        id: 1,
        label: 'Header 2',
      },
      {
        id: 2,
        label: 'Header 3',
      },
      {
        id: 3,
        label: 'Header 4',
      },
    ],
  },
  {
    id: 1,
    label: 'Siema',
    icon: <DashboardIcon />,
    expanded: true,
    children: [
      {
        id: 0,
        label: 'Header 1',
        active: true,
      },
      {
        id: 1,
        label: 'Header 2',
      },
      {
        id: 2,
        label: 'Header 3',
      },
      {
        id: 3,
        label: 'Header 4',
      },
    ],
  },
];

const Navigation: FC = () => {
  const [items, setItems] = useState(ITEMS);

  const handleChildClick: NavigationList.OnChildClick = () => {};

  const handleParentClick: NavigationList.OnParentClick = () => {};

  return (
    <div className={csx.navigation}>
      <NavigationHeader />
      <NavigationSearch onChange={() => {}} />
      <NavigationList items={items} onChildClick={() => {}} onParentClick={() => {}} />
    </div>
  );
};

export default Navigation;
