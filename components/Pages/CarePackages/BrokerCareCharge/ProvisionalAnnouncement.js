import React from 'react';
import { Announcement, Button, Link } from '../../../HackneyDS';

export const ProvisionalAnnouncement = ({ visible, handleClick }) => {
  if (!visible) return null;

  return (
    <>
      <Announcement isWarning title="Care charge assessment for this package is already complete.">
        <p>
          <Button onClick={handleClick}>View/manage care charges for this package</Button>
        </p>
      </Announcement>
    </>
  );
};
