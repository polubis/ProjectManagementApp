import { Steps, Select } from 'ui';

import { Form, V } from 'utils';

import { TemplatePayload } from 'core/api';

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
      fns: [V.oneTruthy],
      value: {}
    },
    {
      label: 'Patterns',
      fns: [V.oneTruthy],
      value: {}
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

export const getAddPayload = ([
  basicInfoManager,
  githubConnectionManager,
  techDetailsManager
]: Form.Manager[]): TemplatePayload => {
  const [{ value: name }, { value: description }] = basicInfoManager[0].fields;
  const [{ value: githubLink }] = githubConnectionManager[0].fields;
  const technologies = techDetailsManager[0].fields[0].value;
  const patterns = techDetailsManager[0].fields[1].value;
  const tags = techDetailsManager[0].fields[2].value;

  return {
    name,
    description,
    githubLink,
    technologiesIds: Select.getChecked(technologies).map((k) => +k),
    patternsIds: Select.getChecked(patterns).map((k) => +k),
    tags
  };
};
