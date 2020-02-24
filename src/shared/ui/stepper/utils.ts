import { ReactElement, Children, cloneElement } from 'react';

import { InjectedStepperProps, InjectedStepProps } from '.';

export const injectStepProps = (
  children: ReactElement[],
  { activeIdx, onStepChange }: InjectedStepperProps,
  isInjectable: (idx: number) => boolean = () => true
) => {
  if (!children) {
    return null;
  }

  const items: ReactElement[] = [];

  Children.forEach(children, (child, idx) => {
    if (!isInjectable(idx)) {
      return;
    }

    const injectedProps: InjectedStepProps = {
      idx,
      isActive: idx === activeIdx,
      onStepChange
    };

    const clonedChild = cloneElement(child, { key: idx, ...injectedProps });

    items.push(clonedChild);
  });

  return items;
};
