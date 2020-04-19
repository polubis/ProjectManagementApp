import { req, min, max, url, atleastOneChecked } from 'shared/forms';

import { TemplateCreationStepConfig } from '.';

export const stepsConfig: TemplateCreationStepConfig[] = [
  {
    label: 'Basic information',
    description: `Name your template and add a description. This information 
    will be displayed first.`,
    formConfig: [
      { label: 'Name', validators: [req, min(2), max(50)] },
      {
        label: 'Description',
        validators: [req, min(20), max(5000)]
      }
    ]
  },
  {
    label: 'Github connection',
    description: `Connect template to github repository and set access settings.`,
    formConfig: [
      {
        label: 'Repository link',
        validators: [req, url]
      },
      {
        label: 'Public access',
        value: true
      },
      {
        label: 'Private access',
        value: false
      }
    ]
  },
  {
    label: 'Technologies overview',
    description: `Choose technologies and patterns. Users will search by these
    settings.`,
    formConfig: [
      {
        label: 'Technologies',
        validators: [req, atleastOneChecked('value', 'technology')],
        value: []
      },
      {
        label: 'Patterns',
        validators: [req, atleastOneChecked('value', 'pattern')],
        value: []
      },
      {
        label: 'Tags',
        validators: [],
        value: ''
      }
    ]
  }
];
