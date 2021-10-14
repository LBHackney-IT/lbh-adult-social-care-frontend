import React from 'react';
import { Container } from '../../HackneyDS';

const TitleSubtitle = ({ title, subtitle, titleClass, subtitleClass }) => (
  <Container>
    <p className={`font-size-14px ${titleClass}`}>{title}</p>
    <p className={`font-size-16px ${subtitleClass}`}>{subtitle}</p>
  </Container>
);

export default TitleSubtitle;