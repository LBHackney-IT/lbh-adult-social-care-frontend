import React from 'react';
import { Container } from '../../HackneyDS';

const TitleSubtitleHeader = ({ title, subTitle }) => (
  <Container className="title-subtitle-header">
    <p>{title}</p>
    <h2>{subTitle}</h2>
  </Container>
);

export default TitleSubtitleHeader;
