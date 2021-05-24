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
        <div className='level-insight__bordered'>
          <p>{totalValue}</p>
          <p>Total Value</p>
        </div>
        <div className='supplier-returns__level-insight-returned level-insight__bordered'>
          <p>{returned}</p>
          <p>Returned</p>
        </div>
        <div className='level-insight__red-text level-insight__bordered'>
          <p>{inDispute}</p>
          <p>In Dispute</p>
        </div>
        <div className='pay-runs__level-insight-holds level-insight__bordered'>
          <p>{accepted}</p>
          <p>Accepted</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierReturnsLevelInsight;
