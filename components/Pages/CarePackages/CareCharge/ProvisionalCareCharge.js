import React, { memo } from 'react';
import { currency } from 'constants/strings';
import { Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';
import ActionButtons from './ActionButtons';

const collectedByOptions = [
  { id: 'hackney', label: 'Hackney council (gross)' },
  { id: 'supplier', label: 'Supplier (net)' },
];

const ProvisionalCareCharge = ({ onCancel, onEnd }) => (
  <div className="provisional-care">
    <h3>Provisional care charge (pre-assessment)</h3>

    <Input
      id="cost-per-week"
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
      inline
      label="Collected by"
      items={collectedByOptions}
      className="care-charge__radios"
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

    <ActionButtons onCancel={onCancel} onEnd={onEnd} />
  </div>
);

export default memo(ProvisionalCareCharge);
