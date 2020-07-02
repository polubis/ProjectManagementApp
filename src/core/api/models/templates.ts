export interface Template {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  createdDate?: Date,
  modifiedDate?: Date,
  technologies?: string[];
  patterns?: string[];
  tags?: string[];
  // Remove this part later
  watches?: number;
  stars?: number;
  mainTechnology?: {
    id: number;
    name: string;
    avatar: string;
  };
  contributors?: Contributors[]
}

export interface Contributors {
  name: string;
  avatar: string;
}

export interface AddTemplatePayload {
  name: string;
  description: string;
  githubLink: string;
  tagsIds: number[];
  patternsIds: number[];
  technologiesIds: number[];
}
