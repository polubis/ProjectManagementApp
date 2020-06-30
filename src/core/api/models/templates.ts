export interface Template {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  technologies?: string[];
  patterns?: string[];
  // Remove this part later
  views?: number;
  stars?: number;
  mainTechnology?: {
    id: number;
    name: string;
    avatar: string;
  };
  authors?: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

export interface AddTemplatePayload {
  name: string;
  description: string;
  githubLink: string;
  tagsIds: number[];
  patternsIds: number[];
  technologiesIds: number[];
}
