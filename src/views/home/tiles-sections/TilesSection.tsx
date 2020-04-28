import React from 'react';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MessageIcon from '@material-ui/icons/Message';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { Tile } from '.';

import csx from './TilesSection.scss';

const TILES: Tile[] = [
  {
    icon: <LibraryBooksIcon fontSize="large"/>,
    title: 'Templates',
    description: `Are you starting a new project? Use a template prepared by other developers and save your time`
  },
  {
    icon: <MenuBookIcon fontSize="large"/>,
    title: 'Documentation',
    description: `Bored of searching for information on the internet? Use automatically generated documentation and speed up knowledge transfer`
  },
  {
    icon: <WidgetsIcon fontSize="large"/>,
    title: 'Components',
    description: `Frustrated with the speed and number of applications to manage your project? Use our tool, complete your team and manage the project from our app`
  },
  {
    icon: <AccountTreeIcon fontSize="large"/>,
    title: 'Projects',
    description: `Frustrated with the speed and number of applications to manage your project? Use our tool, complete your team and manage the project from our app`
  },
  {
    icon: <MessageIcon fontSize="large"/>,
    title: 'Real-time communication',
    description: `Frustrated with the speed and number of applications to manage your project? Use our tool, complete your team and manage the project from our app`
  }
];

export const TilesSection = () => {
  const mapTiles = (tiles: Tile[]) =>
    tiles.map(({ description, icon, title }, idx) => (
      <section className={csx.tile} key={idx}>
        <span>{icon}</span>
        <span className={csx.heading}>{title}</span>
        <span className={csx.description}>{description}</span>
      </section>
    ));

  return <div className={csx.tilesSection}>{mapTiles(TILES)}</div>;
};
