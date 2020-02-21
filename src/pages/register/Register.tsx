import React, { useState } from 'react';

import { REGISTER_STEPS } from '.';

import { Stepper, Step, Title, SubTitle } from 'shared/ui';

import StepNavItem from './step-nav-item';
import AuthStep from './auth-step';

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
          {REGISTER_STEPS.map((step, idx) => (
            <Step key={idx}>
              <StepNavItem step={step} />
            </Step>
          ))}
          <Step content>
            <AuthStep />
          </Step>
          <Step content>
            <div>{`Content 1`}</div>
          </Step>
          <Step content>
            <div>{`Content 2`}</div>
          </Step>
          <Step content>
            <div>{`Content 3`}</div>
          </Step>
        </Stepper>
      </div>
    </main>
  );
};

export default Register;
