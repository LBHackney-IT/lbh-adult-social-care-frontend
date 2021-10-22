import React from 'react';
import { currency } from 'constants/strings';
import { Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';

const collectedByOptions = [
  { id: 'hackney', label: 'Hackney council (gross)' },
  { id: 'supplier', label: 'Supplier (net)' },
];

const ProvisionalCareCharge = () => (
  <div className="provisional-care">
    <h3>Provisional care charge (pre-assessment)</h3>

    <Input
      label="Cost per week"
      hint="Auto calculated on age"
      preSign={currency.euro}
      // onChangeValue={setCostPerWeek}
      // value={costPerWeek}
      // error={errors.costPerWeek}
      // onBlur={() => {
      //   if (costPerWeek < calculatedCost) {
      //     setCostPerWeek(calculatedCost);
      //   }
      // }}
    />

    <RadioGroup
      label="Collected by"
      items={collectedByOptions}
      className="provisional-care__radios"
      // handle={(value) => {
      //   changeError('collectedBy');
      //   setCollectedBy(value);
      // }}
      // error={errors.collectedBy}
      // value={collectedBy}
    />

    <Label className="reason-collecting" htmlFor="reason-collecting">
      Why is Hackney collecting these care charges?
    </Label>

    {/* {errors.reasonCollecting && <ErrorMessage>{errors.reasonCollecting}</ErrorMessage>} */}

    <Select
      id="reason-collecting"
      // options={reasonsCollecting}
      // value={reasonCollecting}
      // onChangeValue={(value) => {
      //   setReasonCollecting(value);
      //   changeError('reasonCollecting');
      // }}
    />

    <Textarea
      className="provisional-care__textarea"
      // handler={setNotes}
      // value={notes}
      rows={3}
    />
  </div>
);

export default ProvisionalCareCharge;
