export function getFormData ({ object, existingFormData, arrayKey, checkBoolean }) {
  const formData = existingFormData || new FormData();
  Object.keys(object).forEach((key) => {
    if (!checkBoolean && !object[key]) return;
    formData.append(arrayKey ? `${arrayKey}.${key}` : key, object[key]);
  });
  return formData;
}

export const getFormDataWithFile = (
  data,
  fileFields = {
    file: 'assessmentFile',
    fileId: 'assessmentFileId',
    fileName: 'assessmentFileName',
  },
  checkBoolean,
) => {
  const deleteFileFields = (fields) => fields.forEach(field => delete data[fileFields[field]]);

  if (!data[fileFields.file] && data[fileFields.fileId] && data[fileFields.fileName]) {
    deleteFileFields(['fileName', 'fileId', 'file']);
  }
  // if we have no change file we push id and name
  if (data[fileFields.file]?.name === data[fileFields.fileName]) {
    deleteFileFields(['file']);
  } else { // else we push only file
    deleteFileFields(['fileName', 'fileId']);
  }
  return getFormData({ object: data, checkBoolean });
};