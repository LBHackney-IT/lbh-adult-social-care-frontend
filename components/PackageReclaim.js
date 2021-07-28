import React from 'react';
import { currency } from '../constants/strings';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';
import RadioButton from './RadioButton';

const staticReclaimFromOptions = [
  { text: 'Reclaim from 1', value: 1 },
  { text: 'Reclaim from 2', value: 2 },
  { text: 'Reclaim from 3', value: 3 },
];

const staticCategoryOptions = [
  { text: 'Category type 1', value: 1 },
  { text: 'Category type 2', value: 2 },
  { text: 'Category type 3', value: 3 },
];

const percentageValue = 1;
const staticCheckboxOptions = [
  { value: percentageValue, text: 'Percentage' },
  { value: 2, text: 'Fixed amount - one off' },
  { value: 3, text: 'Fixed amount - weekly' },
];

const PackageReclaim = ({
  packageReclaim,
  error,
  setError,
  index,
  setPackageReclaim,
  remove,
  reclaimAmountOptions = staticCheckboxOptions,
  reclaimFromCategoryOptions = staticCategoryOptions,
  reclaimFromOptions = staticReclaimFromOptions,
}) => {
  const changePackageType = (field, value) => {
    setPackageReclaim({
      ...packageReclaim,
      [field]: value,
    });
    onChangeErrors(field);
  };

  const onChangeErrors = (field) => {
    if (!currentError) return;
    const newErrors = [...error];
    newErrors.splice(index, 1, { ...currentError, [field]: false });
    setError(newErrors);
  };

  const currentError = index !== undefined && error !== undefined && error[index];

  return (
    <div className="package-reclaim">
      <div className="column">
        <h1 className="package-reclaim__title">
          Package reclaim{' '}
          {remove && (
            <span onClick={remove} className="action-button-text action-button-red">
              Remove
            </span>
          )}
        </h1>
        <div className="mr-3 is-flex is-align-items-flex-end is-flex-wrap-wrap package-reclaim__dropdowns">
          <Dropdown
            label="Reclaim from"
            initialText="Select"
            error={currentError?.from}
            options={reclaimFromOptions}
            onOptionSelect={(value) => changePackageType('from', value)}
            selectedValue={packageReclaim.from}
          />
          <Dropdown
            label="Reclaim category"
            initialText="Select"
            error={currentError?.category}
            options={reclaimFromCategoryOptions}
            onOptionSelect={(value) => changePackageType('category', value)}
            selectedValue={packageReclaim.category}
          />
        </div>
        <TextArea
          classes="package-reclaim__notes"
          rows={5}
          error={currentError?.notes}
          label="Add notes"
          onChange={(value) => changePackageType('notes', value)}
          placeholder="My notes here and here"
        />
        <div className="mt-4 mb-5">
          <RadioButton
            label=""
            error={currentError?.type}
            onChange={(value) => changePackageType('type', value)}
            options={reclaimAmountOptions}
            selectedValue={packageReclaim.type}
          />
        </div>
        {packageReclaim.type && (
          <Input
            onChange={(value) => changePackageType('amount', value)}
            label="Amount"
            error={currentError?.amount}
            preSign={packageReclaim.type !== percentageValue ? currency.euro : undefined}
            postSign={packageReclaim.type === percentageValue ? '%' : undefined}
            value={packageReclaim.amount}
          />
        )}
        <hr className="horizontal-delimiter" />
      </div>
    </div>
  );
};

export default PackageReclaim;
