import React from "react";

const DayCarePackageElementCostings = ({
  dayCareCentre = "£16.25/day",
  transport = "£16.25/h",
  additionalNeeds = "£16.25/h",
}) => {
  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <p className="font-weight-bold hackney-text-green">ELEMENT COSTINGS</p>
        <div className="level font-size-14px">
          <div className="level-left">
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Day Care Centre:</span>{" "}
                {dayCareCentre}
              </p>
            </div>
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Transport:</span> {transport}
              </p>
            </div>
            <div className="level-item">
              <p className="is-5">
                <span className="font-weight-bold">Additional needs:</span>{" "}
                {additionalNeeds}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCarePackageElementCostings;
