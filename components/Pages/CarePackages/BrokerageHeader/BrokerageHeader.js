import React from 'react';
import { Header } from '../../../HackneyDS';
import { BROKER_PORTAL_ROUTE, LOGOUT_ROUTE } from '../../../../routes/RouteConstants';

const defaultLinks = [
  { href: BROKER_PORTAL_ROUTE, text: 'Broker Portal' },
  { href: '#', text: 'Broker Package' },
  { href: '#', text: 'Care Charge' },
  { href: '#', text: 'Approvals' },
  { href: '#', text: 'Finance' },
  { href: LOGOUT_ROUTE, text: 'Log out' },
];

const BrokerageHeader = ({ links = defaultLinks, className, serviceName = '' }) => {
  return (
    <Header links={links} bottomLines={false} className={className ? ` ${className}` : ''}>
      <p slot="service-name">{serviceName}</p>
    </Header>
  );
};

export default BrokerageHeader;