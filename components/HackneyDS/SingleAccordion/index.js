import React from 'react';
import { CaretDownIcon } from '../../Icons';
import { Container } from '../Layout/Container';

export const SingleAccordion = ({ buttonComponent, className = '', title, onClick, isOpened, children }) => (
  <Container className={`review-package-details__accordion${className ? ` ${className}` : ''}`}>
    <div onClick={onClick} className={`single-accordion-info${isOpened ? ' accordion-opened' : ''}`}>
      {title && <p className="link-button">{title}</p>}
      {buttonComponent}
      <CaretDownIcon />
    </div>
    {isOpened && children}
  </Container>
);
