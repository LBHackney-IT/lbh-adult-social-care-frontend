import React, { memo } from 'react';
import { Container } from '../../HackneyDS';

const TitleSubtitleHeader = ({ title, subTitle, link, children, width, additionalComponent }) => (
  <Container width={width} className="title-subtitle-header">
    <p>{title}</p>

    <div className='main-container'>
      <h2>{subTitle}</h2>
      {link}
      {children}
    </div>
    {additionalComponent}
  </Container>
);

export default memo(TitleSubtitleHeader);
