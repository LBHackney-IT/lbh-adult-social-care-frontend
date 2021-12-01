import React from 'react';
import UrlFromFile from '../../UrlFromFile';
import FormGroup from '../FormGroup';
import { FileUpload } from '../FileUpload/FileUpload';

export const UploadGreenButton = ({ fileInfo, isLoading, setFile, label, className, extensions }) => (
  <FormGroup className={`upload-green-button${className ? ` ${className}` : ''}`} label={label}>
    <UrlFromFile isLoading={isLoading} file={fileInfo} removeFile={() => setFile(null)}/>
    {!fileInfo && (
      <FormGroup className="file-upload-form">
        <FileUpload extensions={extensions} setFile={setFile} label={<div>Upload file</div>}/>
      </FormGroup>
    )}
  </FormGroup>
);