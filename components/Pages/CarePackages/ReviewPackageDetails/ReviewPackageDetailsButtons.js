import React, { memo } from 'react';
import { Button, Container } from '../../../HackneyDS';

const ReviewPackageDetailsButtons = ({ edit, cancel, end }) => (
  <Container className="review-package-details__buttons">
    <Button outline secondary color='blue' onClick={edit}>
      Edit
    </Button>
    <Button outline secondary color='red' onClick={cancel}>
      Cancel
    </Button>
    <Button color='blue' outline secondary onClick={end}>
      End
    </Button>
  </Container>
);

export default memo(ReviewPackageDetailsButtons);
