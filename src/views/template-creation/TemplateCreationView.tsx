import React, { useState } from 'react';

import { Steps, StepClickEvent } from 'shared/ui';

import {
  config,
  BasicInfoStep,
  GithubConnectionStep,
  TechnologiesOverviewStep,
  TemplateCreationStepProps
} from '.';

import csx from './TemplateCreationView.scss';

const steps = [
  (props: TemplateCreationStepProps) => <BasicInfoStep {...props} />,
  (props: TemplateCreationStepProps) => <GithubConnectionStep {...props} />,
  (props: TemplateCreationStepProps) => <TechnologiesOverviewStep {...props} />
];

const TemplateCreationView = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (e: StepClickEvent) => {
    setActiveStep(+e.currentTarget.getAttribute('data-idx'));
  };

  const goToNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { label, description, formConfig } = config[activeStep];

  const StepComponent = steps[activeStep];

  return (
    <div className={csx.templateCreationView}>
      <h5 className={csx.stepTitle}>{label}</h5>
      <span className={csx.stepDescription}>{description}</span>
      <Steps steps={config} activeStep={activeStep} onStepClick={handleStepChange} />
      {StepComponent({
        config: formConfig,
        onSubmit: goToNextStep
      })}
    </div>
  );
};

export default TemplateCreationView;
