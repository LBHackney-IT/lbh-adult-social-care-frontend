export function getFormData (object, existingFormData, arrayKey) {
  const formData = existingFormData || new FormData();
  Object.keys(object).forEach((key) => {
    if (!object[key]) return;
    formData.append(arrayKey ? `${arrayKey}.${key}` : key, object[key]);
  });
  return formData;
}
