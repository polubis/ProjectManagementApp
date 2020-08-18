export const distinctUntilChanged = (fn: Function) => {
  let prevArgs = [];

  return (...args: any[]) => {
    const changed = prevArgs.length > 0 ? prevArgs.every((arg, idx) => arg !== args[idx]) : true;

    prevArgs = args;

    if (changed) {
      fn(...args);
    }
  };
};
