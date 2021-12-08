import React, { useMemo, useState } from 'react';
import { Button } from './HackneyDS';
import { formatDocumentInfo } from '../service';

const ViewDocument = ({
  downloadFileName = '',
  getDocumentRequest,
  hasFile = false,
  isLoading,
  setIsLoading,
  text = 'View',
  className = 'link-button blue',
}) => {
  const [localLoading, setLocalLoading] = useState(false);

  const mainLoading = isLoading || localLoading;

  const setMainLoading = setIsLoading || setLocalLoading;

  if (!hasFile) return <p>N/A</p>;

  return useMemo(() => (
    <Button
      link=''
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
        setMainLoading(true);
        event.preventDefault();

        let file = await getDocumentRequest();

        // if file is string, then create a file
        if (typeof file === 'string') {
          file = await formatDocumentInfo({ fileName: downloadFileName, href: file });
        }
        const newLink = window.document.createElement('a');
        newLink.href = window.URL.createObjectURL(file);
        newLink.target = '_blank';
        newLink.click();
        newLink.remove();
        setMainLoading(false);
      }}
    >
      {text}
    </Button>
  ), []);
};

export default ViewDocument;