export interface Template {
  id: number;
  name: string;
  description: string;
  views: number;
  stars: number;
  mainTechnology: {
    id: number;
    name: string;
    avatar: string;
  };
  authors: {
    id: number;
    name: string;
    avatar: string;
  }[];
}
