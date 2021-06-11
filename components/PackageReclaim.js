import Dropdown from "./Dropdown";
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";
import EuroInput from "./EuroInput";
import React from "react";

const staticReclaimFromOptions = [
  { text: "Reclaim from 1", value: 1 },
  { text: "Reclaim from 2", value: 2 },
  { text: "Reclaim from 3", value: 3 },
];

const staticCategoryOptions = [
  { text: "Category type 1", value: 1 },
  { text: "Category type 2", value: 2 },
  { text: "Category type 3", value: 3 },
];

const staticCheckboxOptions = [
  { value: 'percentage', text: 'Percentage' },
  { value: 'fixedOneOff', text: 'Fixed amount - one off' },
  { value: 'fixedWeekly', text: 'Fixed amount - weekly' },
];

const PackageReclaim = ({
  packageReclaim,
  setPackageReclaim,
  remove,
  checkboxOptions = staticCheckboxOptions,
  categoryOptions = staticCategoryOptions,
  reclaimFromOptions = staticReclaimFromOptions,
}) => {
  const changePackageType = (field, value) => {
    setPackageReclaim({
      ...packageReclaim,
      [field]: value,
    });
  };

  return (
    <div className='package-reclaim'>
      <div className="column">
        <h1 className='package-reclaim__title'>Package reclaim {remove && <span onClick={remove} className='action-button-text action-button-red'>Remove</span>}</h1>
        <div className="mr-3 is-flex is-align-items-flex-end is-flex-wrap-wrap package-reclaim__dropdowns">
          <Dropdown
            label='Reclaim from'
            initialText='Select'
            options={reclaimFromOptions}
            onOptionSelect={(value) => changePackageType('from', value)}
            selectedValue={packageReclaim.from}
          />
          <Dropdown
            label='Reclaim category'
            initialText='Select'
            options={categoryOptions}
            onOptionSelect={(value) => changePackageType('category', value)}
            selectedValue={packageReclaim.category}
          />
        </div>
        <TextArea classes='package-reclaim__notes' rows={5} label='Add notes' placeholder='My notes here and here' />
        <div className="mt-4 mb-5">
          <RadioButton
            label=""
            onChange={(value) => changePackageType('type', value)}
            options={checkboxOptions}
            selectedValue={packageReclaim.type}
          />
        </div>
        <EuroInput
          onChange={(value) => changePackageType('amount', value)}
          label='Amount'
          value={packageReclaim.amount}
        />
        <hr className='horizontal-delimiter' />
      </div>
    </div>
  )
}

export default PackageReclaim;
