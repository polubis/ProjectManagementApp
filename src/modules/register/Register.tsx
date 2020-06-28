import React, { useCallback, useState } from 'react';

import { Steps, StepHeader } from 'ui';

import { Form } from 'utils';

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

import csx from './Register.scss';

const Register = () => {
  const [activeStep, setActiveStep] = useState(CREDENTIALS);

  const credentials = Form.useManager(config[CREDENTIALS].formConfig);
  const personalInfo = Form.useManager(config[PERSONAL_INFO].formConfig);
  const work = Form.useManager(config[WORK].formConfig);
  const almostDone = Form.useManager(config[ALMOST_DONE].formConfig);

  const { label, description } = config[activeStep];

  return (
    <div className={csx.register}>
      <StepHeader description={description} label={label} />

      <Steps items={config} />

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

export default Register;
