import React from 'react';
import { HackneyLogo } from './Icons';
import ClientSummaryItem from './CarePackages/ClientSummaryItem';

const ApprovalClientSummary = () => (
  <div className='client-summary'>
      <ClientSummaryItem itemName="CLIENT" itemDetail="James Stephens" />
      <ClientSummaryItem itemName="HACKNEY ID" itemDetail="#786288" />
      <ClientSummaryItem itemName="AGE 91" itemDetail="09/12/1972" />
      <ClientSummaryItem itemName="POSTCODE" itemDetail="E9 6EY" />
      <ClientSummaryItem itemName='WHO IS SOURCING CARE' itemDetail={<HackneyLogo />} />
  </div>
);

export default ApprovalClientSummary;
