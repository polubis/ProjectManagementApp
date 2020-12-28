export const createMock = <T extends Record<keyof T, T[keyof T]>>(data: T, length: number): T[] =>
  Array.from({ length }, (_, i) => ({ ...data, id: i }));

export const createServerCallMock = <T>(data: T, delay = 2000): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
