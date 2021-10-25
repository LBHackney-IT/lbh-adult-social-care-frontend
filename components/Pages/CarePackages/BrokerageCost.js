import React, { useState } from 'react';
import { Container, Input } from '../../HackneyDS';
import { SelectArrowTriangle } from '../../Icons';
import BrokeragePackageDates from './BrokeragePackageDates';
import { currency } from '../../../constants/strings';
import BrokerageBorderCost from './BrokerageBorderCost';
import FormGroup from '../../HackneyDS/FormGroup';

const BrokerageCost = ({
  title,
  addNeed,
  getter,
  setter,
  name,
  corePackageDates,
  checkNeedError,
  removeNeed,
  labelInputCost,
  addNeedText,
  changeNeed,
  totalCostName,
  totalCost,
  hasOngoing = true,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Container className={`brokerage__weekly-cost${!expanded ? ' brokerage__cost-margin' : ''}`}>
      <h2 onClick={() => setExpanded(!expanded)} className="brokerage__cost-title">
        {title}
        <span className="text-blue brokerage__cost-expand">
          {expanded ? 'Collapse' : 'Expand'}
          <SelectArrowTriangle className={`icon-transition${expanded ? ' icon-animation-rotation' : ''}`} />
        </span>
      </h2>
      {expanded && (
        <>
          {getter.map((item, index) => {
            const error = checkNeedError(item);
            return (
              <FormGroup error={error ? 'Some validations error' : ''} key={item.id}>
                <BrokeragePackageDates
                  startMinDate={corePackageDates.endDate}
                  dates={{ startDate: item.startDate, endDate: item.endDate }}
                  fields={{
                    dateFrom: 'startDate',
                    dateTo: 'endDate',
                  }}
                  error={error}
                  setDates={(field, date) => changeNeed(getter, setter, field, date, index)}
                  checkboxId={`${name}-checkbox-${index}`}
                  label="Dates"
                  hasOngoing={hasOngoing}
                  isOngoing={item.isOngoing}
                  setIsOngoing={(value) => changeNeed(getter, setter, 'isOngoing', value, index)}
                />
                <Input
                  id={`supplier-cost-${name}-${index}`}
                  preSign={currency.euro}
                  className="brokerage__cost-input"
                  label={labelInputCost}
                  value={item.cost}
                  onChangeValue={(value) => changeNeed(getter, setter, 'cost', value, index)}
                />
                <Container className="brokerage__cost-add-need" display="flex">
                  {index !== 0 && (
                    <p onClick={() => removeNeed(getter, setter, index)} className="link-button red">
                      Remove
                    </p>
                  )}
                  <p onClick={() => addNeed(setter)} className="text-green">
                    {addNeedText}
                  </p>
                </Container>
              </FormGroup>
            )
          })}
          <BrokerageBorderCost
            totalCostHeader={totalCostName}
            className="brokerage__border-cost"
            totalCost={totalCost}
          />
        </>
      )}
    </Container>
  );
};

export default BrokerageCost;
