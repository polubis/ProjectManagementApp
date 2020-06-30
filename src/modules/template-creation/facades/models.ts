import { AddTemplatePayload } from 'core/api';

export interface UseTemplateManagementState {
  pending: boolean;
  error: '';
  result: null | string;
}

export type UseTemplateManagement = [
  UseTemplateManagementState,
  (payload: AddTemplatePayload) => void
];
