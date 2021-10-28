import React from 'react';
import BrokerageSupplierCard from 'components/Pages/CarePackages/BrokerageSupplierCard';
import BrokerageCost from 'components/Pages/CarePackages/BrokerageCost';
import { currency } from 'constants/strings';
import BrokerageBorderCost from 'components/Pages/CarePackages/BrokerageBorderCost';
import { Container, Input } from '../../../HackneyDS';

const BrokerPackageCost = ({
  cardInfo,
  addNeed,
  weeklyNeeds,
  oneOffNeeds,
  removeNeed,
  corePackageDates,
  changeNeed,
  setWeeklyNeeds,
  setOneOffNeeds,
  weeklyTotalCost,
  checkNeedError,
  oneOffTotalCost,
  coreCost,
  setCoreCost,
  coreCostError,
  removeSupplierCard,
  setCoreCostError,
}) => {
  const onChangeCoreCost = (value) => {
    setCoreCost(value);
    setCoreCostError('');
  };

  return (
    <Container className="broker-package__selected">
      {cardInfo && (
        <>
          <h3 className="broker-package__selected-title">Supplier</h3>
          <BrokerageSupplierCard
            cardInfo={cardInfo}
            actionsComponent={
              <p role="presentation" onClick={removeSupplierCard} className="link-button red">
                Remove
              </p>
            }
          />
        </>
      )}
      <Input
        id="supplier-weekly-cost"
        error={coreCostError}
        preSign={currency.euro}
        label="Weekly Cost"
        value={coreCost}
        onChangeValue={onChangeCoreCost}
        required
      />
      <BrokerageBorderCost
        className="broker-package__weekly-cost"
        totalCost={coreCost}
        totalCostHeader='Core cost'
      />
      <BrokerageCost
        name="weekly-additional"
        changeNeed={changeNeed}
        corePackageDates={corePackageDates}
        getter={weeklyNeeds}
        setter={setWeeklyNeeds}
        checkNeedError={checkNeedError}
        totalCostName="Weekly cost"
        totalCost={weeklyTotalCost}
        removeNeed={removeNeed}
        addNeedText="Add additional weekly need"
        addNeed={addNeed}
        title="Weekly additional needs"
        labelInputCost="Weekly cost"
      />
      <BrokerageCost
        name="one-off"
        changeNeed={changeNeed}
        checkNeedError={checkNeedError}
        corePackageDates={corePackageDates}
        totalCostName="One off cost"
        getter={oneOffNeeds}
        setter={setOneOffNeeds}
        hasOngoing={false}
        removeNeed={removeNeed}
        totalCost={oneOffTotalCost}
        addNeedText="Add additional one off need"
        addNeed={addNeed}
        title="One off additional need"
        labelInputCost="One off cost"
      />
    </Container>
  );
}

export default BrokerPackageCost;
