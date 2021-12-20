import React from 'react';
import { Announcement } from '../../../HackneyDS';

export const ProvisionalAnnouncement = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      <Announcement isWarning title="Care charge assessment for this package already done.">
        <p>Manage care charges for this package in the Care Charges menu</p>
      </Announcement>
    </>
  );
};