import React, { memo } from 'react';
import { Container } from '../../../HackneyDS';

const TitleSubtitle = ({ title, subtitle, className = '' }) => (
  <Container width='fit-content' className={`title-subtitle ${className}`}>
    <p className='font-size-14px'>{title}</p>
    <p className='font-size-16px'>{subtitle}</p>
  </Container>
);

export default memo(TitleSubtitle);