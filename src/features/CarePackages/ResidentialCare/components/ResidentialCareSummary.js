import React, { useEffect } from "react";
import { Button } from "../../../components/Button";

const ResidentialCareSummary = ({
  startDate,
  endDate,
  typeOfStayText,
  needToAddress,
  additionalNeedsEntries = [],
  setAdditionalNeedsEntries = () => {},
}) => {
  startDate = new Date(startDate).toLocaleDateString("en-GB");
  endDate = endDate && new Date(endDate).toLocaleDateString("en-GB");

  const renderDate = (dateString) => {
    return dateString && new Date(dateString).toLocaleDateString("en-GB");
  };

  useEffect(() => {}, [additionalNeedsEntries]);

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = additionalNeedsEntries.filter(
      (entryItem) => entryItem.id !== entryId
    );
    setAdditionalNeedsEntries([...newEntries]);
  };

  return (
    <div className="day-summary has-text-black">
      <div className="columns is-multiline">
        <div className="column">
          <div>
            <span className="has-text-weight-bold mr-2 package-summary-title">
              Residential Care
            </span>
            <span>
              {startDate} {endDate ? ` - ${endDate}` : null}
            </span>
          </div>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-item level-right">
              <span className="text-green is-uppercase has-text-weight-bold is-size-5">
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
          <p className="has-text-weight-bold package-summary-sub-title mb-2">
            Need Addressing
          </p>
          <p>{needToAddress}</p>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <p className="font-weight-bold package-summary-sub-title mb-2">
            Additional needs
          </p>
          <div className="border-bottom" />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="mb-3">
            <div className="columns is-multiline">
              {additionalNeedsEntries.map((entry) => {
                return (
                  <div className="column mb-3 is-full" key={entry.id}>
                    <p className="has-text-weight-bold additional-need-title mb-2">
                      {entry.selectedCostText} cost
                    </p>
                    {entry.selectedPeriod && (
                      <p>
                        {renderDate(entry.selectedPeriod.startDate)}-{" "}
                        {renderDate(entry.selectedPeriod.endDate)}
                      </p>
                    )}
                    <p>{entry.needToAddress}</p>
                    <div>
                      <Button linkBtn={true} className="mr-2">
                        Edit
                      </Button>

                      <Button
                        onClick={() => removeAdditionalNeedEntry(entry.id)}
                        linkBtn={true}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentialCareSummary;
