import React from 'react';
import { Announcement, Button, Container, HorizontalSeparator, VerticalSeparator } from '../../../HackneyDS';

export const PreviousCareChargesAnnouncement = ({ visible, usePreviousCareCharge, useNewCareCharge }) => {
  if (!visible) return null;

  return (
    <Announcement isWarning title="Care charges have previously been added.">
      <Container>
        <p>Would you like to use previous care charge values?</p>
        <HorizontalSeparator height={8} />
        <Container display="flex">
          <Button onClick={usePreviousCareCharge}>Yes, use previous care charges</Button>
          <VerticalSeparator width={10} />
          <Button onClick={useNewCareCharge} secondary color="gray">
            No, add new care charges
          </Button>
        </Container>
      </Container>
    </Announcement>
  );
};
