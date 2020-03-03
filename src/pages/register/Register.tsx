import React, { useState, useCallback, useEffect } from 'react';

import { registerStepsConfig } from '.';

import { Stepper, StepperNav, StepperContent, Text } from 'shared/ui';

import AuthStep from './auth-step';
import StepNavItem from './step-nav-item';
import { withLazy } from 'shared/utils';

import classes from './Register.scss';

const PersonalInfoStep = withLazy(() => import('./personal-info-step'));

const steps = [{ preload: void 0 }, PersonalInfoStep];

const Register = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStep = registerStepsConfig[activeStepIdx];

  const handleStepChange = useCallback((stepIdx: number) => {
    setActiveStepIdx(stepIdx);
    steps[stepIdx].preload();
  }, []);

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Text variant="heading">{activeStep.headingText}</Text>
        <Text variant="subHeading">{activeStep.subHeadingText}</Text>

        <Stepper activeIdx={activeStepIdx} onStepChange={handleStepChange}>
          <StepperNav>
            {registerStepsConfig.map((step, idx) => (
              <StepNavItem key={idx} step={step} />
            ))}
          </StepperNav>
          <StepperContent>
            <AuthStep />
            <PersonalInfoStep />
          </StepperContent>
        </Stepper>
      </div>
    </main>
  );
};

export default Register;
