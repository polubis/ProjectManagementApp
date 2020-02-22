import React, { cloneElement, Children, ReactElement } from 'react';

import { InjectedStepperProps, StepperProps } from '.';

export const Stepper = ({ activeIdx, onStepChange, children }: StepperProps) => {
  if (!children || Children.count(children) !== 2) {
    return null;
  }

  const content: ReactElement[] = [];

  Children.forEach(children, (child, idx) => {
    const injectedProps: InjectedStepperProps = {
      onStepChange,
      activeIdx
    };

    content.push(cloneElement(child, { key: idx, ...injectedProps }));
  });

  return <>{content}</>;
};
