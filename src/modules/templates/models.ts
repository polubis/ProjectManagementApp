import { TemplateCategory } from 'core/api';

export interface TemplatesSearchFilters {
  limit: string;
  page: string;
  category: TemplateCategory;
  query: string;
  technologiesIds: string;
  patternsIds: string;
}

export interface TemplatesRouteProps {
  category: TemplateCategory;
}
