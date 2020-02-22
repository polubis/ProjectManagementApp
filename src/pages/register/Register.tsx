import React, { useState } from 'react';

import { REGISTER_STEPS } from '.';

import { Stepper, StepperNav, StepperContent, Title, SubTitle } from 'shared/ui';

import AuthStep from './auth-step';
import PersonalInfoStep from './personal-info-step';
import StepNavItem from './step-nav-item';

import classes from './Register.scss';

const Register = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const step = REGISTER_STEPS[activeStepIdx];

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Title>{step.title}</Title>
        <SubTitle>{step.subTitle}</SubTitle>

        <Stepper activeIdx={activeStepIdx} onStepChange={setActiveStepIdx}>
          <StepperNav>
            {REGISTER_STEPS.map((step, idx) => (
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
