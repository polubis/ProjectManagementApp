import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader, StepHeader, Steps } from 'ui';

import { Form } from 'utils';

import { FormSteps } from 'shared/components';

import { Credentials, PersonalInfo, Work, AlmostDone, ConfirmAccount } from './steps';

import {
  BASE_CONFIG,
  CREDENTIALS,
  PERSONAL_INFO,
  WORK,
  ALMOST_DONE,
  CONFIRM_ACCOUNT,
  useRegister
} from '..';

const DESCRIPTIONS: string[] = [
  `Choose username, email and use save password for login`,
  `Will be used for notifications and searching purposes`,
  `Describe yourself for other users`,
  `Read our policy and confirm account creation`
];

const STEPS: Steps.Item[] = [
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

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(CREDENTIALS);

  const [{ pending, created }, handleRegister] = useRegister();

  const credentialsManager = Form.useManager(BASE_CONFIG[CREDENTIALS]);
  const personalInfoManager = Form.useManager(BASE_CONFIG[PERSONAL_INFO]);
  const workManager = Form.useManager(BASE_CONFIG[WORK]);
  const almostDoneManager = Form.useManager(BASE_CONFIG[ALMOST_DONE]);

  const formManagers = useMemo(() => {
    return [credentialsManager, personalInfoManager, workManager, almostDoneManager];
  }, [credentialsManager, personalInfoManager, workManager, almostDoneManager]);

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const [_, __, ___, submit] = formManagers[activeStep];

      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const nextStep = activeStep + 1;

      if (nextStep === CONFIRM_ACCOUNT) {
        handleRegister(formManagers);
      } else {
        setActiveStep(nextStep);
      }
    },
    [...formManagers, activeStep]
  );

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, []);

  useEffect(() => {
    if (created) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  }, [created]);

  if (pending) {
    return <Loader />;
  }

  if (activeStep === CONFIRM_ACCOUNT) {
    return <ConfirmAccount />;
  }

  return (
    <>
      <StepHeader description={DESCRIPTIONS[activeStep]} label={STEPS[activeStep].label} />

      <FormSteps formManagers={formManagers} steps={STEPS} />

      {activeStep === CREDENTIALS && (
        <Credentials formManager={credentialsManager} onSubmit={handleSubmit} />
      )}

      {activeStep === PERSONAL_INFO && (
        <PersonalInfo
          formManager={personalInfoManager}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}

      {activeStep === WORK && (
        <Work formManager={workManager} onBack={handleBack} onSubmit={handleSubmit} />
      )}

      {activeStep === ALMOST_DONE && (
        <AlmostDone formManager={almostDoneManager} onBack={handleBack} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default RegisterForm;
