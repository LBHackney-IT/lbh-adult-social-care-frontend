export function getFormData(data, checkBoolean) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (!checkBoolean && !data[key]) return;
    formData.append(key, data[key]);
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
  checkBoolean
) => {
  const deleteFileFields = (fields) => fields.forEach((field) => delete data[fileFields[field]]);

  if (!data[fileFields.file] && data[fileFields.fileId] && data[fileFields.fileName]) {
    deleteFileFields(['fileName', 'fileId', 'file']);
  }
  // if we have no change file we push id and name
  if (data[fileFields.file]?.name === data[fileFields.fileName]) {
    deleteFileFields(['file']);
  } else {
    // else we push only file
    deleteFileFields(['fileName', 'fileId']);
  }
  return getFormData(data, checkBoolean);
};
