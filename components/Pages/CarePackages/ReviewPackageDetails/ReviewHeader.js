import React from 'react';
import { Container } from '../../../HackneyDS';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import PackageDetailsButtons from './PackageDetailsButtons';

export const ReviewHeader = ({ title, subTitle, goToHistory, showEditActions, buttons }) => (
  <Container className="brokerage__container-header brokerage__container">
    <TitleSubtitleHeader
      width=""
      title={title}
      subTitle={subTitle}
      link={
        <span
          onClick={goToHistory}
          className="lbh-color-blue font-size-19px package-history-link"
        >
          Package History
        </span>
      }>
      {showEditActions && <PackageDetailsButtons buttons={buttons} />}
    </TitleSubtitleHeader>
  </Container>
);