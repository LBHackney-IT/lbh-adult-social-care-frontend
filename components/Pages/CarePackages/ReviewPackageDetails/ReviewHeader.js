import React from 'react';
import { Container, VerticalSeparator } from '../../../HackneyDS';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import PackageDetailsButtons from './PackageDetailsButtons';

export const ReviewHeader = ({
  title,
  subTitle,
  goToHistory,
  goToPaymentHistory,
  showEditActions,
  buttons,
  additionalButtons,
}) => (
  <>
    <Container className="brokerage__container-header brokerage__container">
      <TitleSubtitleHeader
        width=""
        title={title}
        subTitle={subTitle}
        additionalComponent={
          additionalButtons && (
            <Container className="package-actions" display="flex" alignItems="center" margin="30px 0 0 0">
              <PackageDetailsButtons className="ml-0" buttons={additionalButtons} />
              {showEditActions && (
                <>
                  <VerticalSeparator width={16} />
                  |
                  <VerticalSeparator width={16} />
                  <PackageDetailsButtons className="ml-0" buttons={buttons} />
                </>
              )}
            </Container>
          )
        }
        link={
          !additionalButtons && (
            <Container display="flex">
              <span onClick={goToHistory} className="lbh-color-blue font-size-19px package-history-link">
                Package History
              </span>
              <VerticalSeparator width="15px" />
              <span onClick={goToPaymentHistory} className="lbh-color-blue font-size-19px package-history-link">
                Payment History
              </span>
            </Container>
          )
        }
      >
        {showEditActions && !additionalButtons && <PackageDetailsButtons buttons={buttons} />}
      </TitleSubtitleHeader>
    </Container>
  </>
);
