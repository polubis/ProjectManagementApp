import React from 'react';

import { InjectedStepperProps, StepperContentProps, injectStepProps } from '.';

export const StepperContent = ({ children, ...rest }: StepperContentProps) => {
  const injectedProps = rest as InjectedStepperProps;

  return (
    <section>
      {injectStepProps(children, injectedProps, idx => idx === injectedProps.activeIdx)}
    </section>
  );
};
