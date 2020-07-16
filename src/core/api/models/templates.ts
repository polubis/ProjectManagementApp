import { Technology, Pattern } from '.';

export interface Template {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  addedBy?: string;
  createdDate?: Date;
  modifiedDate?: Date;
  technologies?: Technology[];
  patterns?: Pattern[];
  tags?: string[];
  // Remove this part later
  watches?: number;
  stars?: number;
  mainTechnology?: {
    id: number;
    name: string;
    avatar: string;
  };
  contributors?: Contributors[];
}

export interface Contributors {
  name: string;
  avatar: string;
}

export interface TemplatePayload {
  name: string;
  description: string;
  githubLink: string;
  tags: string[];
  patternsIds: number[];
  technologiesIds: number[];
}

export enum TemplatesCategories {
  ALL = 'all',
  RECOMMENDED = 'recommended',
  TOP = 'top',
  RECENT = 'recent',
  YOURS = 'yours'
}

export interface TemplatesPayload {
  limit: number;
  page: number;
  category: TemplatesCategories;
  query: string;
  technologiesIds: string[];
  patternsIds: string[];
}
