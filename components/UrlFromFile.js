import React, { useEffect, useState } from 'react';
import { getUrlFromFile } from '../service';
import { Container } from './HackneyDS/Layout/Container';
import { VerticalSeparator } from './HackneyDS/Layout/VerticalSeparator';
import Loading from './Loading';

const UrlFromFile = ({
  file,
  onClick = () => {},
  download,
  removeFile,
  isLoading,
  linkText = 'View',
  showOnlyLink,
}) => {
  if (!file && !showOnlyLink) return <></>;

  if (isLoading) return <Loading className="centered-container" isLoading={isLoading} />;

  const [isEdit, setIsEdit] = useState(false);
  const [link, setLink] = useState('');

  const getFile = async () => {
    const result = await getUrlFromFile(file);
    setLink(result);
  };

  useEffect(() => {
    if (file) getFile();
  }, [file]);

  const linkFileComponent = (
    <a target="_blank" onClick={onClick} download={download} href={link} className="link-button blue" rel="noreferrer">
      {linkText}
    </a>
  );

  if (showOnlyLink) return file ? linkFileComponent : <p>N/A</p>;

  return (
    <Container className="url-from-file" display="flex">
      <p>{file.name}</p>
      <VerticalSeparator width={8} />
      {linkFileComponent}
      <VerticalSeparator width={8} />
      {isEdit ? (
        <>
          <p className="link-button" onClick={() => setIsEdit(false)}>
            Cancel
          </p>
          <VerticalSeparator width={8} />
          <p className="link-button red" onClick={() => removeFile()}>
            Remove
          </p>
        </>
      ) : (
        <p onClick={() => setIsEdit(true)} className="link-button green">
          Edit
        </p>
      )}
    </Container>
  );
};

export default UrlFromFile;
