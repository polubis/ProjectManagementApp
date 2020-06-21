import React, { useCallback, useState } from 'react';

import { Steps, StepHeader } from 'ui';

import { useForm } from 'utils';

import {
  CREDENTIALS,
  PERSONAL_INFO,
  WORK,
  ALMOST_DONE,
  Credentials,
  PersonalInfo,
  Work,
  AlmostDone,
  config
} from '.';

import csx from './RegisterView.scss';

const RegisterView = () => {
  const [activeStep, setActiveStep] = useState(CREDENTIALS);

  const credentials = useForm(config[CREDENTIALS].formConfig);
  const personalInfo = useForm(config[PERSONAL_INFO].formConfig);
  const work = useForm(config[WORK].formConfig);
  const almostDone = useForm(config[ALMOST_DONE].formConfig);

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
      <StepHeader description={description} label={label} />

      <Steps items={config} onChange={onStepChange} />

      {activeStep === CREDENTIALS && <Credentials formManager={credentials} onSubmit={() => {}} />}

      {activeStep === PERSONAL_INFO && (
        <PersonalInfo
          formManager={personalInfo}
          onBack={() => {}}
          onSkip={() => {}}
          onSubmit={() => {}}
        />
      )}

      {activeStep === WORK && (
        <Work formManager={work} onBack={() => {}} onSkip={() => {}} onSubmit={() => {}} />
      )}

      {activeStep === ALMOST_DONE && (
        <AlmostDone formManager={almostDone} onBack={() => {}} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default RegisterView;
