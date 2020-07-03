import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader, StepHeader } from 'ui';

import { Form } from 'utils';

import { FormSteps } from 'shared/components';

import { Credentials, PersonalInfo, Work, AlmostDone, ConfirmAccount } from './steps';

import { descriptions, config, steps, getRegisterPayload, useRegister } from '.';

const STEPS_COUNT = 5;

const [CREDENTIALS, PERSONAL_INFO, WORK, ALMOST_DONE, CONFIRM_ACCOUNT] = Array.from(
  { length: STEPS_COUNT },
  (_, idx) => idx
);

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(CREDENTIALS);

  const [{ pending, created }, handleRegister] = useRegister();

  const credentialsManager = Form.useManager(config[CREDENTIALS]);
  const personalInfoManager = Form.useManager(config[PERSONAL_INFO]);
  const workManager = Form.useManager(config[WORK]);
  const almostDoneManager = Form.useManager(config[ALMOST_DONE]);

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
        handleRegister(getRegisterPayload(formManagers));
      } else {
        setActiveStep(nextStep);
      }
    },
    [...formManagers, activeStep]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  useEffect(() => {
    if (created) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      <StepHeader description={descriptions[activeStep]} label={steps[activeStep].label} />

      <FormSteps formManagers={formManagers} steps={steps} />

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
