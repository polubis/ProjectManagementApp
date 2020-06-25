import { GetTemplatesPayload } from 'api';

export interface TemplatesSearchProps {
  onSubmit(payload: Partial<GetTemplatesPayload>): void;
}
