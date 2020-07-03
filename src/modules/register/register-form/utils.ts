import { Steps, Checkbox } from 'ui';

import { Form, V } from 'utils';

import { RegisterPayload } from 'core/api';

const MAX_YEARS_OF_EXP = 30;

const [_, __, PASSWORD, REPEATED_PASSWORD] = [0, 1, 2, 3];

export const config: Form.Config[] = [
  [
    { label: 'Username', fns: [V.req, V.min(2), V.max(50)] },
    { label: 'Email', fns: [V.req, V.email] },
    {
      label: 'Password',
      fns: [V.req, V.min(2), V.max(50), V.sameAs(REPEATED_PASSWORD, 'repeated password')]
    },
    {
      label: 'Repeated password',
      fns: [V.req, V.min(2), V.max(50), V.sameAs(PASSWORD, 'password')]
    }
  ],
  [
    {
      label: 'First name',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Last name',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Date of birth',
      fns: [V.date()]
    },
    {
      label: 'Gender',
      value: [
        { dataIdx: 0, label: 'Male', value: false },
        { dataIdx: 1, label: 'Female', value: false }
      ] as Checkbox.Props[]
    }
  ],
  [
    {
      label: 'Position',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Seniority',
      value: [
        { dataIdx: 0, label: 'Junior', value: false },
        { dataIdx: 1, label: 'Mid', value: false },
        { dataIdx: 2, label: 'Regular', value: false },
        { dataIdx: 3, label: 'Pro', value: false },
        { dataIdx: 4, label: 'Senior', value: false }
      ] as Checkbox.Props[]
    },
    {
      label: 'Company',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Years of experience',
      value: Array.from({ length: MAX_YEARS_OF_EXP }, (_, idx) => idx + 1).map(
        (idx) =>
          ({
            dataIdx: idx,
            label: idx !== 1 ? `${idx} years` : `${idx} year`,
            value: false
          } as Checkbox.Props)
      )
    },
    {
      label: 'Technologies',
      value: []
    }
  ],
  [
    {
      label: 'Company regulations',
      value: false
    },
    {
      label: 'Commercial info',
      value: false
    }
  ]
];

export const descriptions: string[] = [
  `Choose username, email and use save password for login`,
  `Will be used for notifications and searching purposes`,
  `Describe yourself for other users`,
  `Read our policy and confirm account creation`
];

export const steps: Steps.Item[] = [
  {
    label: 'Account setup'
  },
  {
    label: 'Personal informations'
  },
  {
    label: 'Work & Company'
  },
  { label: 'Almost done!' }
];

export const getRegisterPayload = ([
  credentialsManager,
  personalInfoManager,
  workManager,
  almostDoneManager
]: Form.Manager[]): RegisterPayload => {
  const [
    { value: username },
    { value: email },
    { value: password },
    { value: confirmPassword }
  ] = credentialsManager[0].fields;

  const [{ value: firstName }, { value: lastName }] = personalInfoManager[0].fields;

  return {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  };
};
