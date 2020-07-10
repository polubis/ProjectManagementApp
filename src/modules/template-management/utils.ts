import { Steps } from 'ui';

import { Form, V } from 'utils';

export const config: Form.Config[] = [
  [
    { label: 'Name', fns: [V.req, V.min(2), V.max(50)] },
    {
      label: 'Description',
      fns: [V.req, V.min(20), V.max(5000)]
    }
  ],
  [
    {
      label: 'Repository link',
      fns: [V.req, V.githubUrl]
    },
    {
      label: 'Public access',
      value: true
    },
    {
      label: 'Private access',
      value: false
    }
  ],
  [
    {
      label: 'Technologies',
      fns: [V.req, V.oneTruthy('value')],
      value: []
    },
    {
      label: 'Patterns',
      fns: [V.req, V.oneTruthy('value')],
      value: []
    },
    {
      label: 'Tags',
      fns: [V.req],
      value: []
    }
  ]
];

export const descriptions: string[] = [
  `Name your template and add a description. This information 
    will be displayed first`,
  `Connect template to github repository and set access settings`,
  `Add technical details to your newly created template`
];

export const steps: Steps.Item[] = [
  {
    label: 'Basic information'
  },
  {
    label: 'Github connection'
  },
  {
    label: 'Technical details'
  }
];
