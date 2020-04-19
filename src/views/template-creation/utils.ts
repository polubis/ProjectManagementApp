import { UseForm } from 'shared/forms';

import { StepStatus } from 'shared/ui';

export const getStepStatus = ([{ isDirty, isInvalid }]: UseForm) => {
  return isDirty ? (isInvalid ? StepStatus.INVALID : StepStatus.VALID) : undefined;
};

export const getStepProgress = ([{ fields }]: UseForm) => {
  const validFieldsCount = fields.filter((f) => !f.error).length;
  return (validFieldsCount / fields.length) * 100;
};
