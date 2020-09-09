import { Form, V } from 'utils';

import { Select, SelectBase } from 'ui';

export const [CREDENTIALS, PERSONAL_INFO, WORK, ALMOST_DONE, CONFIRM_ACCOUNT] = [0, 1, 2, 3, 4];
export const [USERNAME, EMAIL, PASSWORD, REPEATED_PASSWORD] = [0, 1, 2, 3];
export const [FIRST_NAME, LAST_NAME, BIRTH_DATE, GENDER] = [0, 1, 2, 3];
export const [POSITION, SENIORITY, COMPANY, EXPERIENCE, TECHNOLOGIES] = [0, 1, 2, 3, 4];
export const [COMPANY_REGULATIONS, COMMERCIAL_INFO] = [0, 1];

export const GENDER_LIST: SelectBase.Item[] = [
  { dataIdx: '0', label: 'Male', value: false },
  { dataIdx: '1', label: 'Female', value: false }
];

export const SENIORITY_ITEMS: Select.Item[] = [
  { dataIdx: 0, label: 'Junior' },
  { dataIdx: 1, label: 'Mid' },
  { dataIdx: 2, label: 'Regular' },
  { dataIdx: 3, label: 'Pro' },
  { dataIdx: 4, label: 'Senior' }
];

export const EXPERIENCE_ITEMS = Array.from({ length: 30 }, (_, idx) => idx + 1).map(
  (idx) =>
    ({
      dataIdx: idx,
      label: idx !== 1 ? `${idx} years` : `${idx} year`
    } as Select.Item)
);

export const BASE_CONFIG: Form.Config[] = [
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
      value: {}
    }
  ],
  [
    {
      label: 'Position',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Seniority',
      value: {}
    },
    {
      label: 'Company',
      fns: [V.min(2), V.max(50)]
    },
    {
      label: 'Years of experience',
      value: {}
    },
    {
      label: 'Technologies',
      value: {}
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
