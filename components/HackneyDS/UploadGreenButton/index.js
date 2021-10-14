import UrlFromFile from '../../UrlFromFile';
import FormGroup from '../FormGroup';
import { FileUpload } from '../FileUpload/FileUpload';
import React from 'react';

export const UploadGreenButton = ({ file, setFile, label, className }) => (
  <FormGroup className={`upload-green-button${className ? ` ${className}` : ''}`} label={label}>
    <UrlFromFile file={file} removeFile={setFile}/>
    {!file && <FormGroup className="file-upload-form">
      <FileUpload getFile={setFile} label={<div>Upload file</div>}/>
    </FormGroup>}
  </FormGroup>
);