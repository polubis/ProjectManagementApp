import React, { useState } from 'react';

import { Button, Field, Steps, StepClickEvent } from 'shared/ui';
import { useForm, FormSubmitEvent } from 'shared/forms';

import { templateCreationSteps } from '.';

import csx from './TemplateCreationView.scss';

const TemplateCreationView = () => {
  const [state, change, submit] = useForm(templateCreationSteps[0].formConfig);

  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (e: StepClickEvent) => {
    setActiveStep(+e.currentTarget.getAttribute('data-idx'));
  };

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { label, description, formConfig } = templateCreationSteps[activeStep];

  return (
    <div className={csx.templateCreationView}>
      <h5 className={csx.stepTitle}>{label}</h5>
      <span className={csx.stepDescription}>{description}</span>
      <Steps steps={templateCreationSteps} activeStep={activeStep} onStepClick={handleStepChange} />

      <form onSubmit={handleSubmit}>
        {formConfig.map((config, idx) => (
          <Field
            key={idx}
            data-idx={idx}
            label={config.label}
            placeholder={config.placeholder}
            error={state.isDirty && state.fields[idx].error}
            onChange={change}
          />
        ))}

        <Button type="submit" disabled={state.isDirty && state.isInvalid}>
          NEXT
        </Button>
      </form>
    </div>
  );
};

export default TemplateCreationView;
