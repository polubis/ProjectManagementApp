import React from 'react';

import { StepProps } from '.';

export const Step = ({ children }: StepProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48">
      {children}
    </svg>
  );
};
