import React from "react";

const PackageApprovalHistorySummary = () => {
  return (
    <div className="columns is-multiline">
      <div className="column">
        <p className="font-weight-bold hackney-text-green">APPROVAL HISTORY</p>
        <div className="font-size-14px">
          <div className="columns">
            <p className="column is-2 font-weight-bold">03/12/2021</p>
            <p className="column is-8">
              Package requested by Martin Workman · Social Worker
            </p>
          </div>
          <div className="columns">
            <p className="column is-2 font-weight-bold">05/12/2021</p>
            <p className="column is-8">
              <span>
                Futher information requested by Amecie Steadman · Approver
              </span>
              <br />
              <span className="font-italic">
                "There appears to be more support than needed in the morning for
                Mr Stephens, please amend or call me to discuss" More
              </span>
            </p>
          </div>
          <div className="columns">
            <p className="column is-2 font-weight-bold">06/12/2021</p>
            <p className="column is-8">
              Package re-submitted by Martin Workman · Social Worker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageApprovalHistorySummary;
