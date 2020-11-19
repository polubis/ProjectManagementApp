import { Technology, Pattern } from 'core/api';

export enum DictionaryKind {
  TECHNOLOGIES = 'technologies',
  PATTERNS = 'patterns',
}

export interface RouteProps {
  kind: DictionaryKind;
}

export type Dictionary = Pattern | Technology;
