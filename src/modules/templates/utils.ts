import { TemplateCategory } from 'core/api';

export const PAGE = 1,
  LIMIT = 25,
  CATEGORIES: TemplateCategory[] = [
    TemplateCategory.ALL,
    TemplateCategory.RECOMMENDED,
    TemplateCategory.TOP,
    TemplateCategory.RECENT,
    TemplateCategory.YOURS
  ];
