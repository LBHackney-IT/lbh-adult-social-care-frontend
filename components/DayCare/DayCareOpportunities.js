import React, { useEffect, useState } from 'react';
import Dropdown from "../Dropdown";
import SectionHeading from "../SectionHeading";
import TextArea from "../TextArea";
import { Button } from "../Button";

const DayCareOpportunityEntry = ({
  lengthOptions,
  index,
  error,
  setError,
  timesPerMonthOptions,
  handleOpportunityChange,
  entry,
}) => {
  const [opportunityItem, setOpportunityItem] = useState({...entry});

  useEffect(() => {
    updateParent();
  }, [opportunityItem])

  const changeField = (field, value) => {
    setOpportunityItem({ ...opportunityItem, [field]: value })
    onChangeErrors(field);
  }

  const onChangeErrors = (field) => {
    if(!currentError) return;
    const newErrors = [...error];
    newErrors.splice(index, 1, {...currentError, [field]: false});
    setError(newErrors);
  }

  const updateParent = () => {
    setTimeout(handleOpportunityChange(opportunityItem), 1000);
  }

  const currentError = index !== undefined && error !== undefined && error[index];

  return (
    <div className="columns day-care-opportunity mt-3">
      <div className="column is-3 opportunity-dropdown-options">
        <div className="opportunity-dropdown-cont">
          <Dropdown
            label="How long"
            error={currentError?.howLongValue}
            options={lengthOptions}
            selectedValue={entry.howLongValue}
            onOptionSelect={(option) => changeField('howLongValue', option)}
            buttonStyle={{ width: "100%" }}
          />
        </div>
        <div className="mt-2">
          <Dropdown
            error={currentError?.timesPerMonthValue}
            label="How many times per month?"
            options={timesPerMonthOptions}
            selectedValue={entry.timesPerMonthValue}
            onOptionSelect={(option) => changeField('timesPerMonthValue', option)}
            buttonStyle={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="column">
        <TextArea
          error={currentError?.needToAddress}
          label="Need to Address"
          rows={5}
          placeholder="Add details..."
          onChange={(value) => changeField('needToAddress', value)}
        >
          {entry.needToAddress}
        </TextArea>
      </div>
      <div className="column is-2" />
    </div>
  );
};

const DayCareOpportunities = ({
  lengthOptions,
  timesPerMonthOptions,
  onOpportunityUpdate,
  error,
  setError,
  entries,
  addEntry = () => {},
}) => {
  return (
    <>
      <SectionHeading>Day Care Opportunities</SectionHeading>
      <div>
        {entries.map((entryItem, index) => {
          return (
            <DayCareOpportunityEntry
              index={index}
              error={error}
              setError={setError}
              key={entryItem.id}
              lengthOptions={lengthOptions}
              timesPerMonthOptions={timesPerMonthOptions}
              handleOpportunityChange={onOpportunityUpdate}
              entry={entryItem}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <Button onClick={addEntry} linkBtn={true}>
          + Add Opportunity
        </Button>
      </div>
    </>
  );
};

export default DayCareOpportunities;
