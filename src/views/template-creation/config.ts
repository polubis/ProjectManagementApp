import { req, min, max } from 'shared/forms';

import { TemplateCreationStep } from '.';

export const templateCreationSteps: TemplateCreationStep[] = [
  {
    label: 'Basic information',
    description: `Name your template and add a description. This information 
    will be displayed first.`,
    formConfig: [
      { label: 'Name *', placeholder: 'Type template name...', validators: [req, min(2), max(50)] },
      {
        label: 'Description *',
        placeholder: 'Add template description...',
        validators: [req, min(20), max(5000)]
      }
    ]
  },
  {
    label: 'Github connection',
    description: `Connect template to github repository and set access settings.`,
    formConfig: [
      {
        label: 'Repository link *',
        placeholder: 'Paste repository link...',
        validators: [req, min(2), max(50)]
      }
    ]
  },
  {
    label: 'Technologies overview',
    description: `Choose technologies and patterns. Users will search by these
    settings.`,
    formConfig: [
      {
        label: 'Technologies *',
        placeholder: 'Choose technologies...',
        validators: [req, min(2), max(50)]
      },
      {
        label: 'Patterns *',
        placeholder: 'Choose technologies...',
        validators: [req, min(20), max(5000)]
      },
      {
        label: 'Tags *',
        placeholder: 'Choose technologies...',
        validators: [req, min(20), max(5000)]
      }
    ]
  }
];
