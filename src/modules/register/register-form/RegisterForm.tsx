import React, { useCallback, useMemo, useState } from 'react';

import { Loader, StepHeader, Steps } from 'ui';

import { Form, useScrollReset } from 'utils';

import { register } from 'core/api';

import { FormSteps } from 'shared/components';

import { Credentials, Work, AlmostDone, ConfirmAccount } from './steps';

import { BASE_CONFIG, CREDENTIALS, WORK, ALMOST_DONE, CONFIRM_ACCOUNT, makePayload } from '..';

interface State {
  activeStep: number;
  pending: boolean;
}

const DESCRIPTIONS: string[] = [
  `Choose username, email and use save password for log in`,
  `Describe yourself for other users`,
  `Read our policy and confirm account creation`
];

const STEPS: Steps.Item[] = [
  {
    label: 'Account setup'
  },
  {
    label: 'Work & Company'
  },
  { label: 'Almost done!' }
];

const RegisterForm = () => {
  const [state, setState] = useState<State>({
    activeStep: CREDENTIALS,
    pending: false
  });

  const { activeStep, pending } = state;

  useScrollReset(activeStep, true);

  const credentialsManager = Form.useManager(BASE_CONFIG[CREDENTIALS]);
  const workManager = Form.useManager(BASE_CONFIG[WORK]);
  const almostDoneManager = Form.useManager(BASE_CONFIG[ALMOST_DONE]);

  const formManagers = useMemo(() => {
    return [credentialsManager, workManager, almostDoneManager];
  }, [credentialsManager, workManager, almostDoneManager]);

  const handleSubmit = useCallback(
    async (e: Form.Events.Submit) => {
      const [_, __, ___, submit] = formManagers[activeStep];

      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const nextStep = activeStep + 1;

      if (nextStep === CONFIRM_ACCOUNT) {
        setState({ activeStep, pending: true });

        try {
          await register(makePayload(formManagers));

          setState({ activeStep: nextStep, pending: false });
        } catch {
          setState({ activeStep, pending: false });
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          activeStep: nextStep
        }));
      }
    },
    [...formManagers, state]
  );

  const handleBack = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep - 1
    }));
  }, []);

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
