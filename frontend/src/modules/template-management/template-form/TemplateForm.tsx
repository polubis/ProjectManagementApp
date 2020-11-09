import React, { useState, useCallback, useMemo } from 'react';

import { Loader, StepHeader, Steps } from 'ui';

import { Form } from 'utils';

import { FormSteps } from 'shared/components';

import { BasicInfo, GithubConnection, TechDetails } from './steps';

import { useTemplateManagement, BASIC_INFO, GITHUB_CONNECTION, TECH_DETAILS } from '..';

namespace TemplateForm {
  export interface Props {
    config: Form.Config[];
  }
}

const STEPS: Steps.Item[] = [
  {
    label: 'Basic information'
  },
  {
    label: 'Github connection'
  },
  {
    label: 'Technical details'
  }
];

const DESCRIPTIONS: string[] = [
  `Name your template and add a description. This information 
      will be displayed first`,
  `Connect template to github repository and set access settings`,
  `Add technical details to your newly created template`
];

const TemplateForm = ({ config }: TemplateForm.Props) => {
  const [activeStep, setActiveStep] = useState(BASIC_INFO);

  const [{ pending }, handleManagement] = useTemplateManagement();

  const basicInfoManager = Form.useManager(config[BASIC_INFO]);
  const githubConnectionManager = Form.useManager(config[GITHUB_CONNECTION]);
  const techDetailsManager = Form.useManager(config[TECH_DETAILS]);

  const formManagers = useMemo(() => {
    return [basicInfoManager, githubConnectionManager, techDetailsManager];
  }, [basicInfoManager, githubConnectionManager, techDetailsManager]);

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const [_, __, ___, submit] = formManagers[activeStep];

      const invalid = submit(e);

      if (invalid) {
        return;
      }

      const nextStep = activeStep + 1;

      if (nextStep === STEPS.length) {
        handleManagement(formManagers);
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
      <StepHeader description={DESCRIPTIONS[activeStep]} label={STEPS[activeStep].label} />

      <FormSteps steps={STEPS} formManagers={formManagers} />

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
