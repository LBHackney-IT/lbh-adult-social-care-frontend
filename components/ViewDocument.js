import React, { useState } from 'react';
import { Button } from './HackneyDS';
import { formatDocumentInfo } from '../service';

const ViewDocument = ({
  downloadFileName = '',
  getDocumentRequest,
  setIsFileDownloaded,
  hasFile = false,
  isLoading,
  setIsLoading,
  text = 'View',
  className = 'link-button blue',
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [file, setFile] = useState(null);

  const openFile = (document) => {
    const newLink = window.document.createElement('a');
    newLink.href = window.URL.createObjectURL(document);
    newLink.target = '_blank';
    newLink.click();
    newLink.remove();
  };

  const mainLoading = isLoading || localLoading;

  const setMainLoading = setIsLoading || setLocalLoading;

  if (!hasFile) return <p>N/A</p>;

  return (
    <Button
      download={downloadFileName}
      isLoading={mainLoading}
      style={{
        background: 'none',
        boxShadow: 'none',
        display: 'flex',
        width: 'fit-content',
        justifyContent: 'flex-start',
        padding: 0
      }}
      className={className}
      onClick={async (event) => {
        if (file) return openFile(file);

        setMainLoading(true);
        event.preventDefault();


        let newFile = await getDocumentRequest();

        // if file is string, then create a file
        if (typeof newFile === 'string') {
          newFile = await formatDocumentInfo({ fileName: downloadFileName, href: newFile });
        }
        setFile(newFile)
        setMainLoading(false);
        openFile(newFile);

        setIsFileDownloaded?.(true);
      }}
    >
      {text}
    </Button>
  );
};

export default ViewDocument;