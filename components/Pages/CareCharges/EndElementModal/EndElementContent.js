import React, { useEffect, useMemo, useState } from 'react';
import { addWeeks, intervalToDuration } from 'date-fns';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesInfoTitle from '../CareChargesInfoTitle';
import CareChargesModalTitle from '../CareChargesModalTitle';
import DatePick from '../../../DatePick';

const EndElementContent = ({ activeElements, headerText }) => {
  const [endDate, setEndDate] = useState(null);

  const startDate = activeElements[0]?.startDate;
  const minDateFromWeeks = activeElements[0]?.dateFromWeeks;
  const minDateToWeeks = activeElements[0]?.dateToWeeks;

  const minEndDate = minDateFromWeeks && addWeeks(startDate, minDateFromWeeks);
  const maxEndDate = minDateToWeeks && addWeeks(startDate, minDateToWeeks);

  const endDateDistance = useMemo(() => (
    intervalToDuration({
        start: startDate,
        end: endDate || activeElements[0].endDate,
      }
    )
  ), [startDate, endDate]);

  const cancelAction = () => alert('Cancel');

  const endElement = () => alert('End');

  useEffect(() => {
    if (activeElements?.length) {
      setEndDate(activeElements[0].endDate);
    }
  }, [activeElements]);

  return (
    <>
      <CareChargesModalTitle title={headerText}/>
      <CareChargesInfoTitle title='Elements to be ended'/>
      <CareChargesInfoStatic activeElements={activeElements.slice(0, 1)}>
        {endDateDistance &&
        <div className='edit-element__end-date'>
          <DatePick
            setDate={setEndDate}
            dateValue={endDate}
            label='End date'
            minDate={minEndDate}
            maxDate={maxEndDate}
          />
          <p className='edit-element__end-date-distance'>
            ({endDateDistance.months} {endDateDistance.months === 1 ? 'month' : 'months'} {endDateDistance.days}
            {endDateDistance.days === 1 ? ' day' : ' days'})
          </p>
        </div>
        }
      </CareChargesInfoStatic>
      <CareChargesInfoTitle title='Elements to be cancelled'/>
      <CareChargesInfoStatic activeElements={activeElements.slice(1)}/>
      <CareChargesModalActions
        actions={[
          { title: 'End element', handler: endElement },
          { title: 'Cancel', handler: cancelAction, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EndElementContent;