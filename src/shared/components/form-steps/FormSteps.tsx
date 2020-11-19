import React, { memo } from 'react';

import { Form } from 'utils';

import { Steps } from 'ui';

namespace FormSteps {
  export interface Props {
    formManagers: Form.Manager[];
    steps: Steps.Item[];
  }
}

const decorateSteps = (formManagers: Form.Manager[], steps: Steps.Item[]): Steps.Item[] => {
  const getStatus = ([{ dirty, invalid }]: Form.Manager): boolean | undefined => (dirty ? !invalid : undefined);

  const getProgress = ([{ fields }]: Form.Manager) => {
    const validFieldsCount = fields.filter((f) => !f.error).length;
    return (validFieldsCount / fields.length) * 100;
  };

  return steps.map(
    (s, idx) => ({
      ...s,
      status: getStatus(formManagers[idx]),
      progress: getProgress(formManagers[idx]),
    } as Steps.Item),
  );
};

const FormSteps = memo(
  ({ formManagers, steps }: FormSteps.Props) => {
    const decoratedSteps = decorateSteps(formManagers, steps);

    return <Steps steps={decoratedSteps} />;
  },
  (prev, next) => prev.formManagers === next.formManagers,
);

export default FormSteps;
