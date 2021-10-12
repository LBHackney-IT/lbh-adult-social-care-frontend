import React, { useState } from 'react';
import { Container, ErrorMessage, Input } from '../HackneyDS';
import { SelectArrowTriangle } from '../Icons';
import BrokeragePackageDates from './BrokeragePackageDates';
import { currency } from '../../constants/strings';
import { uniqueID } from '../../service/helpers';
import BrokerageBorderCost from './BrokerageBorderCost';
import FormGroup from '../HackneyDS/FormGroup';

const BrokerageCost = ({
  title,
  addNeed,
  getter,
  setter,
  name,
  corePackageDates,
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
          {getter.map(({ id, isOngoing, cost, startDate, endDate, errorCost, errorStartDate, errorEndDate }, index) => (
            <FormGroup error={errorCost || errorStartDate ? 'Some validations error' : ''} key={id}>
              <BrokeragePackageDates
                startMinDate={corePackageDates.endDate}
                dates={{ startDate, endDate }}
                fields={{
                  dateFrom: 'startDate',
                  dateTo: 'endDate',
                }}
                error={errorEndDate || errorStartDate}
                setDates={(field, date) => changeNeed(getter, setter, field, date, index)}
                checkboxId={`${name}-checkbox-${index}`}
                label="Dates"
                hasOngoing={hasOngoing}
                isOngoing={isOngoing}
                setIsOngoing={(value) => changeNeed(getter, setter, 'isOngoing', value, index)}
              />
              <Input
                id={`supplier-cost-${name}-${index}`}
                preSign={currency.euro}
                className="brokerage__cost-input"
                label={labelInputCost}
                value={cost}
                error={errorCost}
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
          ))}
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
