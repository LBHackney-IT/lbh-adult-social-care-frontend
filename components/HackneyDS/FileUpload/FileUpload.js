import React from 'react';

export const FileUpload = ({ className = '' }) => (
  <div className={`govuk-form-group lbh-form-group ${className}`}>
    <label className="file-upload" htmlFor="file-upload-1">
      Choose File
    </label>
    <input className="govuk-file-upload lbh-file-upload" id="file-upload-1" name="file-upload-1" type="file" hidden />
  </div>
);
