import React, { useState } from 'react';

import { REGISTER_STEPS } from '.';

import { Stepper, Step, Title, SubTitle, Input } from 'shared/ui';

import classes from './Register.scss';
import RegisterStepNavItem from './register-step-nav-item/RegisterStepNavItem';

const Register = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const step = REGISTER_STEPS[activeStepIdx];

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Title>{step.title}</Title>
        <SubTitle>{step.subTitle}</SubTitle>

        <Stepper step={activeStepIdx} onStepChange={setActiveStepIdx}>
          {REGISTER_STEPS.map((step, idx) => (
            <Step key={idx}>
              <RegisterStepNavItem step={step} />
            </Step>
          ))}
          <Step content>
            <div>
              {' '}
              <Input placeholder="siema..." />
            </div>
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
