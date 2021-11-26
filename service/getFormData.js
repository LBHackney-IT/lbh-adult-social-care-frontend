import { dateToJson } from './helpers';

export function getFormData (object, existingFormData, arrayKey) {
  const formData = existingFormData || new FormData();
  Object.keys(object).forEach((key) => {
    if (!object[key]) return;
    formData.append(arrayKey ? `${arrayKey}.${key}` : key, getDateStringOrData(object[key]));
  });
  return formData;
}

const getDateStringOrData = (data) => dateToJson(data) || data;