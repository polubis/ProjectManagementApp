import React from 'react';

import { InjectedStepperProps, StepperNavProps, injectStepProps } from '.';

export const StepperNav = ({ children, ...rest }: StepperNavProps) => {
  return <nav>{injectStepProps(children, rest as InjectedStepperProps)}</nav>;
};
