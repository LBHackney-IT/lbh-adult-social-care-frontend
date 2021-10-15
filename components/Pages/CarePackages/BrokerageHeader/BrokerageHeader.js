import React from 'react';
import { Header } from '../../../HackneyDS';

const defaultLinks = [
  { href: '#', text: 'Submitted Forms' },
  { href: '#', text: 'New Package' },
  { href: '#', text: 'Log out' },
];

const BrokerageHeader = ({ links = defaultLinks, className, serviceName = 'Adult Social Care' }) => {
  return (
    <Header links={links} bottomLines={false} className={className ? ` ${className}` : ''}>
      <p slot="service-name">{serviceName}</p>
    </Header>
  );
};

export default BrokerageHeader;
