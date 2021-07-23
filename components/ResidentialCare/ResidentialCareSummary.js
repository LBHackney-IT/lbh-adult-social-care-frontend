import React, { useEffect } from 'react';
import { getEnGBFormattedDate } from '../../api/Utils/FuncUtils';
import { Button } from '../Button';

const ResidentialCareSummary = ({
  startDate,
  endDate,
  typeOfStayText,
  needToAddress,
  additionalNeedsEntries = [],
  setAdditionalNeedsEntries = () => {},
}) => {
  const renderDate = (dateString) => dateString && new Date(dateString).toLocaleDateString('en-GB');

  useEffect(() => {}, [additionalNeedsEntries]);

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = additionalNeedsEntries.filter((entryItem) => entryItem.id !== entryId);
    setAdditionalNeedsEntries([...newEntries]);
  };

  return (
    <div className="day-summary hackney-text-black font-size-14px">
      <div className="columns is-multiline">
        <div className="column">
          <div>
            <span className="font-weight-bold font-size-24px mr-2">Residential Care</span>
            <span className="font-size-16px">
              {getEnGBFormattedDate(startDate)} {endDate ? ` - ${endDate}` : null}
            </span>
          </div>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-item level-right">
              <span className="hackney-text-green is-uppercase font-weight-bold font-size-12px pt-2">
                {typeOfStayText}
              </span>
            </div>
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
      </div>

      <div className="columns">
        <div className="column">
          <div className="mb-3">
            <div className="columns is-multiline">
              {additionalNeedsEntries.map((entry) => (
                <div className="column mb-3 is-full" key={entry.id}>
                  <p className="font-weight-bold mb-2">{entry.selectedCostText} cost</p>
                  {entry.selectedPeriod && (
                    <p>
                      {renderDate(entry.selectedPeriod.startDate)}- {renderDate(entry.selectedPeriod.endDate)}
                    </p>
                  )}
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

export default ResidentialCareSummary;
