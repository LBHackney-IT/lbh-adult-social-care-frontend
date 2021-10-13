import { Button, Container } from '../../HackneyDS';
import React from 'react';

const PackageDetailsButtons = ({ edit, cancel, end }) => (
  <Container className="package-details__buttons">
    <Button className='outline blue' handler={edit}>Edit</Button>
    <Button className='outline red' handler={cancel}>Cancel</Button>
    <Button className='outline blue' handler={end}>End</Button>
  </Container>
);

export default PackageDetailsButtons;