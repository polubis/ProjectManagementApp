import { Pattern } from '.';

export const getPatterns = (): Promise<Pattern[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 0, name: 'MVP', type: 'ARCHITECTURAL' },
        { id: 1, name: 'MVVM', type: 'ARCHITECTURAL' },
        { id: 2, name: 'MVC', type: 'ARCHITECTURAL' },
        { id: 3, name: 'Micro-services', type: 'ARCHITECTURAL' },
        { id: 4, name: 'FLUX', type: 'ARCHITECTURAL' }
      ]);
    }, 3000);
  });
};
