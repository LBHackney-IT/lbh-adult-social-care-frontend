import React from 'react';

export const FileUpload = ({ className = '', onChange = () => {}, getFile, getFiles, }) => {
  const changeInput = (e) => {
    if(getFile) {
      return getFile(e.target.files[0])
    } else if (getFiles) {
      return getFiles(e.target.files);
    }
    onChange(e);
  }
  return (
    <div className={`govuk-form-group lbh-form-group ${className}`}>
      <label className="file-upload" htmlFor="file-upload-1">
        Choose File
      </label>
      <input
        onChange={changeInput}
        className="govuk-file-upload lbh-file-upload"
        id="file-upload-1"
        name="file-upload-1"
        type="file"
        hidden
      />
    </div>
  );
}
