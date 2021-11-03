import React, { useState } from 'react';
import { Container, Input, FormGroup, Collapse } from '../../HackneyDS';
import BrokeragePackageDates from './BrokeragePackageDates';
import { currency } from '../../../constants/strings';
import BrokerageBorderCost from './BrokerageBorderCost';

const BrokerageCost = ({
  title,
  addNeed,
  getter,
  setter,
  name,
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
    <Collapse
      setExpanded={setExpanded}
      expanded={expanded}
      title={<h2>{title}</h2>}
      className="brokerage__weekly-cost"
    >
      {!getter?.length ? (
          <Container width='fit-content' className="brokerage__cost-add-need" display="flex">
            <p onClick={() => addNeed(setter)} className="text-green">
              {addNeedText}
            </p>
          </Container>
        )
        : (
          <>
            {getter.map((item, index) => {
              const error = checkNeedError(item);
              return (
                <FormGroup error={error ? 'Some validations error' : ''} key={item.id}>
                  <BrokeragePackageDates
                    hasClearButton
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
                  <Container width='fit-content' className="brokerage__cost-add-need" display="flex">
                    <p onClick={() => removeNeed(getter, setter, index)} className="link-button red">
                      Remove
                    </p>
                    <p onClick={() => addNeed(setter)} className="text-green">
                      {addNeedText}
                    </p>
                  </Container>
                </FormGroup>
              );
            })}
            <BrokerageBorderCost
              totalCostHeader={totalCostName}
              className="brokerage__border-cost"
              totalCost={totalCost}
            />
          </>
        )}
    </Collapse>
  );
};

export default BrokerageCost;
