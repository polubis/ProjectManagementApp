import React from 'react';

import { InjectedStepProps } from 'shared/ui';

const PersonalInfoStep = ({ ...rest }) => {
  const { idx } = rest as InjectedStepProps;

  return <div>{idx}</div>;
};

export default PersonalInfoStep;
