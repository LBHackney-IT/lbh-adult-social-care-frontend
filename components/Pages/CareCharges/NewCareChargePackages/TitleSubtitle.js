import React, { memo } from 'react';
import { Heading } from '../../../HackneyDS';

const TitleSubtitle = ({ title, subtitle }) => (
  <>
    <Heading size="s">{title}</Heading>
    <p>{subtitle}</p>
  </>
);

export default memo(TitleSubtitle);
