import { Container } from '../../HackneyDS';
import React from 'react';

const TitleSubtitleHeader = ({ title, subTitle }) => (
  <Container className="title-subtitle-header">
    <p>{title}</p>
    <h2>{subTitle}</h2>
  </Container>
);

export default TitleSubtitleHeader;