export function getFormData(object, existingFormData) {
  const formData = existingFormData || new FormData();
  Object.keys(object).forEach((key) => object[key] && formData.append(key, object[key]));
  return formData;
}
