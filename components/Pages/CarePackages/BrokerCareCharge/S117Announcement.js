import React from 'react';
import { Announcement } from '../../../HackneyDS';

export const S117Announcement = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      <Announcement title="This client has been categorised as S117" isError>
        No care charges need to be applied
      </Announcement>
    </>
  );
};