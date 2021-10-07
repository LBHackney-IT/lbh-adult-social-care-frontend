import { Container } from './HackneyDS';
import { getUrlFromFile } from '../service/helpers';
import React from 'react';

const UrlFromFile = ({ file, removeFile }) => {
  if (!file) return <></>;

  return (
    <Container className='url-from-file' display="flex">
      <a className="link-button blue" href={getUrlFromFile(file)}>{file.name}</a>
      <p className="link-button text-black remove-button" onClick={() => removeFile(null)}>Remove</p>
    </Container>
  );
};

export default UrlFromFile;