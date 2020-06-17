import { FormConfig } from 'shared/forms';

import { StepStatus } from 'shared/ui';

import { AddTemplatePayload } from 'api';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: StepStatus;
}[];

export interface UseTemplateManagementState {
  pending: boolean;
  error: '';
  result: null | string;
}

export type UseTemplateManagement = [
  UseTemplateManagementState,
  (payload: AddTemplatePayload) => void
];
