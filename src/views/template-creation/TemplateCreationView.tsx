import React, { useState, useCallback, useMemo } from 'react';

import { useForm, FormSubmitEvent } from 'shared/forms';

import { Steps, Step } from 'shared/ui';

import {
  BasicInfoStep,
  GithubConnectionStep,
  TechnologiesOverviewStep,
  Header,
  stepsConfig,
  getStepProgress,
  getStepStatus
} from '.';

import csx from './TemplateCreationView.scss';

const TemplateCreationView = () => {
  const [activeStep, setActiveStep] = useState(0);

  const basicInfo = useForm(stepsConfig[0].formConfig);
  const githubConnection = useForm(stepsConfig[1].formConfig);
  const technologiesOverview = useForm(stepsConfig[2].formConfig);

  const formManagers = [basicInfo, githubConnection, technologiesOverview];

  const changeStep = useCallback(
    (stepValue: number, e?: FormSubmitEvent) => {
      const getNextStep = () => {
        const stepsDiff = stepValue - activeStep;

        if (stepsDiff > 1) {
          for (let i = activeStep + 1; i < formManagers.length - 1; i++) {
            const submit = formManagers[i][3];

            if (submit(e)) {
              return i;
            }
          }
        }

        return stepValue;
      };

      const submit = formManagers[activeStep][3];

      if (stepValue > activeStep && submit(e)) {
        return;
      }

      const nextStep = getNextStep();

      if (nextStep > formManagers.length - 1) {
        // AFTER BE IMPLEMENTATION ADD API CALL HERE
        return;
      }

      setActiveStep(nextStep);
    },
    [activeStep, ...formManagers]
  );

  const onStepChange = useCallback(
    (step: number) => {
      changeStep(step);
    },
    [changeStep]
  );

  const onStepSubmit = useCallback(
    (e: FormSubmitEvent) => {
      changeStep(activeStep + 1, e);
    },
    [activeStep, changeStep]
  );

  const { label, description } = stepsConfig[activeStep];

  const steps: Step[] = useMemo(
    () =>
      stepsConfig.map(
        (c, idx) =>
          ({
            ...c,
            status: getStepStatus(formManagers[idx]),
            progress: getStepProgress(formManagers[idx])
          } as Step)
      ),
    formManagers
  );

  return (
    <div className={csx.templateCreationView}>
      <Header description={description} label={label} />

      <Steps steps={steps} onChange={onStepChange} />

      {activeStep === 0 && <BasicInfoStep formManager={basicInfo} onSubmit={onStepSubmit} />}

      {activeStep === 1 && (
        <GithubConnectionStep formManager={githubConnection} onSubmit={onStepSubmit} />
      )}

      {activeStep === 2 && (
        <TechnologiesOverviewStep formManager={technologiesOverview} onSubmit={onStepSubmit} />
      )}
    </div>
  );
};

export default TemplateCreationView;
