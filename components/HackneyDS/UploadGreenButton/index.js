import React from 'react';
import UrlFromFile from '../../UrlFromFile';
import FormGroup from '../FormGroup';
import { FileUpload } from '../FileUpload/FileUpload';

export const UploadGreenButton = ({ file, setFile, label, className, extensions }) => (
  <FormGroup className={`upload-green-button${className ? ` ${className}` : ''}`} label={label}>
    <UrlFromFile file={file} removeFile={setFile}/>
    {!file && <FormGroup className="file-upload-form">
      <FileUpload extensions={extensions} getFile={setFile} label={<div>Upload file</div>}/>
    </FormGroup>}
  </FormGroup>
);