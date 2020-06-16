import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useForm, FormSubmitEvent } from 'shared/forms';

import { Steps, StepHeader, CheckboxProps } from 'shared/ui';

import {
  BasicInfo,
  GithubConnection,
  TechnologiesOverview,
  config,
  createSteps,
  BASIC_INFO,
  GITHUB_CONNECTION,
  TECHNOLOGIES_OVERVIEW,
  STEPS_COUNT,
  useTemplateManagement
} from '.';

import csx from './TemplateCreationView.scss';

// TODO IN FREE TIME RENAME THIS COMPONENT TO TEMPLATE MANAGEMENT VIEW
const TemplateCreationView = () => {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(BASIC_INFO);

  const [state, add] = useTemplateManagement();

  const basicInfo = useForm(config[BASIC_INFO].formConfig);
  const githubConnection = useForm(config[GITHUB_CONNECTION].formConfig);
  const technologiesOverview = useForm(config[TECHNOLOGIES_OVERVIEW].formConfig);

  const formManagers = useMemo(() => {
    return [basicInfo, githubConnection, technologiesOverview];
  }, [basicInfo, githubConnection, technologiesOverview]);

  const changeStep = useCallback(
    (stepValue: number, e?: FormSubmitEvent) => {
      const activeStepInvalid = formManagers[activeStep][3](e);

      if (stepValue > activeStep && activeStepInvalid) {
        return;
      }

      const calculateNextStep = () => {
        const ALLOWED_DISTANCE = 1;

        if (stepValue - activeStep > ALLOWED_DISTANCE) {
          for (let i = activeStep + ALLOWED_DISTANCE; i < STEPS_COUNT - ALLOWED_DISTANCE; i++) {
            const stepInvalid = formManagers[i][3](e);

            if (stepInvalid) {
              return i;
            }
          }
        }

        return stepValue;
      };

      const nextStep = calculateNextStep();

      if (nextStep <= formManagers.length - 1) {
        setActiveStep(nextStep);
      } else {
        const [{ value: name }, { value: description }] = basicInfo[0].fields;
        const [{ value: githubLink }] = githubConnection[0].fields;
        const technologies: CheckboxProps[] = technologiesOverview[0].fields[0].value;

        add({
          name,
          description,
          githubLink,
          technologiesIds: technologies.filter((t) => t.value).map((t) => +t.dataId),
          patternsIds: [],
          tagsIds: []
        });
      }
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

  useEffect(() => {
    if (state.result !== null) {
      history.replace(`/app/templates/all/${state.result}`);
    }
  }, [state.result]);

  const steps = useMemo(() => createSteps(config, formManagers), formManagers);

  const { label, description } = config[activeStep];

  return (
    <div className={csx.templateCreationView}>
      <StepHeader description={description} label={label} />

      <Steps steps={steps} onChange={onStepChange} />

      {activeStep === BASIC_INFO && <BasicInfo formManager={basicInfo} onSubmit={onStepSubmit} />}

      {activeStep === GITHUB_CONNECTION && (
        <GithubConnection formManager={githubConnection} onSubmit={onStepSubmit} />
      )}

      {activeStep === TECHNOLOGIES_OVERVIEW && (
        <TechnologiesOverview
          pending={state.pending}
          formManager={technologiesOverview}
          onSubmit={onStepSubmit}
        />
      )}
    </div>
  );
};

export default TemplateCreationView;
