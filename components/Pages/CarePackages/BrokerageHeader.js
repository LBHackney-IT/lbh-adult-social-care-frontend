import React from 'react';
import { BROKER_ASSISTANCE_ROUTE, BROKER_PORTAL_ROUTE, CARE_CHARGES_ROUTE, LOGOUT_ROUTE } from 'routes/RouteConstants';
import { Header } from '../../HackneyDS';

const links = [
  { href: BROKER_ASSISTANCE_ROUTE, text: 'Broker Assistance' },
  { href: BROKER_PORTAL_ROUTE, text: 'Broker Portal' },
  { href: CARE_CHARGES_ROUTE, text: 'Care Charges' },
  { href: '#2', text: 'Approvals' },
  { href: '#3', text: 'Finance' },
  { href: LOGOUT_ROUTE, text: 'Log out' },
];

const BrokerageHeader = ({ className }) => <Header links={links} bottomLines={false} className={className} />;

export default BrokerageHeader;
