import React, { useState, useCallback } from 'react';

import { StepHeader, Steps } from 'shared/ui';

import { useForm, min, max } from 'shared/forms';

import { Credentials, config } from '.';

import csx from './RegisterView.scss';

const formConfig = [
  { label: 'Email', validators: [min(8), max(20)] },
  { label: 'Repeated password', validators: [min(8), max(20)] },
  { label: 'Email', validators: [min(8), max(20)] }
];

const RegisterView = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formManager = useForm(formConfig);

  const onStepChange = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const { label, description } = config[activeStep];

  return (
    <div className={csx.registerView}>
      <StepHeader label={label} description={description} />

      <Steps steps={config} onChange={onStepChange} />

      {activeStep === 0 && <Credentials formConfig={formConfig} formManager={formManager} />}

      {activeStep === 1 && <div>1</div>}

      {activeStep === 2 && <div>2</div>}

      {activeStep === 3 && <div>3</div>}
    </div>
  );
};

export default RegisterView;
