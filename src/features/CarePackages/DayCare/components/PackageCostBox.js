import React from "react";
import "../assets/packageCostBox.scss";

const PackageCostBox = ({
  boxClass = "hackney-package-cost-light-yellow-box",
  title = "",
  cost = "",
  costType = "",
}) => {
  return (
    <div className={`font-size-12px font-weight-bold ${boxClass}`}>
      <p className="hackney-text-green">{title}</p>
      <p className="font-size-19px item-cost">{cost}</p>
      <p className="hackney-text-green">{costType}</p>
    </div>
  );
};

export default PackageCostBox;
