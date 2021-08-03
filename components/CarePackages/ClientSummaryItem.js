import React from 'react';

const ClientSummaryItem = ({ itemName, itemDetail }) => (
  <div className="column">
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="w-180px">
            <p className="font-weight-bold hackney-text-green">{itemName}</p>
            <p className="font-size-14px">{itemDetail}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ClientSummaryItem;
