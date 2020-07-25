export const convertDate = (value: string): string => {
  const date = new Date(value);

  const converted = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };

  return `${converted.year}/${converted.month < 10 ? '0' + converted.month : converted.month}/${
    converted.day < 10 ? '0' + converted.day : converted.day
  }`;
};