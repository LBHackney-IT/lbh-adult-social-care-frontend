import React from 'react';

export const FileUpload = ({
  extensions,
  className = '',
  onChange = () => {},
  setFile,
  setFiles,
  id = 'file-upload',
  label = 'Choose File',
}) => {
  const changeInput = (e) => {
    if (setFile) return setFile(e.target.files[0]);
    if (setFiles) return setFiles(e.target.files);

    return onChange(e);
  };

  const accept = extensions ? extensions.map((extension) => `.${extension}`).join(', ') : '';

  return (
    <div className={`govuk-form-group lbh-form-group ${className}`}>
      {label && (
        <label className="file-upload" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        accept={accept}
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
