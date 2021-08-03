import React from 'react';
import { HackneyLogo } from './Icons';
import ClientSummaryItem from './CarePackages/ClientSummaryItem';

const ApprovalClientSummary = () => (
  <div className="columns">
    <ClientSummaryItem itemName="CLIENT" itemDetail="James Stephens" />
    <ClientSummaryItem itemName="HACKNEY ID" itemDetail="#786288" />
    <ClientSummaryItem itemName="AGE 91" itemDetail="09/12/1972" />
    <ClientSummaryItem itemName="POSTCODE" itemDetail="E9 6EY" />
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="w-180px">
              <p className="font-weight-bold hackney-text-green">WHO IS SOURCING CARE</p>
              <p className="font-size-14px">
                <HackneyLogo />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ApprovalClientSummary;
