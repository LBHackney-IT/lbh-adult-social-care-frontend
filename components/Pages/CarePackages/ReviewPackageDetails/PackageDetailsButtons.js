import React, { memo } from 'react';
import { Button, Container } from '../../../HackneyDS';

const PackageDetailsButtons = ({ buttons }) => {
  if (!buttons) return null;

  return (
    <Container className="review-package-details__buttons">
      {buttons.map((button) => {
        if (!button) return;

        const { className = '', onClick, secondary, title, outline, color } = button;
        return (
          <Button
            secondary={secondary}
            key={title}
            color={color}
            outline={outline}
            className={className}
            onClick={onClick}
          >
            {title}
          </Button>
        );
      })}
    </Container>
  );
};

export default memo(PackageDetailsButtons);
