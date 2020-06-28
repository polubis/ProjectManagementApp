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
      fns: [V.req, V.oneTruthy('value', 'technology')],
      value: []
    },
    {
      label: 'Patterns',
      fns: [V.req, V.oneTruthy('value', 'pattern')],
      value: []
    },
    {
      label: 'Tags',
      value: ''
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

export const getAddPayload = (
  basicInfoManager: Form.Manager,
  githubConnectionManager: Form.Manager,
  techDetailsManager: Form.Manager
): AddTemplatePayload => {
  const [{ value: name }, { value: description }] = basicInfoManager[0].fields;
  const [{ value: githubLink }] = githubConnectionManager[0].fields;
  const technologies: Checkbox.Props[] = techDetailsManager[0].fields[0].value;

  return {
    name,
    description,
    githubLink,
    technologiesIds: technologies.filter((t) => t.value).map((t) => +t.dataId),
    patternsIds: [],
    tagsIds: []
  };
};

export const decorateSteps = (formManagers: Form.Manager[]): Steps.Item[] => {
  const getStatus = ([{ dirty, invalid }]: Form.Manager): boolean | undefined => {
    return dirty ? !invalid : undefined;
  };

  const getProgress = ([{ fields }]: Form.Manager) => {
    const validFieldsCount = fields.filter((f) => !f.error).length;
    return (validFieldsCount / fields.length) * 100;
  };

  return steps.map(
    (s, idx) =>
      ({
        ...s,
        status: getStatus(formManagers[idx]),
        progress: getProgress(formManagers[idx])
      } as Steps.Item)
  );
};
