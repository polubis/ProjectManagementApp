import React, { cloneElement, Children, ReactElement } from 'react';

import {
  InjectedStepperProps,
  StepperProps,
  StepperNavProps,
  StepperContentProps,
  injectStepProps
} from '.';

const Stepper = ({ activeIdx, onStepChange, children }: StepperProps) => {
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

const StepperNav = ({ children, ...rest }: StepperNavProps) => {
  return <nav>{injectStepProps(children, rest as InjectedStepperProps)}</nav>;
};

const StepperContent = ({ children, ...rest }: StepperContentProps) => {
  const injectedProps = rest as InjectedStepperProps;

  return (
    <section>
      {injectStepProps(children, injectedProps, idx => idx === injectedProps.activeIdx)}
    </section>
  );
};

export { Stepper, StepperNav, StepperContent };
