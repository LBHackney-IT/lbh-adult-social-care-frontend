import React from "react";

const SupplierReturnsLevelInsight = ({
  packages,
  totalValue,
  returned,
  inDispute,
  accepted,
}) => {
  return (
    <div className='pay-runs__level-insight'>
      <div className='pay-runs__level-insight-container'>
        <div className='pay-runs__level-insight-totals'>
          <p className='pay-runs__level-insight-totals-title'>Totals</p>
          <p className='pay-runs__level-insight-totals-text'>{packages}</p>
          <p className='pay-runs__level-insight-totals-increase'>Packages</p>
        </div>
        <div className='pay-runs__level-insight-supplier pay-runs__level-insight-bordered'>
          <p>{totalValue}</p>
          <p>Total Value</p>
        </div>
        <div className='pay-runs__level-insight-users pay-runs__level-insight-bordered'>
          <p>{returned}</p>
          <p>Returned</p>
        </div>
        <div className='pay-runs__level-insight-holds pay-runs__level-insight-bordered'>
          <p>{inDispute}</p>
          <p>In Dispute</p>
        </div>
        <div className='pay-runs__level-insight-holds pay-runs__level-insight-bordered'>
          <p>{accepted}</p>
          <p>Accepted</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierReturnsLevelInsight;
