import React from 'react';
import { getUrlFromFile } from '../service';
import { Container } from './HackneyDS/Layout/Container';

const UrlFromFile = ({ file, removeFile }) => {
  if (!file) return <></>;

  return (
    <Container className="url-from-file" display="flex">
      <a className="link-button blue" href={getUrlFromFile(file)}>
        {file.name}
      </a>
      <p className="link-button black remove-button" onClick={() => removeFile(null)}>
        Remove
      </p>
    </Container>
  );
};

export default UrlFromFile;
