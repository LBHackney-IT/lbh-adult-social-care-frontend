import React from "react";

const isEmptyString = (str) => !str || str.length === 0;

const PackageApprovalHistorySummary = ({ approvalHistoryEntries = [] }) => {
  return (
    <div className="columns is-multiline">
      <div className="column">
        <p className="font-weight-bold hackney-text-green">APPROVAL HISTORY</p>
        <div className="font-size-14px">
          {approvalHistoryEntries.map((entry) => (
            <div className="columns">
              <p className="column is-2 font-weight-bold">{entry.eventDate}</p>
              <p className="column is-8">
                <span>{entry.eventMessage}</span>
                {entry.eventSubMessage &&
                  !isEmptyString(entry.eventSubMessage) && (
                    <span>
                      <br />
                      <span className="font-italic">
                        {entry.eventSubMessage}
                      </span>
                    </span>
                  )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageApprovalHistorySummary;
