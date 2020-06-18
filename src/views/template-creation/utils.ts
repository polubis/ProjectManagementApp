import { FormManager } from 'shared/forms';

import { Steps } from 'shared/ui';

import { TemplateManagementConfig } from '.';

const getStepStatus = ([{ dirty, invalid }]: FormManager): Steps.ItemStatus | undefined => {
  return dirty ? (invalid ? 'invalid' : 'valid') : undefined;
};

const getStepProgress = ([{ fields }]: FormManager) => {
  const validFieldsCount = fields.filter((f) => !f.error).length;
  return (validFieldsCount / fields.length) * 100;
};

export const createSteps = (
  config: TemplateManagementConfig,
  formManagers: FormManager[]
): Steps.Item[] => {
  return config.map(
    (c, idx) =>
      ({
        ...c,
        status: getStepStatus(formManagers[idx]),
        progress: getStepProgress(formManagers[idx])
      } as Steps.Item)
  );
};
