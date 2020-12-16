export const createFormData = <T>(payload: T): FormData => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return formData;
};
