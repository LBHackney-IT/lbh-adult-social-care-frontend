import React from 'react';
import {APPROVALS_ROUTE, BROKER_ASSISTANCE_ROUTE, BROKER_PORTAL_ROUTE, CARE_CHARGES_ROUTE, FINANCE_ROUTE, LOGOUT_ROUTE } from 'routes/RouteConstants';
import { Header } from '../../HackneyDS';

const links = [
  { href: BROKER_ASSISTANCE_ROUTE, text: 'Broker Assistance' },
  { href: BROKER_PORTAL_ROUTE, text: 'Broker Portal' },
  { href: CARE_CHARGES_ROUTE, text: 'Care Charges' },
  { href: APPROVALS_ROUTE, text: 'Approvals' },
  { href: FINANCE_ROUTE, text: 'Finance' },
  { href: LOGOUT_ROUTE, text: 'Log out' },
];

const BrokerageHeader = ({ className }) => <Header links={links} bottomLines={false} className={className} />;

export default BrokerageHeader;
