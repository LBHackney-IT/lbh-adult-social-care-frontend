export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => object[key] && formData.append(key, object[key]));
  return formData;
}
