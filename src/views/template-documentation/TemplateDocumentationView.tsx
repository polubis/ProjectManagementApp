import React, { useState, useEffect } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExploreIcon from '@material-ui/icons/Explore';
import WarningIcon from '@material-ui/icons/Warning';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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

  const [activeSection, setActiveSection] = useState(SECTIONS_MOCKED[0].title);
  const [sections, setSections] = useState(SECTIONS_MOCKED);
  const [sectionsModified, setSectionsModified] = useState(false);

  const addNewSection = () => {
    const section: DocumentationSection = {
      icon: <ExploreIcon />,
      title: 'essa'
    };

    const combinedSections = [
      ...sections,
      section
    ]

    setSections(combinedSections);
    setSectionsModified(!sectionsModified);
  };

  const addNewSubSection = (sectionIndex: number) => {
    const combinedSections = sections;
    const dummySection = sections[sectionIndex];

    dummySection.subSection.push('subSection');

    combinedSections[sectionIndex] = dummySection;

    setSections(combinedSections);
    setSectionsModified(!sectionsModified);
  }

  useEffect(() => {
  }, [sectionsModified]);

  const mapSection = (section: DocumentationSection[]) => {
    const mappedSection = section.map((value, index) => {
      if (value.subSection)
        return (
          <li className={csx.listElement} key={value.title}>
            <span
              className={activeSection === value.title ? csx.active : null}
              onClick={() => setActiveSection(value.title)}
            >
              {value.icon}
              {value.title}
            </span>
            <ul className={csx.nestedList}>
              {value.subSection.map((value) => (
                <li>{value}</li>
              ))}
            </ul>
            <span className={csx.listElement} onClick={() => addNewSubSection(index)}>
              <span>
                <AddCircleOutlineIcon /> ADD SUBSECTION
              </span>
            </span>
          </li>
        );

      return (
        <li className={csx.listElement} key={value.title}>
          <span
            className={activeSection === value.title ? csx.active : null}
            onClick={() => setActiveSection(value.title)}
          >
            {value.icon}
            {value.title}
          </span>
        </li>
      );
    });

    mappedSection.push(
      <li className={csx.listElement} onClick={addNewSection}>
        <span>
          <AddCircleOutlineIcon /> ADD SECTION
        </span>
      </li>
    );

    return mappedSection;
  };

  return (
    <div className={csx.sectionContainer}>
      <ul className={csx.sectionList}>{mapSection(sections)}</ul>
    </div>
  );
};

export default TemplateDocumentationView;
