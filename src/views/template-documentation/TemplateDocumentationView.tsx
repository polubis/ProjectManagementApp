import React, { useState, useReducer } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExploreIcon from '@material-ui/icons/Explore';
import WarningIcon from '@material-ui/icons/Warning';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Button } from 'ui';

import { DocumentationSection } from './models';

import { sectionsReducer } from './useSectionsReducer';

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
    title: 'Setup & Installation',
    icon: <PowerSettingsNewIcon />
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
  
  const [activeSection, setActiveSection] = useState(0);
  const [sections, sectionsDispatcher] = useReducer(sectionsReducer, SECTIONS_MOCKED);

  const mapSection = (section: DocumentationSection[]) => {
    const mappedSection = section.map((value, idx) => {
      if (value.subSection)
        return (
          <li className={csx.listElement} key={value.title} data-idx={idx}>
            <span
              className={`${activeSection === idx ? csx.active : ''}`}
              onClick={() => setActiveSection(idx)}
            >
              {value.icon}
              {value.title}
            </span>

            <ul className={csx.nestedList}>
              {value.subSection.map((value) => (
                <li>{value}</li>
              ))}
            </ul>

            <span className={csx.listElement} onClick={() => sectionsDispatcher({type: 'addSubSection', sectionIndex: idx})}>
              <span>
                <AddCircleOutlineIcon /> ADD SUBSECTION
              </span>
            </span>
          </li>
        );

      return (
        <li className={csx.listElement} key={value.title} data-idx={idx}>
          <span
            className={`${activeSection === idx ? csx.active : ''}`}
            onClick={() => setActiveSection(idx)}
          >
            {value.icon}
            {value.title}
          </span>
        </li>
      );
    });

    mappedSection.push(
      <li className={csx.listElement} onClick={() => sectionsDispatcher({type: 'addMainSection'})}>
        <span>
          <AddCircleOutlineIcon /> ADD SECTION
        </span>
      </li>
    );

    return mappedSection;
  };

  return (
    <div className={csx.templateDocumentationView}>
      <ul className={csx.sectionList}>{mapSection(sections)}</ul>
      <Button variant="icon" className={csx.button}>
        <ChevronLeftIcon />
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default TemplateDocumentationView;
