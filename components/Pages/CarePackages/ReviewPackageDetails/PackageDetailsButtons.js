import React, { memo } from 'react';
import { Button, Container } from '../../../HackneyDS';

const PackageDetailsButtons = ({ buttons }) => (
  <Container className="review-package-details__buttons">
    {buttons.map(({ className = '', onClick, title }) => (
      <Button key={title} className={className} onClick={onClick}>
        {title}
      </Button>
    ))}
  </Container>
);

export default memo(PackageDetailsButtons);
