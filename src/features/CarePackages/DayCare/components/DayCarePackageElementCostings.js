import React from "react";

const DayCarePackageElementCostings = () => {
  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <p className="font-weight-bold hackney-text-green">ELEMENT COSTINGS</p>
        <div className="level font-size-14px">
          <div className="level-left">
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Day Care Centre:</span>{" "}
                £16.25/day
              </p>
            </div>
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Transport:</span> £16.25/h
              </p>
            </div>
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Additional needs:</span>{" "}
                £16.25/h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCarePackageElementCostings;
