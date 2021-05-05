import React from "react";
import "../assets/packageCostBox.scss";

const PackageCostBox = ({
  boxClass = "hackney-package-cost-light-yellow-box",
  title = "",
  cost = "",
  costType = "",
}) => {
  return (
    <div className={`level  ${boxClass}`}>
      <div className="level-left">
        <div className="level-item">
          <div>
            <p className="font-weight-bold hackney-text-green">{title}</p>
            <p className="font-size-19px font-weight-bold">{cost}</p>
            <p className="font-weight-bold hackney-text-green">{costType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCostBox;
