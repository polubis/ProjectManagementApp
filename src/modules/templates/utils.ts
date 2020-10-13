import { TemplateCategory } from 'core/api';

import { TemplatesSearchFilters } from '.';

export const PAGE = 1,
  LIMIT = 25,
  CATEGORIES: TemplateCategory[] = [
    TemplateCategory.ALL,
    TemplateCategory.TOP,
    TemplateCategory.RECENT,
    TemplateCategory.YOURS
  ],
  FILTERS: TemplatesSearchFilters = {
    page: '' + PAGE,
    limit: '' + LIMIT,
    category: TemplateCategory.ALL,
    technologiesIds: '[]',
    patternsIds: '[]',
    query: ''
  };

export const isValidCategory = (category: TemplateCategory) => CATEGORIES.includes(category);
