import { Technology, Pattern } from '.';

export interface Template {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  addedBy: string | null;
  createdDate: string;
  modifiedDate: string;
  technologies: Technology[];
  patterns: Pattern[];
  tags: string[];
  watches: number;
  stars: number;
  contributors: Contributors[];
}

export interface Contributors {
  name: string;
  avatarUrl: string;
}

export interface TemplatePayload {
  description: string;
  githubLink: string;
  isPrivate: boolean;
  name: string;
  patternsIds: number[];
  tags: string[];
  technologiesIds: number[];
}

export enum TemplateCategory {
  ALL = 'all',
  TOP = 'top',
  RECENT = 'recent',
  YOURS = 'yours',
}

export interface TemplatesPayload {
  category: TemplateCategory;
  limit: number;
  page: number;
  patternsIds: string[];
  technologiesIds: string[];
  query: string;
}

export interface FavouriteTemplate extends Template {
  isFavourite: boolean;
}

export interface ForkTemplatePayload {
  templateId: string;
}

export interface LastAddedTemplatesParams {
  limit: number;
  page: number;
  query: string;
}
