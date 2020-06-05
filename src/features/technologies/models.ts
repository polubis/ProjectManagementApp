import { Technology } from 'api';

export interface TechnologiesProviderProps {
  children: React.ReactNode;
}

export interface TechnologiesProviderState {
  isLoading: boolean;
  error: string;
  technologies: Technology[];
}
