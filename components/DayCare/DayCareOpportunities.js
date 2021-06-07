import Dropdown from "../Dropdown";
import SectionHeading from "../SectionHeading";
import TextArea from "../TextArea";
import { Button } from "../Button";
import { useEffect, useState } from 'react';

const DayCareOpportunityEntry = ({
  lengthOptions,
  timesPerMonthOptions,
  handleOpportunityChange,
  entry,
}) => {
  const [opportunityItem, setOpportunityItem] = useState({...entry});

  useEffect(() => {
    updateParent();
  }, [opportunityItem])

  const handleHowLongChange = (option) => {
    setOpportunityItem({...opportunityItem, howLongValue: option});
  }

  const handleTimesPerMonthChange = (option) => {
    setOpportunityItem({...opportunityItem, timesPerMonthValue: option})
  }

  const handleNeedToAddressChange = (val) => {
    setOpportunityItem({...opportunityItem, needToAddress: val})
  };

  const updateParent = () => {
    setTimeout(handleOpportunityChange(opportunityItem), 1000);
  }



  return (
    <div className="columns day-care-opportunity mt-3">
      <div className="column is-3 opportunity-dropdown-options">
        <div className="opportunity-dropdown-cont">
          <Dropdown
            label="How long"
            options={lengthOptions}
            selectedValue={entry.howLongValue}
            onOptionSelect={(option) => handleHowLongChange(option)}
            buttonStyle={{ width: "100%" }}
          />
        </div>
        <div className="mt-2">
          <Dropdown
            label="How many times per month?"
            options={timesPerMonthOptions}
            selectedValue={entry.timesPerMonthValue}
            onOptionSelect={(option) => handleTimesPerMonthChange(option)}
            buttonStyle={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="column">
        <TextArea label="Need to Address" rows={5} placeholder="Add details..." onChange={handleNeedToAddressChange}>
          {entry.needToAddress}
        </TextArea>
      </div>
      <div className="column is-2"></div>
    </div>
  );
};

const DayCareOpportunities = ({
  lengthOptions,
  timesPerMonthOptions,
  onOpportunityUpdate,
  entries,
  addEntry = () => {},
}) => {
  return (
    <>
      <SectionHeading>Day Care Opportunities</SectionHeading>
      <div>
        {entries.map((entryItem) => {
          return (
            <DayCareOpportunityEntry
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
