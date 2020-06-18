import React, { memo } from 'react';

import csx from './StepHeader.scss';

namespace StepHeader {
  export interface Props {
    label: string;
    description: string;
  }
}

export const StepHeader = memo(({ label, description }: StepHeader.Props) => {
  return (
    <header className={csx.stepHeader}>
      <h5 className={csx.title}>{label}</h5>
      <span className={csx.description}>{description}</span>
    </header>
  );
});
