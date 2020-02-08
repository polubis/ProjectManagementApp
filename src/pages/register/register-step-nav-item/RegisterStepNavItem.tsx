import React from 'react';

import { RegisterStep } from '..';

import { Description, InjectedStepProps } from 'shared/ui';

import classes from './RegisterStepNavItem.scss';

interface RegisterStepNavItemProps {
  step: RegisterStep;
}

const RegisterStepNavItem = ({ step, ...rest }: RegisterStepNavItemProps) => {
  const { isActive, onStepChange, idx } = rest as InjectedStepProps;

  const rootClasses = [
    classes.root,
    isActive ? classes.active : classes.unactive
  ].join(' ');

  return (
    <div className={rootClasses}>
      <button onClick={() => onStepChange(idx)}>
        <svg width="28" height="28" viewBox="0 0 48 48">
          <path d={step.path} />
        </svg>

        <Description>{step.title}</Description>
      </button>

      {/* <span className={classes.progress} /> */}
    </div>
  );
};

export default RegisterStepNavItem;
