import { AddTemplatePayload } from 'api';

export interface UseTemplateManagementState {
  pending: boolean;
  error: '';
  result: null | string;
}

export type UseTemplateManagement = [
  UseTemplateManagementState,
  (payload: AddTemplatePayload) => void
];
