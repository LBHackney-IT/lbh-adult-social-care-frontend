import React from "react";

const HomeCarePackageElementCostings = () => {
  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <p className="font-weight-bold hackney-text-green">ELEMENT COSTINGS</p>
        <div className="level is-multiline font-size-14px">
          <div className="level-left">
            <div className="level-item">
              <p>
                <span className="font-weight-bold mr-2">
                  Primary Carer (avg.):
                </span>
                £16.25/h
              </p>
            </div>
            <div className="level-item">
              <p>
                <span className="font-weight-bold mr-2">
                  Secondary Carer (avg.):
                </span>
                £16.25/h
              </p>
            </div>
            <div className="level-item">
              <p>
                <span className="font-weight-bold mr-2">Escort:</span>
                £16.25/h
              </p>
            </div>
            <div className="level-item">
              <p>
                <span className="font-weight-bold mr-2">Domestic:</span>
                £16.25/h
              </p>
            </div>
            <div className="level-item">
              <p>
                <span className="font-weight-bold mr-2">Waking Nights:</span>
                £200/night
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarePackageElementCostings;
