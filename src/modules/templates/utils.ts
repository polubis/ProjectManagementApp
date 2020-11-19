import { TemplateCategory } from 'core/api';

import { TemplatesSearchFilters } from '.';

export const PAGE = 1;

export const LIMIT = 25;

export const CATEGORIES: TemplateCategory[] = [
  TemplateCategory.ALL,
  TemplateCategory.TOP,
  TemplateCategory.RECENT,
  TemplateCategory.YOURS,
];

export const FILTERS: TemplatesSearchFilters = {
  page: `${PAGE}`,
  limit: `${LIMIT}`,
  category: TemplateCategory.ALL,
  technologiesIds: '[]',
  patternsIds: '[]',
  query: '',
};

export const isValidCategory = (category: TemplateCategory) =>
  CATEGORIES.includes(category);
