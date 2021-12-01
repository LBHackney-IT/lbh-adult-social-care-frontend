import React, { memo, useState } from 'react';
import { currency, dateStringFormats } from 'constants/strings';
import { formatDate } from 'service';
import { COLLECTING_REASON_OPTIONS } from 'constants/variables';
import { Container, InsetText, HorizontalSeparator, SingleAccordion } from '../../../HackneyDS';

const noContentText = {
  'Care Charges': 'care charges',
  'One Off Additional Need': 'one off additional needs',
  'Weekly Additional Need': 'weekly additional needs',
};

const PackageInfo = ({ fncDetails, headerTitle, items, containerId, careChargeClaimCollector }) => {
  const [openedServiceUserNeed, setOpenedServiceUserNeed] = useState([]);
  const [openedDetails, setOpenedDetails] = useState([]);

  const changeOpenedService = (id) => {
    if (openedServiceUserNeed.includes(id)) {
      setOpenedServiceUserNeed(openedServiceUserNeed.filter((item) => item !== id));
    } else {
      setOpenedServiceUserNeed([...openedServiceUserNeed, id]);
    }
  };

  const changeOpenedDetails = (id) => {
    if (openedDetails.includes(id)) {
      setOpenedDetails(openedDetails.filter((item) => item !== id));
    } else {
      setOpenedDetails([...openedDetails, id]);
    }
  };

  return (
    <Container className="review-package-details__items-container">
      <Container className="review-package-details__title" display="flex" alignItems="center">
        <h3 id={containerId}>{headerTitle || 'Care Package'}</h3>
      </Container>
      {items?.map(({ startDate, endDate, claimReason, subTypeName, cost, title, address, serviceUserNeed, place, id, description }) => {
        const openedServiceUserId = openedServiceUserNeed.includes(id);
        const collectingReasonLabel = claimReason && COLLECTING_REASON_OPTIONS.find((el) => (
          el.value === claimReason
        ))?.text;
        const openedDetailsId = openedDetails.includes(id);
        const minusSign = cost < 0 ? '-' : '';
        return (
          <Container className="review-package-details__items" key={id}>
            <Container className="review-package-details__items-date" display="flex" justifyContent="space-between">
              <p>
                {formatDate(startDate, dateStringFormats.dayMonthYearSlash)}
                {endDate && ` - `}
                {endDate && formatDate(endDate, dateStringFormats.dayMonthYearSlash)}
              </p>
              {cost && (
                <p className="text-lbh-f01">
                  {minusSign}
                  {currency.euro}
                  {cost ? Math.abs(cost).toFixed(2) : 0}
                </p>
              )}
            </Container>
            {fncDetails && (
              <>
                <p>
                  <span className="font-weight-bold">FNC assessment been carried out: </span>
                  {fncDetails.assessmentFileUrl}
                </p>
                <HorizontalSeparator height={8} />
                <p>
                  <span className="font-weight-bold">Collected by: </span>
                  {fncDetails.fncClaimCollector}
                </p>
                <HorizontalSeparator height={8} />
                <p className="mb-3">
                  <span className="font-weight-bold">FNC assessment: </span>
                  <span className="link-button lbh-color-blue">View</span>
                </p>
              </>
            )}
            {careChargeClaimCollector && (
              <>
                <p>
                  <span className="font-weight-bold">{subTypeName} care charge (pre-assessement)</span>
                </p>
                <HorizontalSeparator height={8} />
                {careChargeClaimCollector && (
                  <p>
                    <span className="font-weight-bold">Collected by: </span>
                    {careChargeClaimCollector}
                  </p>
                )}
                <HorizontalSeparator height={8} />
                {collectingReasonLabel && (
                  <>
                    <p className="font-weight-bold">Why is Hackney collecting these care charges: </p>
                    <p className="mb-3">{collectingReasonLabel}</p>
                  </>
                )}
              </>
            )}
            {description && (
              <SingleAccordion title="Notes" onClick={() => changeOpenedDetails(id)} isOpened={openedDetailsId}>
                <p>{description}</p>
              </SingleAccordion>
            )}
            {title && <p className="review-package-details__items-title font-weight-bold">{title}</p>}
            {address && (
              <Container>
                <p className="review-package-details__items-place">
                  {place} {id}
                </p>
                <p className="review-package-details__items-address">{address}</p>
              </Container>
            )}
            {serviceUserNeed && (
              <SingleAccordion
                title="Core package details"
                onClick={() => changeOpenedService(id)}
                isOpened={openedServiceUserId}
              >
                <p>{serviceUserNeed.term}</p>
                {serviceUserNeed?.careType?.map((careType) => (
                  <p>{careType}</p>
                ))}
              </SingleAccordion>
            )}
          </Container>
        );
      })}
      {!items?.length && (
        <>
          <InsetText>No {noContentText[headerTitle]}</InsetText>
          <HorizontalSeparator height={20} />
        </>
      )}
    </Container>
  );
};

export default memo(PackageInfo);
