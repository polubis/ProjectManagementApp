import { TemplatesCategories } from 'core/api';

export interface TemplatesSearchFilters {
  limit: string;
  page: string;
  category: TemplatesCategories;
  query: string;
  technologiesIds: string;
  patternsIds: string;
}
