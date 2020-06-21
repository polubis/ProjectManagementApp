export const throttle = (func: Function, delay: number) => {
  let timeout = null;

  return (...args: any[]) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args);
        timeout = null;
      }, delay);
    }
  };
};
