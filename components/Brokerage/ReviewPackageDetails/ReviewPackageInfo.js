import React, { useState } from 'react';
import { Container } from '../../HackneyDS';
import { formatDate } from '../../../service/helpers';
import { currency, dateStringFormats } from '../../../constants/strings';
import { CaretDownIcon } from '../../Icons';

const ReviewPackageInfo = ({ headerTitle, items, containerId }) => {
  const [openedServiceUserNeed, setOpenedServiceUserNeed] = useState([]);

  const changeOpenedService = (id) => {
    if (openedServiceUserNeed.includes(id)) {
      setOpenedServiceUserNeed(openedServiceUserNeed.filter(item => item !== id));
    } else {
      setOpenedServiceUserNeed([...openedServiceUserNeed, id]);
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
      }) => {
        const openedId = openedServiceUserNeed.includes(id);
        const minusSign = cost < 0 ? '-' : '';
        return (
          <Container className="review-package-details__items" key={id}>
            <Container className="review-package-details__items-date" display="flex" justifyContent="space-between">
              <p>
                {formatDate(startDate, dateStringFormats.dayMonthYearSlash)}
                {endDate && ` - `}
                {endDate && formatDate(endDate, dateStringFormats.dayMonthYearSlash)}</p>
              {cost && <p className="text-lbh-f01">{minusSign}{currency.euro}{cost ? Math.abs(cost) : 0}</p>}
            </Container>
            {title && <p className="review-package-details__items-title font-weight-bold">{title}</p>}
            {address &&
            <Container>
              <p className="review-package-details__items-place">{place} {id}</p>
              <p className="review-package-details__items-address">{address}</p>
            </Container>
            }
            {serviceUserNeed && (
              <Container className="review-package-details__accordion">
                <div
                  onClick={() => changeOpenedService(id)}
                  className={`review-package-details__accordion-info${openedId ? ' accordion-opened' : ''}`}
                >
                  <p className="link-button">Core package details</p>
                  <CaretDownIcon/>
                </div>
                {openedId &&
                <>
                  <p>{serviceUserNeed.term}</p>
                  <p>{serviceUserNeed.careType}</p>
                </>
                }
              </Container>
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default ReviewPackageInfo;