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

export enum TemplateCategory {
  ALL = 'all',
  RECOMMENDED = 'recommended',
  TOP = 'top',
  RECENT = 'recent',
  YOURS = 'yours'
}

export interface TemplatesPayload {
  limit: number;
  page: number;
  category: TemplateCategory;
  query: string;
  technologiesIds: string[];
  patternsIds: string[];
}

export interface TemplatesSearchFilters {
  limit: string;
  page: string;
  category: TemplateCategory;
  query: string;
  technologiesIds: string;
  patternsIds: string;
}

export interface TemplateDocumentationHeading {
  childrenCount: number;
  id: number;
  parentId: number;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export interface TemplateDocumentationItem {
  lineItems: {
    type: string;
    content: string;
  };
  children: TemplateDocumentationItem[];
  type: null | string;
}

export interface TemplateDocumentation {
  headings: TemplateDocumentationHeading[];
  readmeLines: TemplateDocumentationItem[];
}
