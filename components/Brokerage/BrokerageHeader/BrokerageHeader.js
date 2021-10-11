import React from 'react';
import { Header } from '../../HackneyDS';

const defaultLinks = [
  { href: '#', text: 'Submitted Forms' },
  { href: '#', text: 'New Package' },
  { href: '#', text: 'Log out' },
];

const BrokerageHeader = ({ links = defaultLinks, serviceName = 'Adult Social Care' }) => (
    <Header links={links} bottomLines={false}>
      <p slot="service-name">{serviceName}</p>
    </Header>
  );

export default BrokerageHeader;