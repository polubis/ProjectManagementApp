import { Form, V } from 'utils';

export const [BASIC_INFO, GITHUB_CONNECTION, TECH_DETAILS] = [0, 1, 2];
export const [NAME, DESCRIPTION] = [0, 1];
export const [GITHUB_LINK, PUBLIC_ACCESS, PRIVATE_ACCESS] = [0, 1, 2];
export const [TECHNOLOGIES, PATTERNS, TAGS] = [0, 1, 2];

export const BASE_CONFIG: Form.Config[] = [
  [
    { label: 'Name', fns: [V.req, V.min(2), V.max(50)] },
    {
      label: 'Description',
      fns: [V.req, V.min(20), V.max(5000)],
    },
  ],
  [
    {
      label: 'Repository link',
      fns: [V.req, V.githubUrl],
    },
    {
      label: 'Public access',
      value: true,
    },
    {
      label: 'Private access',
      value: false,
    },
  ],
  [
    {
      label: 'Technologies',
      fns: [V.oneTruthy],
      value: {},
    },
    {
      label: 'Patterns',
      fns: [V.oneTruthy],
      value: {},
    },
    {
      label: 'Tags',
      fns: [V.req],
      value: [],
    },
  ],
];
