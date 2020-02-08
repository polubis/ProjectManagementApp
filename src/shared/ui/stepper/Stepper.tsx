import React, { ReactElement, cloneElement, Children } from 'react';

import { InjectedStepProps, StepperProps, StepProps } from '.';

export const Stepper = ({ step, onStepChange, children }: StepperProps) => {
  const renderChildren = () => {
    if (!children || Children.count(children) % 2 !== 0) {
      return null;
    }

    const headerItems: ReactElement<StepProps>[] = [];
    const contentItems: ReactElement<StepProps>[] = [];

    Children.forEach(children, (child: ReactElement<StepProps>) => {
      if (child.props.content) {
        contentItems.push(child);
      } else {
        const idx = +child.key;

        const injectedStepProps: InjectedStepProps = {
          onStepChange,
          idx,
          isActive: idx === step
        };

        const clonedChild = cloneElement(child, {
          children: cloneElement(child.props.children, injectedStepProps)
        });

        headerItems.push(clonedChild);
      }
    });

    return (
      <>
        <nav>{headerItems}</nav>
        <section>{contentItems.filter((_, idx) => idx === step)}</section>
      </>
    );
  };

  return renderChildren();
};
