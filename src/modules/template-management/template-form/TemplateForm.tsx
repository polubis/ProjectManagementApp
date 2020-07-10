import React, { useState, useCallback, useMemo } from 'react';

import { Loader, StepHeader } from 'ui';

import { Form } from 'utils';

import { FormSteps } from 'shared/components';

import { BasicInfo, GithubConnection, TechDetails } from './steps';

import { descriptions, steps, useTemplateManagement } from '..';

namespace TemplateForm {
  export interface Props {
    config: Form.Config[];
  }
}

const STEPS_COUNT = 3;

const [BASIC_INFO, GITHUB_CONNECTION, TECH_DETAILS] = Array.from(
  { length: STEPS_COUNT },
  (_, idx) => idx
);

const TemplateForm = ({ config }: TemplateForm.Props) => {
  const [activeStep, setActiveStep] = useState(BASIC_INFO);

  const [{ pending }, handleAddTemplate] = useTemplateManagement();

  const basicInfoManager = Form.useManager(config[BASIC_INFO]);
  const githubConnectionManager = Form.useManager(config[GITHUB_CONNECTION]);
  const techDetailsManager = Form.useManager(config[TECH_DETAILS]);

  const formManagers = useMemo(() => {
    return [basicInfoManager, githubConnectionManager, techDetailsManager];
  }, [basicInfoManager, githubConnectionManager, techDetailsManager]);

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const [_, __, ___, submit] = formManagers[activeStep];

      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const nextStep = activeStep + 1;

      if (nextStep === STEPS_COUNT) {
        handleAddTemplate(formManagers);
      } else {
        setActiveStep(nextStep);
      }
    },
    [...formManagers, activeStep]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  return pending ? (
    <Loader />
  ) : (
    <>
      <StepHeader description={descriptions[activeStep]} label={steps[activeStep].label} />

      <FormSteps steps={steps} formManagers={formManagers} />

      {activeStep === BASIC_INFO && (
        <BasicInfo formManager={basicInfoManager} onSubmit={handleSubmit} />
      )}

      {activeStep === GITHUB_CONNECTION && (
        <GithubConnection
          formManager={githubConnectionManager}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}

      {activeStep === TECH_DETAILS && (
        <TechDetails formManager={techDetailsManager} onBack={handleBack} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default TemplateForm;
