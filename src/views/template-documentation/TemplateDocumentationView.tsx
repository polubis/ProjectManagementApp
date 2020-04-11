import React, { useState } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExploreIcon from '@material-ui/icons/Explore';
import WarningIcon from '@material-ui/icons/Warning';

import { DocumentationSection } from './models';

import csx from './TemplateDocumentationView.scss';
const SECTIONS_MOCKED: DocumentationSection[] = [
  {
    title: 'Basic informations',
    icon: <InfoIcon />
  },
  {
    title: 'Introduction',
    icon: <MenuBookIcon />
  },
  {
    title: 'Guide',
    icon: <ExploreIcon />,
    subSection: ['Architecture', 'Design patterns', 'Components']
  },
  {
    title: 'Issues',
    icon: <WarningIcon />,
    subSection: ['Performance in tree list', 'Issue with graph painting', 'Old dependencies']
  }
];
const TemplateDocumentationView = () => {

  const [activeSection, setActiveSection] = useState(SECTIONS_MOCKED[0].title);


  const mapSection = (section: DocumentationSection[]) => {
    return section.map((value) => {
      if (value.subSection)
        return (
          <li className={csx.listElement}>
            <span className={activeSection === value.title ? csx.active : null} onClick={() => setActiveSection(value.title)}>
              {value.icon}
              {value.title}
            </span>
            <ul className={csx.nestedList}>
              {value.subSection.map((value) => (
                <li>{value}</li>
              ))}
            </ul>
          </li>
        );

      return (
        <li className={csx.listElement}>
          <span className={activeSection === value.title ? csx.active : null} onClick={() => setActiveSection(value.title)}>
            {value.icon}
            {value.title}
          </span>
        </li>
      );
    });
  };
  return (
    <div className={csx.sectionContainer}>
      <ul className={csx.sectionList}>{mapSection(SECTIONS_MOCKED)}</ul>
    </div>
  );
};

export default TemplateDocumentationView;
