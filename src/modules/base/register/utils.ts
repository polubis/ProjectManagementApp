import { SelectBase } from 'ui';

import { Form, V } from 'utils';

import { RegisterPayload } from 'shared/models';

export const [CREDENTIALS, WORK, ALMOST_DONE, CONFIRM_ACCOUNT] = [0, 1, 2, 3, 4];
export const [USERNAME, EMAIL, PASSWORD, REPEATED_PASSWORD] = [0, 1, 2, 3];
export const [POSITION, SENIORITY, COMPANY, EXPERIENCE, TECHNOLOGIES] = [0, 1, 2, 3, 4];
export const [COMPANY_REGULATIONS, COMMERCIAL_INFO] = [0, 1];

export const SENIORITY_ITEMS = ['Junior', 'Mid', 'Regular', 'Pro', 'Senior'];

export const EXPERIENCE_ITEMS = Array.from({ length: 30 }, (_, idx) => idx + 1).map((idx) =>
  idx !== 1 ? `${idx} years` : `${idx} year`
);

export const BASE_CONFIG: Form.Config[] = [
  [
    { label: 'Username', fns: [V.req, V.min(2), V.max(50)] },
    { label: 'Email', fns: [V.req, V.email] },
    {
      label: 'Password',
      fns: [V.req, V.min(2), V.max(50), V.sameAs(REPEATED_PASSWORD, 'repeated password')],
    },
    {
      label: 'Repeated password',
      fns: [V.req, V.min(2), V.max(50), V.sameAs(PASSWORD, 'password')],
    },
  ],
  [
    {
      label: 'Position',
      fns: [V.min(2), V.max(50)],
    },
    {
      label: 'Seniority',
      value: {},
    },
    {
      label: 'Company',
      fns: [V.min(2), V.max(50)],
    },
    {
      label: 'Years of experience',
      value: {},
    },
    {
      label: 'Technologies',
      value: {},
    },
  ],
  [
    {
      label: 'Company regulations',
      value: false,
      fns: [(v) => V.makeResult(v === false, 'Company regulations must be checked')],
    },
    {
      label: 'Commercial info',
      value: false,
    },
  ],
];

export const makePayload = ([credentialsManager, workManager]: Form.Manager[]): RegisterPayload => {
  const [
    { value: username },
    { value: email },
    { value: password },
    { value: confirmPassword },
  ] = credentialsManager[0].fields;

  const [
    { value: position },
    { value: seniority },
    { value: company },
    { value: yearsOfExperience },
    { value: technologiesIds },
  ] = workManager[0].fields;

  const [senioritySelection, yearsOfExperienceSelection, technologiesIdsSelection] = [
    SelectBase.getSelected(seniority),
    SelectBase.getSelected(yearsOfExperience),
    SelectBase.getSelected(technologiesIds),
  ];

  return {
    username,
    email,
    password,
    confirmPassword,
    position: position || undefined,
    seniority: senioritySelection.length > 0 ? +senioritySelection[0] : undefined,
    company: company || undefined,
    yearsOfExperience:
      yearsOfExperienceSelection.length > 0 ? +yearsOfExperienceSelection[0] : undefined,
    technologiesIds:
      technologiesIdsSelection.length > 0 ? technologiesIdsSelection.map((t) => +t) : undefined,
  };
};
