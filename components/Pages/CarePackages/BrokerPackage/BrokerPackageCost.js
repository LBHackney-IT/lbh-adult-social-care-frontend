import React from 'react';
import BrokerageSupplierCard from 'components/Pages/CarePackages/BrokerageSupplierCard';
import BrokerageCost from 'components/Pages/CarePackages/BrokerageCost';
import { Container, Input } from '../../../HackneyDS';
import { currency } from '../../../../constants/strings';

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
  oneOffTotalCost,
  supplierWeeklyCost,
  setSupplierWeeklyCost,
  removeSupplierCard,
}) => (
  <Container className="supplier-look-up__selected">
    {cardInfo && (
      <>
        <h3 className="supplier-look-up__selected-title">Supplier</h3>
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
      className="supplier-look-up__weekly-cost"
      preSign={currency.euro}
      label="Weekly Cost"
      value={supplierWeeklyCost}
      onChangeValue={setSupplierWeeklyCost}
      required
    />
    <BrokerageCost
      name="weekly-additional"
      changeNeed={changeNeed}
      corePackageDates={corePackageDates}
      getter={weeklyNeeds}
      setter={setWeeklyNeeds}
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

export default BrokerPackageCost;
