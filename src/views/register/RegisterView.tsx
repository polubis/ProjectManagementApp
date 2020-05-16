import React, { useCallback, useState } from 'react';

import { Steps, StepHeader } from 'shared/ui';

import { useForm } from 'shared/forms';

import { CREDENTIALS, PERSONAL_INFO, Credentials, PersonalInfo, config } from '.';

import csx from './RegisterView.scss';

const RegisterView = () => {
  const [activeStep, setActiveStep] = useState(CREDENTIALS);

  const credentials = useForm(config[CREDENTIALS].formConfig);
  const personalInfo = useForm(config[PERSONAL_INFO].formConfig);

  const onStepChange = useCallback(
    (step: number) => {
      // changeStep(step);
      setActiveStep(step);
    },
    [activeStep]
  );

  const { label, description } = config[activeStep];

  return (
    <div className={csx.registerView}>
      <StepHeader label={label} description={description} />

      <Steps steps={config} onChange={onStepChange} />

      {activeStep === CREDENTIALS && <Credentials onSubmit={() => {}} formManager={credentials} />}

      {activeStep === PERSONAL_INFO && (
        <PersonalInfo onSubmit={() => {}} formManager={personalInfo} />
      )}
    </div>
  );
};

export default RegisterView;
