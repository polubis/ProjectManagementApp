import { Template, GetTemplatesPayload } from 'api';

export interface TemplatesProviderState {
  loading: boolean;
  allLoaded: boolean;
  error: string;
  templates: Template[];
  getTemplates?(payload: GetTemplatesPayload): void;
}
