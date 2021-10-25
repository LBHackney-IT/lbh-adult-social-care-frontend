import React, { memo } from 'react';
import { Container } from '../../HackneyDS';

const TitleSubtitleHeader = ({ title, subTitle, link, children, width }) => (
  <Container width={width} className="title-subtitle-header">
    <p>{title}</p>

    <div>
      <h2>{subTitle}</h2>
      {link}
      {children}
    </div>
  </Container>
);

export default memo(TitleSubtitleHeader);
