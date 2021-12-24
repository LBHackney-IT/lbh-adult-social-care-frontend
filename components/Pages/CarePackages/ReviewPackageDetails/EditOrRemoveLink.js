import React from 'react';
import { Container } from '../../../HackneyDS';

const EditOrRemoveLink = ({ goToPackage }) => {
  if (!goToPackage) return;

  return (
    <Container className="review-package-details__items-actions" display="flex">
      <p
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && goToPackage()}
        onClick={goToPackage}
        className="link-button"
      >
        Edit or Remove
      </p>
    </Container>
  );
};

export default EditOrRemoveLink;