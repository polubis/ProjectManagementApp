import { useState } from 'react';

import { Form } from 'utils';

import { register, RegisterPayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  created: boolean;
}

type Return = [State, (formManagers: Form.Manager[]) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  created: false
};

const makePayload = ([
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

  const [
    { value: firstName },
    { value: lastName },
    { value: birthDate },
    { value: sex }
  ] = personalInfoManager[0].fields;

  const [
    { value: position },
    { value: seniority },
    { value: company },
    { value: yearsOfExperience },
    { value: technologiesIds }
  ] = workManager[0].fields;

  const [{ value: companyRegulations }, { value: commercialInfo }] = almostDoneManager[0].fields;

  return {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    birthDate,
    sex,
    position,
    seniority,
    company,
    yearsOfExperience,
    technologiesIds,
    companyRegulations,
    commercialInfo
  };
};

export const useRegister = (): Return => {
  const [state, setState] = useState(STATE);

  const handleRegister = async (formManagers: Form.Manager[]) => {
    setState({ ...STATE, pending: true });

    try {
      await register(makePayload(formManagers));
      console.log(formManagers);

      setState({ ...STATE, created: true });
    } catch (error) {
      setState({ ...STATE, error });
    }
  };

  return [state, handleRegister];
};
