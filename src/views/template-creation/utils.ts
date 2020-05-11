import { FormManager } from 'shared/forms';

import { StepStatus, Step } from 'shared/ui';

import { TemplateManagementConfig } from '.';

const getStepStatus = ([{ isDirty, isInvalid }]: FormManager) => {
  return isDirty ? (isInvalid ? StepStatus.INVALID : StepStatus.VALID) : undefined;
};

const getStepProgress = ([{ fields }]: FormManager) => {
  const validFieldsCount = fields.filter((f) => !f.error).length;
  return (validFieldsCount / fields.length) * 100;
};

export const createSteps = (
  config: TemplateManagementConfig,
  formManagers: FormManager[]
): Step[] => {
  return config.map(
    (c, idx) =>
      ({
        ...c,
        status: getStepStatus(formManagers[idx]),
        progress: getStepProgress(formManagers[idx])
      } as Step)
  );
};
