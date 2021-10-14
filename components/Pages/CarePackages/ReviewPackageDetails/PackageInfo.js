import React, { useState, memo } from 'react';
import { Container, SingleAccordion } from '../../../HackneyDS';
import { formatDate } from '../../../../service/helpers';
import { currency, dateStringFormats } from '../../../../constants/strings';

const PackageInfo = ({ headerTitle, items, containerId, details }) => {
  const [openedServiceUserNeed, setOpenedServiceUserNeed] = useState([]);
  const [openedDetails, setOpenedDetails] = useState([]);

  const changeOpenedService = (id) => {
    if (openedServiceUserNeed.includes(id)) {
      setOpenedServiceUserNeed(openedServiceUserNeed.filter(item => item !== id));
    } else {
      setOpenedServiceUserNeed([...openedServiceUserNeed, id]);
    }
  };

  const changeOpenedDetails = (id) => {
    if (openedDetails.includes(id)) {
      setOpenedDetails(openedDetails.filter(item => item !== id));
    } else {
      setOpenedDetails([...openedDetails, id]);
    }
  };

  return (
    <Container className="review-package-details__items-container">
      <h3 id={containerId}>{headerTitle}</h3>
      {items?.map(({
        startDate,
        endDate,
        cost,
        title,
        address,
        serviceUserNeed,
        place,
        id,
        description,
      }) => {
        const openedServiceUserId = openedServiceUserNeed.includes(id);
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
              {cost && <p className="text-lbh-f01">{minusSign}{currency.euro}{cost ? Math.abs(cost).toFixed(2) : 0}</p>}
            </Container>
            {details}
            {description &&
            <SingleAccordion
              title="Notes"
              onClick={() => changeOpenedDetails(id)}
              isOpened={openedDetailsId}
            >
              <p>{description}</p>
            </SingleAccordion>
            }
            {title && <p className="review-package-details__items-title font-weight-bold">{title}</p>}
            {address &&
            <Container>
              <p className="review-package-details__items-place">{place} {id}</p>
              <p className="review-package-details__items-address">{address}</p>
            </Container>
            }
            {serviceUserNeed && (
              <SingleAccordion
                title="Core package details"
                onClick={() => changeOpenedService(id)}
                isOpened={openedServiceUserId}
              >
                <p>{serviceUserNeed.term}</p>
                {serviceUserNeed?.careType?.map(careType => <p>{careType}</p>)}
              </SingleAccordion>
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default memo(PackageInfo);