import AdminTabCategory from './admin/models';

export const shouldLoadTechnologies = (pathname: string, search: string): boolean =>
  search.length === 0
  && !pathname.includes(`/${AdminTabCategory.TECHNOLOGIES}`)
  && pathname.split('/').pop() !== 'admin';
// because of redirect from '/admin/' to 'admin/technolgies'
// because of redirect from '/templates/' to 'templates/all'

export const shouldLoadPatterns = (pathname: string, search: string): boolean =>
  search.length === 0 && !pathname.includes(`/${AdminTabCategory.PATTERNS}`);
