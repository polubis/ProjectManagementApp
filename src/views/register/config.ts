import { V } from 'utils';

import { Checkbox } from 'ui';

import { RegisterConfig } from '.';

export const STEPS_COUNT = 4;

export const [CREDENTIALS, PERSONAL_INFO, WORK, ALMOST_DONE] = Array.from(
  { length: STEPS_COUNT },
  (_, idx) => idx
);

export const config: RegisterConfig = [
  {
    label: 'Email & Password',
    description: `Make sure your password is secure`,
    formConfig: [
      { label: 'Email', fns: [V.req] },
      {
        label: 'Password',
        fns: [V.req, V.min(4), V.max(20)]
      },
      {
        label: 'Repeated password',
        fns: [V.req, V.min(4), V.max(20)]
      }
    ]
  },
  {
    label: 'Personal informations',
    description: `Will be used for notifications and searching purposes`,
    formConfig: [
      {
        label: 'First name',
        fns: [V.req, V.min(4), V.max(20)]
      },
      {
        label: 'Last name',
        fns: [V.req, V.min(4), V.max(20)]
      },
      {
        label: 'Date of birth',
        fns: [V.date]
      },
      {
        label: 'Gender',
        value: [
          { dataId: 0, label: 'Male', value: false },
          { dataId: 1, label: 'Female', value: false }
        ] as Checkbox.Props[]
      }
    ]
  },
  {
    label: 'Work & Company',
    description: `Describe yourself for other users`,
    formConfig: [
      {
        label: 'Position',
        value: []
      },
      {
        label: 'Seniority',
        value: []
      },
      {
        label: 'Company'
      },
      {
        label: 'Years of experience'
      },
      {
        label: 'Technologies',
        value: []
      }
    ]
  },
  {
    label: 'Almost done!',
    description: `Read our policy and confirm account creation`,
    formConfig: [
      {
        label: 'Company regulations',
        value: false
      },
      {
        label: 'Email notification',
        value: false
      }
    ]
  }
];
