export interface Template {
  id: number;
  name: string;
  description: string;
  githubLink: string;
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
