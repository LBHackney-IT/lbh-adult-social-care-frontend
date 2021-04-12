import Dropdown from "../../../components/Dropdown";
import SectionHeading from "../../../components/SectionHeading";
import TextArea from "../../../components/TextArea";
import { Button } from "../../../components/Button";

const DayCareOpportunityEntry = ({
  lengthOptions,
  timesPerMonthOptions,
  entry,
}) => {
  return (
    <div className="columns day-care-opportunity mt-3">
      <div className="column is-3 opportunity-dropdown-options">
        <div className="opportunity-dropdown-cont">
          <Dropdown
            label="How long"
            options={lengthOptions}
            selectedValue={entry.howLongValue}
            onOptionSelect={(option) => alert("Option change")}
            buttonStyle={{ width: "100%" }}
          />
        </div>
        <div className="mt-2">
          <Dropdown
            label="How many times per month?"
            options={timesPerMonthOptions}
            selectedValue={entry.perMonthValue}
            onOptionSelect={(option) => alert("Option change")}
            buttonStyle={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="column">
        <TextArea label="Need to Address" rows={5} placeholder="Add details...">
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
