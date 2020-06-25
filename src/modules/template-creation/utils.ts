import { Steps } from 'ui';

import { Form } from 'utils';

import { TemplateManagementConfig } from '.';

const getStepStatus = ([{ dirty, invalid }]: Form.Manager): boolean | undefined => {
  return dirty ? !invalid : undefined;
};

const getStepProgress = ([{ fields }]: Form.Manager) => {
  const validFieldsCount = fields.filter((f) => !f.error).length;
  return (validFieldsCount / fields.length) * 100;
};

export const createSteps = (
  config: TemplateManagementConfig,
  formManagers: Form.Manager[]
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
