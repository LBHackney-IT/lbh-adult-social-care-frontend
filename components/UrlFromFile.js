import React from 'react';
import { getUrlFromFile } from '../service';
import { Container } from './HackneyDS/Layout/Container';
import { VerticalSeparator } from './HackneyDS/Layout/VerticalSeparator';

const UrlFromFile = ({ file, removeFile }) => {
  if (!file) return <></>;

  return (
    <Container className="url-from-file" display="flex">
      <p>{file.name}</p>
      <VerticalSeparator width={8} />
      <a target="_blank" className="link-button blue" href={getUrlFromFile(file)}>
        View
      </a>
      <VerticalSeparator width={8} />
      <p className="link-button red" onClick={() => removeFile(null)}>
        Remove
      </p>
    </Container>
  );
};

export default UrlFromFile;
