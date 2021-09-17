import React from 'react';

export const FileUpload = () => (
  <div className="govuk-form-group lbh-form-group">
    <label className="file-upload" htmlFor="file-upload-1">
      Choose File
    </label>
    <input className="govuk-file-upload lbh-file-upload" id="file-upload-1" name="file-upload-1" type="file" hidden />
  </div>
);
