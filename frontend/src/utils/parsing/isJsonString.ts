export const isJsonString = (str: string) => {
  try {
    return JSON.parse(str) && !!str;
  } catch {
    return false;
  }
};
