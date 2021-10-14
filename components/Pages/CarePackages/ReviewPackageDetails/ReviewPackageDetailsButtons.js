import { Button, Container } from '../../../HackneyDS';
import React, { memo } from 'react';

const ReviewPackageDetailsButtons = ({ edit, cancel, end }) => (
  <Container className="review-package-details__buttons">
    <Button className='outline blue' handler={edit}>Edit</Button>
    <Button className='outline red' handler={cancel}>Cancel</Button>
    <Button className='outline blue' handler={end}>End</Button>
  </Container>
);

export default memo(ReviewPackageDetailsButtons);