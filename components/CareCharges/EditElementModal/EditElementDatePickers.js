import DatePick from '../../DatePick';
import RadioButton from '../../RadioButton';
import React, { useState } from 'react';
import { formatDate, incrementDate } from '../../../service/helpers';
import { differenceInDays, differenceInWeeks, intervalToDuration } from 'date-fns';
import BaseField from '../../baseComponents/BaseField';

const EditElementDatePickers = ({
  index,
  previousEndDate,
  dateFromWeeks,
  startDate,
  dateToWeeks,
  endDate,
  startDateId,
  endDateId,
  period,
  inputErrors,
  onChangeInput,
  elements,
  withoutEdit,
}) => {
  const [editedElements, setEditedElements] = useState([]);

  const editDateAction = (isEdit, id) => {
    if(isEdit) {
      setEditedElements(prevState => ([...prevState, id]));
    } else {
      setEditedElements(elements.filter(item => item !== id));
    }
  }

  const minStartDate = previousEndDate && incrementDate({
    incrementTime: { days: 1 },
    date: previousEndDate
  });
  const minEndDate = dateFromWeeks && incrementDate({
    incrementTime: { weeks: dateFromWeeks },
    date: startDate,
  });
  const maxEndDate = dateToWeeks && incrementDate({
    incrementTime: { weeks: dateToWeeks },
    date: startDate,
  });
  const daysFromPrevious = previousEndDate && differenceInDays(startDate, previousEndDate);
  const endDateDistance = intervalToDuration({ start: startDate, end: endDate });
  const weeksFromStart = differenceInWeeks(endDate, startDate);
  const formattedStartDate = formatDate(startDate, '.');
  const formattedEndDate = formatDate(endDate, '.');
  const isEditStartDate = !editedElements.includes(startDateId) && !withoutEdit;
  const isEditEndDate = !editedElements.includes(endDateId) && !withoutEdit;
  return (
    <div className='care-charges-modal__date-pickers'>
      {isEditStartDate ?
        <div className='care-charges-modal__value'>
          <p>Start date</p>
          <p className='care-charges-modal__date-info'>
            {`${formattedStartDate} `}
            {daysFromPrevious &&
            <>
              ({daysFromPrevious} {daysFromPrevious === 1 ? 'day' : 'days'} after previous element)
            </>
            }
            <span
              className='care-charges-modal__date-action'
              onClick={() => editDateAction(isEditStartDate, startDateId)}
            >EDIT</span>
          </p>
        </div>
        : (
          <DatePick
            minDate={minStartDate}
            error={inputErrors[index].startDate}
            setDate={(newValue) => onChangeInput('startDate', newValue, index)}
            dateValue={startDate}
            label='Start date'
          />
        )
      }
      {period === 'fixed-period' && isEditEndDate ?
        <div className='care-charges-modal__value'>
          <p>End date</p>
          <p className='care-charges-modal__date-info'>
            {`${formattedEndDate} `}
            {weeksFromStart &&
            <>
              ({weeksFromStart} {weeksFromStart === 1 ? 'week' : 'weeks'} from start date)
            </>
            }
            <span
              className='care-charges-modal__date-action'
              onClick={() => editDateAction(true, endDateId)}
            >EDIT</span>
          </p>
        </div>
        : (
          <>
            <RadioButton
              options={[
                { value: 'ongoing', text: 'Ongoing'},
                { value: 'fixed-period', text: 'Fixed Period' },
              ]}
              selectedValue={period}
              onChange={newValue => {
                onChangeInput('period', newValue, index);
                editDateAction(true, endDateId);
              }}
            />
            {period === 'fixed-period' &&
              <div className='edit-element__end-date'>
                <DatePick
                  error={inputErrors[index].endDate}
                  setDate={(newValue) => onChangeInput('endDate', newValue, index)}
                  dateValue={endDate}
                  label='End date'
                  minDate={minEndDate}
                  maxDate={maxEndDate}
                />
                <BaseField label=''>
                  <p className='edit-element__end-date-distance'>
                    ({endDateDistance.months} {endDateDistance.months === 1 ? 'month' : 'months'} {endDateDistance.days}
                    {endDateDistance.days === 1 ? ' day' : ' days'})
                  </p>
                </BaseField>
              </div>
            }
          </>
        )
      }
    </div>
  )
};

export default EditElementDatePickers;