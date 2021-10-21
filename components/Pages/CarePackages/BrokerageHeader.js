import React from 'react';
import { Header } from '../../HackneyDS';
import { BROKER_PORTAL_ROUTE, CARE_CHARGE_ROUTE, LOGOUT_ROUTE } from '../../../routes/RouteConstants';

const links = [
  { href: BROKER_PORTAL_ROUTE, text: 'Broker Portal' },
  { href: CARE_CHARGE_ROUTE, text: 'Care Charges' },
  { href: '#2', text: 'Approvals' },
  { href: '#3', text: 'Finance' },
  { href: LOGOUT_ROUTE, text: 'Log out' },
];

const BrokerageHeader = ({ className }) => <Header links={links} bottomLines={false} className={className} />;

export default BrokerageHeader;
