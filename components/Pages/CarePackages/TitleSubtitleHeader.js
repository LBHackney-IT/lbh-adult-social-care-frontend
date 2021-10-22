import React, { memo } from 'react';
import { Container } from 'components';

const TitleSubtitleHeader = ({ title, subTitle, link }) => (
  <Container className="title-subtitle-header">
    <p>{title}</p>

    <div>
      <h2>{subTitle}</h2>
      {link}
    </div>
  </Container>
);

export default memo(TitleSubtitleHeader);
