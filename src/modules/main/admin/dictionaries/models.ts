import { Technology, Pattern } from 'shared/models';

export enum DictionaryKind {
  TECHNOLOGIES = 'technologies',
  PATTERNS = 'patterns',
}

export interface RouteProps {
  kind: DictionaryKind;
}

export type Dictionary = Pattern | Technology;
