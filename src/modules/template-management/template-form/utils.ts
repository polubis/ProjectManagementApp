import { Steps, Checkbox } from 'ui';

import { Form, V } from 'utils';

import { AddTemplatePayload } from 'core/api';

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

export const getAddPayload = ([
  basicInfoManager,
  githubConnectionManager,
  techDetailsManager
]: Form.Manager[]): AddTemplatePayload => {
  const [{ value: name }, { value: description }] = basicInfoManager[0].fields;
  const [{ value: githubLink }] = githubConnectionManager[0].fields;
  const [_, __, { value: tags }] = techDetailsManager[0].fields;
  const technologies: Checkbox.Props[] = techDetailsManager[0].fields[0].value;
  const patterns: Checkbox.Props[] = techDetailsManager[0].fields[1].value;

  return {
    name,
    description,
    githubLink,
    technologiesIds: technologies.filter((t) => t.value).map((t) => +t.dataIdx),
    patternsIds: patterns.filter((p) => p.value).map((t) => +t.dataIdx),
    tags
  };
};
