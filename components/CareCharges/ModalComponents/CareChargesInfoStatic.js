import React from 'react';
import { formatDate } from '../../../service/helpers';
import { currency } from '../../../constants/strings';

const CareChargesInfoStatic = ({ activeElements = [] }) => (
    <>
      {activeElements.map(({
        name,
        property,
        value,
        claimedBy,
        endDate,
        startDate,
        period,
        id,
      }) => {
        const formattedStartDate = formatDate(startDate, '.');
        const formattedEndDate = period === 'ongoing' ? period : formatDate(endDate, '.');
        return (
          <div key={`${name}${property}${id}`} className='care-charges-modal__info'>
            <div className='care-charges-modal__content'>
              <p>{name}</p>
              <p>{property}</p>
            </div>
            <div className='care-charges-modal__values'>
              <div className='care-charges-modal__value'>
                <p>Value</p>
                <p>{currency.euro}{value}</p>
              </div>
              <div className='care-charges-modal__value'>
                <p>Start date</p>
                <p>{formattedStartDate}</p>
              </div>
              <div className='care-charges-modal__value'>
                <p>End date</p>
                <p className='text-capitalize'>{formattedEndDate}</p>
              </div>
              <div className='care-charges-modal__value'>
                <p>Type</p>
                <p className='text-capitalize'>{claimedBy}</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );

export default CareChargesInfoStatic;