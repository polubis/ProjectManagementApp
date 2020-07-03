import React, { useState, useCallback, useMemo } from 'react';

import { CircularProgress } from '@material-ui/core';

import { Steps, StepHeader } from 'ui';

import { Form } from 'utils';

import {
  config,
  descriptions,
  steps,
  getAddPayload,
  decorateSteps,
  useTemplateManagement
} from '.';

import { BasicInfo, GithubConnection, TechDetails } from './steps';

import csx from './TemplateForm.scss';

const STEPS_COUNT = 3;

const [BASIC_INFO, GITHUB_CONNECTION, TECH_DETAILS] = Array.from(
  { length: STEPS_COUNT },
  (_, idx) => idx
);

const TemplateForm = () => {
  const [activeStep, setActiveStep] = useState(BASIC_INFO);

  const basicInfoManager = Form.useManager(config[BASIC_INFO]);
  const githubConnectionManager = Form.useManager(config[GITHUB_CONNECTION]);
  const techDetailsManager = Form.useManager(config[TECH_DETAILS]);

  const [{ pending }, addTemplate] = useTemplateManagement();

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
        addTemplate(getAddPayload(basicInfoManager, githubConnectionManager, techDetailsManager));
      } else {
        setActiveStep(nextStep);
      }
    },
    [...formManagers, activeStep]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const decoratedSteps = useMemo(() => decorateSteps(formManagers), [formManagers]);

  return pending ? (
    <CircularProgress className={csx.loader} />
  ) : (
    <>
      <StepHeader description={descriptions[activeStep]} label={steps[activeStep].label} />

      <Steps items={decoratedSteps} />

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
