import React from 'react';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MessageIcon from '@material-ui/icons/Message';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import csx from './Features.scss';

namespace Features {
  export interface Items {
    icon: React.ReactNode;
    label: string;
    description: string;
  }
}

const FEATURES: Features.Items[] = [
  {
    icon: <LibraryBooksIcon />,
    label: 'Templates',
    description: `Are you starting a new project? Use a template prepared by other developers and save your time`
  },
  {
    icon: <MenuBookIcon />,
    label: 'Documentation',
    description: `Bored of searching for information on the internet? Use automatically generated documentation and speed up knowledge transfer`
  },
  {
    icon: <WidgetsIcon />,
    label: 'Components',
    description: `
      Bored with component testing in your IDE? Check the component in our environment and accelerate your development`
  },
  {
    icon: <AccountTreeIcon />,
    label: 'Projects & Boards',
    description: `Frustrated with number of applications to manage your project? Use our tool, complete your team and manage the project from our app`
  },
  {
    icon: <MessageIcon />,
    label: 'Real-time communication',
    description: `Communicate with team members from our application. Save your time and do everything in one application`
  }
];

const Features = () => {
  return (
    <section className={csx.features}>
      <div className={csx.wrapper}>
        {FEATURES.map(feature => (
          <div className={csx.feature}>
            {feature.icon}
            <p>{feature.label}</p>
            <span>{feature.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
