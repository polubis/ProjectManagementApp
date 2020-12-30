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

export interface ForkTemplatePayload {
  templateId: string;
}

export interface TemplateDocumentationHeading {
  childrenCount: number;
  id: number;
  parentId: number;
  text: string;
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
