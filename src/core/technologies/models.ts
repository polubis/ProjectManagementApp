import { Technology } from 'api';

export interface TechnologiesProviderState {
  loading: boolean;
  error: string;
  technologies: Technology[];
}
