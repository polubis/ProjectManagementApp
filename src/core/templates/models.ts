import { Template } from 'api';

export interface TemplatesProviderState {
  loading: boolean;
  allLoaded: boolean;
  error: string;
  templates: Template[];
  getTemplates?(page: number, query: string, merge?: boolean): void;
}
