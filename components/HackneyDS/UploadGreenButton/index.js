import React from 'react';
import UrlFromFile from '../../UrlFromFile';
import FormGroup from '../FormGroup';
import { FileUpload } from '../FileUpload/FileUpload';

export const UploadGreenButton = ({ fileInfo, setFile, label, className, extensions }) => (
  <FormGroup className={`upload-green-button${className ? ` ${className}` : ''}`} label={label}>
    <UrlFromFile file={fileInfo?.file} removeFile={setFile}/>
    {!fileInfo?.file && (
      <FormGroup className="file-upload-form">
        <FileUpload extensions={extensions} fileInfo={fileInfo} setFile={setFile} label={<div>Upload file</div>}/>
      </FormGroup>
    )}
  </FormGroup>
);