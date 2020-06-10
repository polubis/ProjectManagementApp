import { Technology } from 'api';

export interface TechnologiesProviderState {
  isLoading: boolean;
  error: string;
  technologies: Technology[];
}
