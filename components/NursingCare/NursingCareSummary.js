import React from 'react';
import { Button } from '../Button';

const NursingCareSummary = ({
  startDate,
  endDate,
  needToAddress = '',
  errorFields,
  setErrorFields,
  additionalNeedsEntries = [],
  setAdditionalNeedsEntries = () => {},
}) => {
  startDate = new Date(startDate).toLocaleDateString('en-GB');

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = additionalNeedsEntries.filter((entryItem) => entryItem.id !== entryId);
    setAdditionalNeedsEntries([...newEntries]);
  };

  return (
    <div className="day-summary hackney-text-black font-size-14px">
      <div className="columns is-mobile">
        <div className="column">
          <div>
            <span className="font-weight-bold mr-2 font-size-16px">Nursing Care</span>
            <span className="font-size-16px">
              {startDate} {endDate ? ` - ${endDate}` : null}
            </span>
          </div>
        </div>
      </div>

      <div className="columns is-mobile mb-3">
        <div className="column">
          <div className="border-bottom" />
        </div>
      </div>

      <div className="columns is-mobile mb-3">
        <div className="column">
          <p className="font-weight-bold font-size-16px mb-2">Need Addressing</p>
          <p>{needToAddress}</p>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <p className="font-weight-bold font-size-16px mb-2">Additional needs</p>
          <div className="border-bottom" />
        </div>
        <div className="column" />
      </div>

      <div className="columns">
        <div className="column">
          <div className="mb-3">
            <div className="columns is-multiline">
              {additionalNeedsEntries.map((entry) => (
                <div className="column is-half" key={entry.id}>
                  <p className="font-weight-bold mb-2">{entry.selectedCostText} cost</p>
                  <p>{entry.needToAddress}</p>
                  <div>
                    <Button linkBtn className="mr-2">
                      Edit
                    </Button>

                    <Button onClick={() => removeAdditionalNeedEntry(entry.id)} linkBtn>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursingCareSummary;
