import React from 'react';
import { Input } from '../../../HackneyDS';
import RadioButton from '../../../RadioButton';
import { currency } from '../../../../constants/strings';
import EditElementDatePickers from '../EditElementModal/EditElementDatePickers';

const CareChargesInfoEdited = ({
  elements = [],
  hasEditStyle = true,
  onChangeInput,
  inputErrors = []
}) => {
  if(elements.length === 0) return <></>;

  return <>
    {elements.map(({
      name,
      property,
      value,
      startDate,
      claimedBy,
      endDate,
      period,
      dateFromWeeks,
      dateToWeeks,
      id,
    }, index) => {
      const startDateId = `${name}${property}${id}start-date`;
      const endDateId = `${name}${property}${id}end-date`;
      return (
        <div key={startDateId} className='care-charges-modal__info'>
          <div className='care-charges-modal__content'>
            <p>{name}</p>
            <p>{property}</p>
          </div>
          <Input
            error={inputErrors[index].value}
            name='value'
            id={id}
            value={value}
            label='Value'
            type='number'
            placeholder={`${currency.euro}500`}
            handler={newValue => onChangeInput('value', newValue, index)}
          />
          <RadioButton
            options={[
              { value: 'gross', text: 'Gross'},
              { value: 'net', text: 'Net' },
            ]}
            selectedValue={claimedBy}
            onChange={newValue => onChangeInput('claimedBy', newValue, index)}
          />
          <EditElementDatePickers
            hasEditStyle={hasEditStyle}
            dateFromWeeks={dateFromWeeks}
            startDate={startDate}
            endDate={endDate}
            period={period}
            elements={elements}
            onChangeInput={onChangeInput}
            inputErrors={inputErrors}
            index={index}
            startDateId={startDateId}
            endDateId={endDateId}
            dateToWeeks={dateToWeeks}
            previousEndDate={index !== 0 && elements[index-1].endDate}
          />
        </div>
      )
    })}
  </>
};

export default CareChargesInfoEdited;