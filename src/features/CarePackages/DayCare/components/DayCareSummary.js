import React from "react";
import { Button } from "../../../components/Button";

const DayCareSummary = ({
  needToAddress = "",
  transportNeeded = false,
  opportunityEntries = [],
  daysSelected = [],
  deleteOpportunity,
}) => {
  const handleOpportunityDelete = (opportunity) => {
    deleteOpportunity(opportunity.id);
  };

  const dayActiveClass = (index) => {
    if (daysSelected.length === 0) return "text-faded";
    return daysSelected[index].checked === true
      ? "hackney-text-black"
      : "text-faded";
  };
  return (
    // <div className="container is-fluid">
    <div className="day-summary">
      <div className="day-summary-title">
        <label>Visitation</label>
        <div className="day-summary-line" />
      </div>

      <div className="hackney-text-black font-size-12px">
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="level is-mobile font-size-16px">
                  <span className="level-item level-left font-weight-bold">
                    Visiting:
                  </span>
                  <label className={`${dayActiveClass(0)} level-item`}>
                    Mon
                  </label>
                  <label className={`${dayActiveClass(1)} level-item`}>
                    Tue
                  </label>
                  <label className={`${dayActiveClass(2)} level-item`}>
                    Wed
                  </label>
                  <label className={`${dayActiveClass(3)} level-item`}>
                    Thu
                  </label>
                  <label className={`${dayActiveClass(4)} level-item`}>
                    Fri
                  </label>
                  <label className={`${dayActiveClass(5)} level-item`}>
                    Sat
                  </label>
                  <label className={`${dayActiveClass(6)} level-item`}>
                    Sun
                  </label>
                </span>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-item level-right">
                    <span className="font-weight-bold font-size-12px hackney-text-green is-uppercase mr-2">
                      Needed:
                    </span>
                    <span
                      className={`${
                        transportNeeded
                          ? "font-weight-bold is-underlined"
                          : "text-faded"
                      } is-uppercase hackney-text-green font-size-12px`}
                    >
                      Transport
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="font-size-16px font-weight-bold mb-2">
              Need Addressing
            </h3>
            <p className="font-size-14px">{needToAddress}</p>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <h3 className="font-size-16px font-weight-bold mb-2">
              Day Care Opportunities
            </h3>
            {/*<hr/>*/}
            <div className="opportunity-summary-line" />
          </div>
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column">
            <div className="mb-3">
              <div className="columns is-mobile is-multiline font-size-14px">
                {opportunityEntries.map((opportunity) => {
                  return (
                    <div className="column is-half" key={opportunity.id}>
                      <h4 className="font-weight-bold mb-2">
                        {opportunity.howLongValue}{" "}
                        {opportunity.timesPerMonthValue}
                      </h4>
                      <p>{opportunity.needToAddress}</p>
                      <div>
                        <Button linkBtn={true} className="mr-2">
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleOpportunityDelete(opportunity)}
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
    </div>
    // </div>
  );
};

export default DayCareSummary;
