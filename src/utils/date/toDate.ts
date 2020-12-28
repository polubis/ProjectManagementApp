export const toDate = (dateAsString: string): string => {
  const date = new Date(dateAsString).toLocaleDateString();
  const time = new Date(dateAsString).toLocaleTimeString();

  return `${date} ${time}`;
};
