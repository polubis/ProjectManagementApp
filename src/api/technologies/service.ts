import { Technology } from '.';

export const getTechnologies = (): Promise<Technology[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 0, name: 'React' },
        { id: 1, name: 'Angular' },
        { id: 2, name: 'AngularJS' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'Vue' }
      ]);
    }, 3000);
  });
};
