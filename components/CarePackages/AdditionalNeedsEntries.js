import SectionHeading from "../SectionHeading";
import { Button } from "../Button";
import TextArea from "../TextArea";
import RadioButton from "../RadioButton";
import React, { useEffect, useState } from "react";
import DatePick from "../DatePick";
import fieldValidator from "../../service/inputValidator";

const AdditionalNeedEntry = ({
  costOptions,
  entry,
  error,
  setError,
  index,
  onEdit = () => {},
  removeEntry = () => {},
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFixedPeriodCost, setIsFixedPeriodCost] = useState(false);

  const onChangeErrors = (field) => {
    if(index === undefined) return;
    const newErrors = [...error];
    newErrors.splice(index, 1, {...currentError, [field]: false});
    setError(newErrors);
  }

  const onRadioBtnChange = (value) => {
    const selectedCostText = costOptions.find((x) => x.value === value).text;

    onChangeErrors('selectedCost')
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
    onChangeErrors('startDate');
  };

  const onEndDateChange = (value) => {
    setEndDate(value);
    onChangeErrors('endDate');
  };

  const updateDateSelection = () => {
    const selectedPeriod = {
      startDate,
      endDate,
    };
    onEdit({ ...entry, selectedPeriod });
  };

  const onTextAreaChange = (value) => {
    onChangeErrors('needToAddress');
    onEdit({ ...entry, needToAddress: value });
  };

  useEffect(() => {
    updateDateSelection();
  }, [startDate, endDate]);

  const currentError = error && error[index];

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
            error={currentError?.selectedCost}
            options={costOptions}
            selectedValue={entry.selectedCost}
            onChange={onRadioBtnChange}
          />
          {isFixedPeriodCost && (
            <div className="mb-3">
              <div className="is-flex">
                <span className="mr-3">
                  <DatePick
                    error={currentError?.startDate}
                    label="Start date"
                    dateValue={startDate}
                    setDate={onStartDateChange}
                  />
                </span>
                <span>
                  <DatePick
                    error={currentError?.endDate}
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
            error={currentError?.needToAddress}
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
  error,
  setError,
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
      {entries.map((entryItem, index) => {
        return (
          <AdditionalNeedEntry
            setError={setError}
            key={entryItem.id}
            index={index}
            error={error}
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
