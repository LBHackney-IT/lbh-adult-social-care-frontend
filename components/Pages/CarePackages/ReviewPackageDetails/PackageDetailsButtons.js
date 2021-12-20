import React, { memo } from 'react';
import { Button, Container } from '../../../HackneyDS';

const PackageDetailsButtons = ({ buttons, className = '' }) => {
  if (!buttons) return null;

  return (
    <Container className={`review-package-details__buttons ${className}`}>
      {buttons.map((button) => {
        if (!button) return;

        const { className: buttonClassName = '', onClick, secondary, title, outline, color } = button;
        return (
          <Button
            secondary={secondary}
            key={title}
            color={color}
            outline={outline}
            className={buttonClassName}
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
