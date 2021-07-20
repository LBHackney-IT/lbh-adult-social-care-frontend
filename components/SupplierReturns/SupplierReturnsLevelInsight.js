import React from 'react';

const SupplierReturnsLevelInsight = ({ packages, totalValue, returned, inDispute, accepted, paid, suppliers }) => (
  <div className="pay-runs__level-insight">
    <div className="pay-runs__level-insight-container">
      <div className="pay-runs__level-insight-totals">
        <p className="pay-runs__level-insight-totals-title">Totals</p>
        <p className="pay-runs__level-insight-totals-text">{suppliers}</p>
        <p className="pay-runs__level-insight-totals-increase">Suppliers</p>
      </div>
      <div className="level-insight__bordered">
        <p>{totalValue}</p>
        <p>Total Value</p>
      </div>
      <div className="level-insight__bordered">
        <p>{packages}</p>
        <p>Packages</p>
      </div>
      <div className="level-insight__red-text level-insight__bordered">
        <p>{returned}</p>
        <p>Returned</p>
      </div>
      <div className="level-insight__red-text level-insight__bordered">
        <p>{inDispute}</p>
        <p>In Dispute</p>
      </div>
      <div className="level-insight__bordered">
        <p>{accepted}</p>
        <p>Accepted</p>
      </div>
      <div className="level-insight__bordered">
        <p>{paid}</p>
        <p>Paid</p>
      </div>
    </div>
  </div>
);

export default SupplierReturnsLevelInsight;
