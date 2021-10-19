import React, { memo } from 'react';
import { Button, Container } from '../../../HackneyDS';

const ReviewPackageDetailsButtons = ({ edit, cancel, end }) => (
  <Container className="review-package-details__buttons">
    <Button className="outline blue" onClick={edit}>
      Edit
    </Button>
    <Button className="outline red" onClick={cancel}>
      Cancel
    </Button>
    <Button className="outline blue" onClick={end}>
      End
    </Button>
  </Container>
);

export default memo(ReviewPackageDetailsButtons);
