import React from 'react';
import { Announcement, Button, Container, HorizontalSeparator, VerticalSeparator } from '../../../HackneyDS';

export const PreviousCareCharges = ({ usePreviousCareCharge, useNewCareCharge }) => (
  <Announcement
    isWarning
    title="Care charges have previously been added."
    children={(
      <Container>
        <p>Would you like to use previous care charge values?</p>
        <HorizontalSeparator height={8} />
        <Container display="flex">
          <Button onClick={usePreviousCareCharge}>Yes, use previous care charges</Button>
          <VerticalSeparator width={10} />
          <Button onClick={useNewCareCharge} secondary color="gray">No, add new care charges</Button>
        </Container>
      </Container>
    )}
  />
);