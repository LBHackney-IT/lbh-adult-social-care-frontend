import React from 'react';

export const FileUpload = ({
  className = '',
  onChange = () => {},
  getFile,
  getFiles,
  id = 'file-upload',
  label = 'Choose File'
}) => {

  const changeInput = (e) => {
    if (getFile) {
      return getFile(e.target.files[0]);
    } if (getFiles) {
      return getFiles(e.target.files);
    }
    onChange(e);
  };

  return (
    <div className={`govuk-form-group lbh-form-group ${className}`}>
      {label && <label className="file-upload" htmlFor={id}>
        {label}
      </label>}
      <input
        onChange={changeInput}
        className="govuk-file-upload lbh-file-upload"
        id={id}
        name={id}
        type="file"
        hidden
      />
    </div>
  );
};
