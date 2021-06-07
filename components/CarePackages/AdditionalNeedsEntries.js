import SectionHeading from "../SectionHeading";
import { Button } from "../Button";
import TextArea from "../TextArea";
import RadioButton from "../RadioButton";
import "./assets/additionalNeeds.scss";
import React, { useEffect, useState } from "react";
import DatePick from "../../../components/DatePick";

const AdditionalNeedEntry = ({
  costOptions,
  entry,
  onEdit = () => {},
  removeEntry = () => {},
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFixedPeriodCost, setIsFixedPeriodCost] = useState(false);

  const onRadioBtnChange = (value) => {
    const selectedCostText = costOptions.find((x) => x.value === value).text;
    let selectedPeriod = undefined;
    if (selectedCostText.toLowerCase().includes("fixed")) {
      setIsFixedPeriodCost(true);
      selectedPeriod = {
        startDate,
        endDate,
      };
    } else {
      setIsFixedPeriodCost(false);
    }
    onEdit({ ...entry, selectedCost: value, selectedCostText, selectedPeriod });
  };

  const onStartDateChange = (value) => {
    setStartDate(value);
  };

  const onEndDateChange = (value) => {
    setEndDate(value);
  };

  const updateDateSelection = () => {
    const selectedPeriod = {
      startDate,
      endDate,
    };
    onEdit({ ...entry, selectedPeriod });
  };

  const onTextAreaChange = (value) => {
    onEdit({ ...entry, needToAddress: value });
  };

  useEffect(() => {
    updateDateSelection();
  }, [startDate, endDate]);

  return (
    <>
      <div className="mb-2">
        <SectionHeading>Additional needs</SectionHeading>
      </div>
      <div className="columns">
        <div className="column care-cost-col">
          <RadioButton
            label="This cost is:"
            inline={false}
            options={costOptions}
            selectedValue={entry.selectedCost}
            onChange={onRadioBtnChange}
          />
          {isFixedPeriodCost && (
            <div className="mb-3">
              <div className="is-flex">
                <span className="mr-3">
                  <DatePick
                    label="Start date"
                    dateValue={startDate}
                    setDate={onStartDateChange}
                  />
                </span>
                <span>
                  <DatePick
                    label="End date"
                    dateValue={endDate}
                    setDate={onEndDateChange}
                  />
                </span>
              </div>
            </div>
          )}
          <Button onClick={() => removeEntry(entry.id)} linkBtn={true}>
            Remove Need
          </Button>
        </div>
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
            onChange={onTextAreaChange}
          >
            {entry.needToAddress}
          </TextArea>
        </div>
        <div className="column is-2" />
      </div>
    </>
  );
};

const AdditionalNeeds = ({
  costOptions,
  entries,
  setAdditionalNeedsState = () => {},
}) => {
  // Add new additional need entry
  const addAdditionalNeedEntry = () => {
    setAdditionalNeedsState([
      ...entries,
      {
        id: entries.length + 1,
        selectedCost: undefined,
        selectedCostText: undefined,
        needToAddress: undefined,
        selectedPeriod: undefined,
      },
    ]);
  };

  // Edit additional need entry
  const editAdditionalNeedEntry = (entry) => {
    const newEntries = entries.map((entryItem) =>
      entryItem.id === entry.id ? entry : entryItem
    );
    setAdditionalNeedsState([...newEntries]);
  };

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = entries.filter((entryItem) => entryItem.id !== entryId);
    setAdditionalNeedsState([...newEntries]);
  };

  return (
    <>
      {entries.map((entryItem) => {
        return (
          <AdditionalNeedEntry
            key={entryItem.id}
            costOptions={costOptions}
            entry={entryItem}
            onEdit={editAdditionalNeedEntry}
            removeEntry={removeAdditionalNeedEntry}
          />
        );
      })}
      <div className="mt-4">
        <Button onClick={addAdditionalNeedEntry} linkBtn={true}>
          + Add Need
        </Button>
      </div>
    </>
  );
};

const getInitialAdditionalNeedsArray = () => {
  return [
    {
      id: 1,
      selectedCost: undefined,
      selectedCostText: undefined,
      selectedPeriod: undefined,
      needToAddress: undefined,
    },
  ];
};

export default AdditionalNeeds;
export { getInitialAdditionalNeedsArray };
