import React, { memo, useState } from 'react';
import { CLAIM_REASON_OPTIONS } from 'constants/variables';
import { Container, HorizontalSeparator, InsetText, SingleAccordion } from '../../../HackneyDS';
import { CareChargesSummary } from './CareChargesSummary';
import { FNCSummary } from './FNCSummary';
import { DateCostInfo } from './DateCostInfo';

const noContentText = {
  'Care Charges': 'care charges',
  'One Off Additional Need': 'one off additional needs',
  'Weekly Additional Need': 'weekly additional needs',
};

const PackageInfo = ({ headerTitle, items, containerId }) => {
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
      {items?.map(
        ({
          startDate,
          endDate,
          claimReason,
          claimCollector,
          subTypeName,
          cost,
          title,
          address,
          serviceUserNeed,
          place,
          id,
          description,
          assessmentFileName,
          assessmentFileId,
        }) => {
          const openedServiceUserId = openedServiceUserNeed.includes(id);
          const collectingReasonLabel =
            claimReason && CLAIM_REASON_OPTIONS.find((el) => el.value === claimReason)?.text;
          const openedDetailsId = openedDetails.includes(id);
          return (
            <Container className="review-package-details__items" key={id}>
              <DateCostInfo cost={cost} endDate={endDate} startDate={startDate} />
              <FNCSummary
                containerId={containerId}
                claimCollector={claimCollector}
                assessmentFileName={assessmentFileName}
                assessmentFileId={assessmentFileId}
              />
              <CareChargesSummary
                containerId={containerId}
                claimCollector={claimCollector}
                collectingReasonLabel={collectingReasonLabel}
                subTypeName={subTypeName}
              />
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
        }
      )}
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
