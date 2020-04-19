import React from 'react';

import { DocumentationSection } from './models';

import ExploreIcon from '@material-ui/icons/Explore';

export const sectionsReducer = (state: DocumentationSection[], action: {type: string, sectionIndex?: number}) => {
  let combinedSections = [];

  switch (action.type) {
    case 'addMainSection':
      const section: DocumentationSection = {
        icon: <ExploreIcon />,
        title: 'siema'
      };

      combinedSections = [...state, section];

      return combinedSections;

    case 'addSubSection':
      combinedSections = [...state];
      const newSubSections = { ...state[action.sectionIndex] };

      newSubSections.subSection.push('subSection');

      combinedSections[action.sectionIndex] = newSubSections;

      return combinedSections;

    default:
      return state;
  }
};