import React, { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import { Button } from '../Button';
import TextArea from '../TextArea';
import RadioButton from '../RadioButton';
import DatePick from '../DatePick';

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
    if (!currentError) return;
    const newErrors = [...error];
    newErrors.splice(index, 1, { ...currentError, [field]: false });
    setError(newErrors);
  };

  const onRadioBtnChange = (value) => {
    const selectedCostText = costOptions.find((x) => x.value === value).text;

    onChangeErrors('selectedCost');
    let selectedPeriod;
    if (selectedCostText.toLowerCase().includes('fixed')) {
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

  const currentError = index !== undefined && error !== undefined && error[index];

  return (
    <div className='mb-6'>
      <div className="mb-2">
        <SectionHeading>Additional needs</SectionHeading>
      </div>
      <div className="care-cost-col mb-3">
        <RadioButton
          label="This cost is:"
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
      </div>
      <TextArea
        label="Need to Address"
        error={currentError?.needToAddress}
        rows={5}
        className='mb-3'
        placeholder="Add details..."
        onChange={onTextAreaChange}
      >
        {entry.needToAddress}
      </TextArea>
      <Button className='red' onClick={() => removeEntry(entry.id)} linkBtn>
        Remove Need
      </Button>
    </div>
  );
};

const AdditionalNeeds = ({ costOptions, entries, error, setError, setAdditionalNeedsState = () => {} }) => {
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
    const newEntries = entries.map((entryItem) => (entryItem.id === entry.id ? entry : entryItem));
    setAdditionalNeedsState([...newEntries]);
  };

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = entries.filter((entryItem) => entryItem.id !== entryId);
    setAdditionalNeedsState([...newEntries]);
  };

  return (
    <>
      {entries.map((entryItem, index) => (
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
      ))}
      <div className="mt-4">
        <Button onClick={addAdditionalNeedEntry} linkBtn>
          + Add Need
        </Button>
      </div>
    </>
  );
};

const responseInit = () => [
  {
    additionalNeedsPaymentTypeId: 2,
    optionName: 'example1',
  },
  {
    additionalNeedsPaymentTypeId: 3,
    optionName: 'example2',
  },
  {
    additionalNeedsPaymentTypeId: 2,
    optionName: 'example3',
  },
];

const getInitialAdditionalNeedsArray = () =>
  responseInit().map((need, idx) => ({
    id: idx + 1,
    selectedCost: need.additionalNeedsPaymentTypeId || undefined,
    selectedCostText: need.optionName || undefined,
    selectedPeriod: undefined,
    needToAddress: undefined,
  }));

export default AdditionalNeeds;
export { getInitialAdditionalNeedsArray, responseInit };
